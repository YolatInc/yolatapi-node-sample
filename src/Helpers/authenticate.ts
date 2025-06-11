import { YOLAT_API_ROUTES } from "../Utils/Enum";
import { YolatSampleConfig } from "../Utils/Environment";
import { ApiHelper } from "./apiHandler";

export async function authenticate(): Promise<string> {
  const requestBody = {
    email: YolatSampleConfig.yolat.email,
    password: YolatSampleConfig.yolat.password,
  };

  const response = await new ApiHelper().postDataNoToken(
    YOLAT_API_ROUTES.AUTHENTICATE,
    requestBody
  );
  if (!response || !response.data.accessToken) {
    throw new Error("Authentication failed, no token received.");
  }
  return response.data.accessToken;
}
