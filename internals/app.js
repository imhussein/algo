const crypto = require("crypto");
process.env.UV_THREADPOOL_SIZE = 1;

var initialTime = Date.now();

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

crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
  console.log(`5 - ) ${Date.now() - initialTime}`);
});
