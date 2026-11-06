// Local stand-in for a company SMTP server, used by the Playwright "smtp" project. It never relays mail.
// SMTP on 127.0.0.1:2525 (AUTH PLAIN, user "test-user" / "test-pass"); messages containing
// SIMULATE_PROVIDER_FAILURE are rejected with 554. HTTP on :4011 — GET / health, GET /last last message.
import { createServer as createHttpServer } from "node:http";
import { createServer } from "node:net";

let last = null;
const expectedAuth = Buffer.from("\u0000test-user\u0000test-pass").toString("base64");

createServer((socket) => {
  let buffer = "";
  let inData = false;
  let authed = false;
  let message = { from: "", to: [], data: "" };
  const reply = (line) => socket.write(`${line}\r\n`);
  reply("220 mock.smtp ESMTP ready");
  socket.on("data", (chunk) => {
    buffer += chunk.toString("utf8");
    let idx;
    while ((idx = buffer.indexOf("\r\n")) !== -1) {
      const line = buffer.slice(0, idx);
      buffer = buffer.slice(idx + 2);
      if (inData) {
        if (line === ".") {
          inData = false;
          if (message.data.includes("SIMULATE_PROVIDER_FAILURE")) {
            reply("554 5.7.1 Message rejected by mock");
          } else {
            last = message;
            reply(`250 2.0.0 Ok: queued as mock-${Date.now()}`);
          }
          message = { from: "", to: [], data: "" };
        } else {
          message.data += (line.startsWith("..") ? line.slice(1) : line) + "\n";
        }
        continue;
      }
      const cmd = line.toUpperCase();
      if (cmd.startsWith("EHLO") || cmd.startsWith("HELO")) {
        reply("250-mock.smtp");
        reply("250-AUTH PLAIN");
        reply("250 8BITMIME");
      } else if (cmd.startsWith("AUTH PLAIN")) {
        const token = line.split(" ")[2];
        authed = token === expectedAuth;
        reply(authed ? "235 2.7.0 Authentication successful" : "535 5.7.8 Authentication failed");
      } else if (cmd.startsWith("MAIL FROM")) {
        if (!authed) reply("530 5.7.0 Authentication required");
        else {
          message.from = line.slice(10);
          reply("250 2.1.0 Ok");
        }
      } else if (cmd.startsWith("RCPT TO")) {
        message.to.push(line.slice(8));
        reply("250 2.1.5 Ok");
      } else if (cmd === "DATA") {
        inData = true;
        reply("354 End data with <CR><LF>.<CR><LF>");
      } else if (cmd === "QUIT") {
        reply("221 2.0.0 Bye");
        socket.end();
      } else if (cmd === "RSET" || cmd === "NOOP") {
        reply("250 2.0.0 Ok");
      } else {
        reply("502 5.5.2 Command not recognized");
      }
    }
  });
  socket.on("error", () => {});
}).listen(2525, "127.0.0.1");

createHttpServer((req, res) => {
  if (req.url === "/last") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(last));
  }
  res.writeHead(200).end("ok");
}).listen(4011, "127.0.0.1");
