import fs from "fs";

const isDev = process.env.NODE_ENV === "development";

const nextConfig = {
  ...(isDev && {
    https: {
      key: fs.readFileSync("localhost-key.pem"),
      cert: fs.readFileSync("localhost.pem"),
    },
  }),
};

export default nextConfig;