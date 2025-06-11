import { YolatSampleConfig } from "../Utils/Environment";
import crypto from "crypto";

export async function signRequest(
  payload: any,
  timestamp: any
): Promise<string> {
  const pemKey = convertPkcs1ToPem(
    YolatSampleConfig.yolat.api_private_key ?? ""
  );

  const dataToSign = `${JSON.stringify(payload)}|${timestamp}|${
    payload.transactionDetail.transactionReference
  }`;
  console.log("Data to sign:", dataToSign);
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(dataToSign);
  signer.end();

  const signature = signer.sign(pemKey);
  return signature.toString("base64");
}

function convertPkcs1ToPem(base64Key: string): string {
  const keyLines = base64Key.match(/.{1,64}/g)?.join("\n") || base64Key;
  return `-----BEGIN RSA PRIVATE KEY-----\n${keyLines}\n-----END RSA PRIVATE KEY-----`;
}
