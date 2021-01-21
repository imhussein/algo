const http = require("http");
const fs = require("fs");
const path = require("path");

async function call() {
  http
    .request("http://google.com", (res) => {
      res
        .on("data", (chunk) => {
          fs.writeFile(
            path.join(path.dirname(process.mainModule.filename), "index.html"),
            chunk,
            { encoding: "utf-8" },
            (err) => {
              if (err) {
                console.log(err);
              }
            }
          );
        })
        .on("end", () => {});
    })
    .end();
}
try {
  call();
} catch (err) {
  console.log(err);
} finally {
  console.log("MEEE");
}

http
  .createServer(async function (req, res) {
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    const data = await fs.promises.readFile("index.html", {
      encoding: "utf-8",
    });
    res.end(data);
  })
  .listen(5000, "127.0.0.1");
