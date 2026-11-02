// Local stand-in for the Resend API used by the Playwright suite. It never forwards anything.
// Returns 200 with an id, or 500 when the message contains SIMULATE_PROVIDER_FAILURE.
import { createServer } from "node:http";

const port = Number(process.env.MOCK_PROVIDER_PORT ?? 4010);

createServer((req, res) => {
  if (req.method === "GET") return res.writeHead(200).end("ok");
  let body = "";
  req.on("data", (chunk) => (body += chunk));
  req.on("end", () => {
    const fail = body.includes("SIMULATE_PROVIDER_FAILURE");
    const authorized = req.headers.authorization === "Bearer test-key";
    // Small delay so the form's pending state is observable, as with a real provider.
    setTimeout(() => {
      res.writeHead(fail || !authorized ? 500 : 200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(fail || !authorized ? { message: "mock failure" } : { id: `mock-${Date.now()}` }));
    }, 600);
  });
}).listen(port, "127.0.0.1");
