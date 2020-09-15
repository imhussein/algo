var fs = require("fs"),
  path = require("path"),
  express = require("express"),
  app = express(),
  cookieSession = require("cookie-session"),
  cors = require("cors"),
  http = require("http"),
  file = path.join(process.cwd(), "data.json"),
  data = JSON.parse(
    fs.readFileSync(file, {
      encoding: "utf-8",
    })
  );
app.use(cors());
app.use(express.json());
app.use(cookieSession({ secret: "mohamedhussein" }));
app.get("/data", (request, response) => {
  response.send(data);
});
app.post("/", (request, response) => {
  var ids = data.map((obj) => +obj.id),
    id = Math.max(...ids) + 1,
    newData = [],
    { name } = request.body,
    newItem = {
      id: "" + id,
      name: `Order #${id}`,
    };
  newData = [...data, newItem];
  fs.writeFileSync(file, JSON.stringify(newData), { encoding: "utf-8" });
  response.send(newData);
});
app.post("/login", (req, res) => {
  const { name } = req.body;
  if (name === "mohamed") {
    req.session = {
      success: true,
    };
    return res.send();
  }
  res.status(400).send("Invalid Credentials");
});
http.createServer(app).listen(3000, "127.0.0.1");
