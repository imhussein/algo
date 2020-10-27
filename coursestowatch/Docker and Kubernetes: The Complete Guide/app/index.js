const express = require("express");
const app = express();
const port = 5000;
app.get("/", function (req, res) {
  res.send(
    "<html><head><style>body {font-family: 'Operator Mono'}</style></head><body><h1>Index Page</h1></body></html>"
  );
});
app.listen(port, () => console.log(`Server started port ${port}`));
