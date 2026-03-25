import { createServer } from "https";
import next from "next";
import fs from "fs";
import path from "path";
import type { IncomingMessage, ServerResponse } from "http";

const dev: boolean = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const keyPath = path.join(process.cwd(), "localhost-key.pem");
const certPath = path.join(process.cwd(), "localhost.pem");

// Ensure files exist
if (!fs.existsSync(keyPath)) {
  console.error("❌ ERROR: localhost-key.pem not found in project root!");
}
if (!fs.existsSync(certPath)) {
  console.error("❌ ERROR: localhost.pem not found in project root!");
}

const httpsOptions = {
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(certPath),
};

app.prepare().then(() => {
  createServer(httpsOptions, (req: IncomingMessage, res: ServerResponse) => {
    handle(req, res);
  }).listen(3000, (err?: Error) => {
    if (err) throw err;
    console.log("🔒 HTTPS Next.js running at: https://localhost:3000");
  });
});
