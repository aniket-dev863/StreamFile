import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const PORT = 3000;

// Get the current file's absolute path
const __filename = fileURLToPath(import.meta.url);

// Get the src/ directory
const __dirname = path.dirname(__filename);

// Go from src/ → project root → public/
const publicDir = path.join(__dirname, "../public");

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // GET /
  if (req.method === "GET" && req.url === "/") {
    const filePath = path.join(publicDir, "index.html");

    res.writeHead(200, {
      "Content-Type": "text/html",
    });

    const fileStream = fs.createReadStream(filePath);

    fileStream.on("error", (err) => {
      console.error(err);
      res.end("Internal Server Error");
    });

    fileStream.pipe(res);

    return;
  }

  // GET /app.js
  if (req.method === "GET" && req.url === "/app.js") {
    const filePath = path.join(publicDir, "app.js");

    res.writeHead(200, {
      "Content-Type": "text/javascript",
    });

    const fileStream = fs.createReadStream(filePath);

    fileStream.on("error", (err) => {
      console.error(err);
      res.end("Internal Server Error");
    });

    fileStream.pipe(res);

    return;
  }

  // POST /upload
  if (req.method === "POST" && req.url === "/upload") {
    const filePath = path.join(__dirname, "../storage/uploads/test-file");

    const writeStream = fs.createWriteStream(filePath);

    req.pipe(writeStream);

    writeStream.on("finish", () => {
      console.log("File upload completed");

      res.writeHead(200, {
        "Content-Type": "text/plain",
      });

      res.end("File uploaded successfully");
    });

    writeStream.on("error", (err) => {
      console.error("File write error:", err);

      res.writeHead(500, {
        "Content-Type": "text/plain",
      });

      res.end("Upload failed");
    });

    return;
  }

  // 404
  res.writeHead(404, {
    "Content-Type": "text/plain",
  });

  res.end("Not Found");
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on PORT:${PORT}`);
});
