import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { YolatSampleConfig } from "../Utils/Environment";
import { signRequest } from "./signRequest";
import { authenticate } from "./authenticate";

const baseURL = YolatSampleConfig.yolat.base_url;

export class ApiHelper {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL,
      timeout: 1000000,
    });
  }

  private async buildHeaders(
    data?: any,
    customHeaders: Record<string, string> = {}
  ): Promise<Record<string, string>> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      privateKey: YolatSampleConfig.yolat.api_private_key ?? "",
      ...customHeaders,
    };

    if (data) {
      const timestamp = Math.floor(Date.now() / 1000).toString();
      const jwtToken = await authenticate();
      const signature = await signRequest(data, timestamp);
      headers["Authorization"] = `Bearer ${jwtToken}`;
      headers["timeStamp"] = timestamp;
      headers["signedRequest"] = signature;
    }

    return headers;
  }

  public async getData<T = any>(
    path: string,
    params: Record<string, any> = {},
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    const headers = await this.buildHeaders(
      undefined,
      config.headers as Record<string, string>
    );

    try {
      const response: AxiosResponse<T> = await this.client.get(path, {
        ...config,
        params,
        headers,
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async postData<T = any>(
    path: string,
    data: any = {},
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    const headers = await this.buildHeaders(
      data,
      config.headers as Record<string, string>
    );

    try {
      const response: AxiosResponse<T> = await this.client.post(path, data, {
        ...config,
        headers,
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async postDataNoToken<T = any>(
    path: string,
    data: any = {},
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.post(path, data, {
        ...config,
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any): Error {
    if (error.response) {
      return new Error(error.response.data?.Message || "API Error");
    } else if (error.request) {
      return new Error("No response from API");
    } else {
      return new Error(error.message);
    }
  }
}
