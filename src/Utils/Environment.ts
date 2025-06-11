import "dotenv/config";
export const YolatSampleConfig = {
  yolat: {
    api_private_key: process.env.YOLAT_PRIVATE_KEY,
    base_url: process.env.YOLAT_BASE_URL,
    email: process.env.YOLAT_USERNAME,
    password: process.env.YOLAT_PASSWORD,
  },
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
};
