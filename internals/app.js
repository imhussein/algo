const crypto = require("crypto");
process.env.UV_THREADPOOL_SIZE = 4;
const https = require("https");
const fs = require("fs");

var initialTime = Date.now();

https
  .request("https://google.com", (res) => {
    res
      .on("data", (data) => {})
      .on("end", () => {
        console.log("Google", Date.now() - initialTime);
      });
  })
  .end();

fs.readFile("mohamed.txt", { encoding: "utf-8" }, (err, data) => {
  console.log(data);
});

crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
  console.log(`1 - ) ${Date.now() - initialTime}`);
});

crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
  console.log(`2 - ) ${Date.now() - initialTime}`);
});

crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
  console.log(`3 - ) ${Date.now() - initialTime}`);
});

crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
  console.log(`4 - ) ${Date.now() - initialTime}`);
});
