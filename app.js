const http = require("http");

const server = http.createServer((req, res) => {
  res.write("Hello world");
  res.end();
});

server.listen(3_000, () => {
  console.log("Server is listening.");
});
