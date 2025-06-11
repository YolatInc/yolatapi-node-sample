# Yolat Node.js API Sample

A Node.js sample application demonstrating integration with the Yolat payment API using Fastify framework.

## Table of Contents

- [Yolat Node.js API Sample](#yolat-nodejs-api-sample)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Configuration](#environment-configuration)
    - [2. Welcome Endpoint](#2-welcome-endpoint)
    - [3. Process Payout Transaction](#3-process-payout-transaction)
    - [Transaction Payload Schema](#transaction-payload-schema)
  - [API Documentation](#api-documentation)
    - [Swagger Documentation](#swagger-documentation)
    - [OpenAPI Specification](#openapi-specification)
  - [Project Structure](#project-structure)
  - [Running the Application](#running-the-application)
    - [Development Mode](#development-mode)
  - [Server Configuration](#server-configuration)
  - [Error Handling](#error-handling)
  - [Security Features](#security-features)
  - [Troubleshooting](#troubleshooting)
    - [Common Issues](#common-issues)
    - [Debug Tips](#debug-tips)

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Yolat API credentials (email, password, private key)
- PostgreSQL database (for TypeORM)

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
```

## Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=5050
NODE_ENV=development
HOST=0.0.0.0

# Yolat API Configuration
YOLAT_BASE_URL=https://api.yolat.com
YOLAT_USERNAME=your-email@example.com
YOLAT_PASSWORD=your-password
YOLAT_PRIVATE_KEY=your-base64-encoded-private-key



### Required Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `YOLAT_BASE_URL` | Base URL for Yolat API | Yes |
| `YOLAT_USERNAME` | Your Yolat account email | Yes |
| `YOLAT_PASSWORD` | Your Yolat account password | Yes |
| `YOLAT_PRIVATE_KEY` | Base64 encoded RSA private key | Yes |
| `PORT` | Server port (default: 5050) | No |

## Authentication

The application uses a **multi-layered authentication system** when communicating with the Yolat API:

### 1. Bearer Token Authentication

- **Method**: Email/Password login
- **Endpoint**: `/api/Authentication`
- **Process**:
  - Sends email and password to get JWT token
  - Token is used in `Authorization: Bearer <token>` header

### 2. Private Key Authentication

- **Method**: RSA private key in headers
- **Header**: `privateKey: <your-private-key>`
- **Format**: Base64 encoded RSA private key

### 3. Request Signing

- **Method**: RSA-SHA256 signature
- **Components**:
  - Request payload (JSON stringified)
  - Timestamp (Unix timestamp)
  - Transaction reference
- **Format**: `${payload}|${timestamp}|${transactionReference}`
- **Header**: `signedRequest: <base64-signature>`

### 4. Timestamp Header

- **Header**: `timeStamp: <unix-timestamp>`
- **Purpose**: Prevents replay attacks

### Authentication Flow

```
1. Application starts → Environment variables loaded
2. API request initiated → authenticate() called
3. JWT token obtained → Token cached for requests
4. Request data prepared → Signature generated
5. Headers built with:
   - Authorization: Bearer <jwt-token>
   - privateKey: <private-key>
   - timeStamp: <timestamp>
   - signedRequest: <signature>
6. Request sent to Yolat API
```

## API Endpoints

### Local API Endpoints

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| `POST` | `/api/v1/api/Transaction/payout` | Process payout transaction | Internal |

### External Yolat API Endpoints (proxied)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/Transaction/payout` | Process payout |


## Usage Examples

### 1. Health Check

```bash
curl -X GET http://localhost:5050/health
```

**Response:**

```json
{
  "status": "OK"
}
```

### 2. Welcome Endpoint

```bash
curl -X GET http://localhost:5050/
```

**Response:**

```json
{
  "message": "Welcome to Yolat Sample"
}
```

### 3. Process Payout Transaction

```bash
curl -X POST http://localhost:5050/api/v1/api/Transaction/payout \
  -H "Content-Type: application/json" \
  -d '{
    "senderDetail": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "transactionDetail": {
      "currencyCode": "NGN",
      "accountNumber": "1234567890",
      "accountName": "Jane Smith",
      "bankCode": "BANK001",
      "amount": "100.00",
      "transactionReference": "TXN-12345",
      "beneficiaryId": "BENEF-001"
    }
  }'
```

### Transaction Payload Schema

```typescript
{
  senderDetail: {
    firstName: string;      // Sender's first name
    lastName: string;       // Sender's last name
  };
  transactionDetail: {
    currencyCode: string;   // Currency code (e.g., "USD", "NGN")
    accountNumber: string;  // Recipient's account number
    accountName: string;    // Recipient's account name
    bankCode: string;       // Bank code
    amount: string;         // Transaction amount
    transactionReference: string; // Unique transaction reference
    beneficiaryId?: string; // Optional beneficiary ID
  };
}
```

## API Documentation

### Swagger Documentation

The application includes interactive API documentation powered by Swagger UI:

- **URL**: `http://localhost:5050/yolat-swagger`
- **Features**:
  - Interactive API testing
  - Request/response schemas
  - Authentication requirements
  - Example payloads

### OpenAPI Specification

The API uses OpenAPI 3.0 specification with:

- **Security Scheme**: Bearer Authentication (JWT)
- **Content Type**: `application/json`
- **Response Codes**: Standard HTTP status codes

## Project Structure

```
src/
├── Controller/          # Request handlers
│   ├── Welcome.Controller.ts
│   └── Transactioon.Controller.ts
├── Helpers/            # Utility functions
│   ├── apiHandler.ts   # HTTP client wrapper
│   ├── authenticate.ts # Authentication logic
│   └── signRequest.ts  # Request signing logic
├── Interfaces/         # TypeScript interfaces
│   └── ITransactionService.ts
├── Routes/             # Route definitions
│   ├── index.routes.ts
│   ├── Welcome.routes.ts
│   └── Transaction.routes.ts
├── Schemas/            # Request/response schemas
│   └── transaction.schemas.ts
├── Services/           # Business logic
│   └── transaction.service.ts
├── Utils/              # Utilities and configuration
│   ├── Environment.ts  # Environment configuration
│   └── Enum.ts        # Route constants
├── index.ts            # Application entry point
└── server.ts           # Fastify server setup
```

## Running the Application

### Development Mode

```bash
npm run dev
# or
yarn dev
```

## Server Configuration

- **Framework**: Fastify
- **Port**: 5050 (configurable via PORT env var)
- **Host**: 0.0.0.0 (configurable via HOST env var)
- **CORS**: Enabled for all origins
- **Logging**: Disabled by default

## Error Handling

The application includes comprehensive error handling:

- **Authentication Errors**: Failed login or token issues
- **Validation Errors**: Invalid request payloads
- **API Errors**: External Yolat API failures
- **Network Errors**: Connection timeouts or failures

## Security Features

1. **Request Signing**: All requests are cryptographically signed
2. **Timestamp Validation**: Prevents replay attacks
3. **Bearer Token**: JWT-based authentication
4. **Private Key**: Additional API key validation
5. **CORS Protection**: Configurable CORS policies

## Troubleshooting

### Common Issues

1. **Authentication Failed**: Check email/password and private key
2. **Invalid Signature**: Verify private key format and encoding
3. **Connection Timeout**: Check YOLAT_BASE_URL and network connectivity
4. **Invalid Payload**: Verify request schema matches required format

### Debug Tips

- Enable Fastify logging by setting `logger: true` in server.ts
- Check console logs for detailed error messages
- Verify environment variables are loaded correctly
- Test authentication separately using `/api/Authentication` endpoint

