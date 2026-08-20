import http from "http";
const PORT = 3000;
const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);
  res.writeHead(200, {
    "content-type": "text/plain",
  });
  res.end("Shareit server is running ");
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on PORT:${PORT} .`);
});
