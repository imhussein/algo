import express, { Request, Response, NextFunction } from "express";
import cookieSession from "cookie-session";
import "colors";

const port = process.env.PORT || 5000;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({ secret: "secret" }));

const loginRoutes = express.Router();
const appRoutes = express.Router();
const adminRoutes = express.Router();

interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.session && req.session.loggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
};

adminRoutes.get(
  "/admin",
  requireAuth,
  (req: Request, res: Response, next: NextFunction) => {
    res.send("Admin route");
  }
);

appRoutes.route("/").get((req: Request, res: Response) => {
  if (req.session && req.session.loggedIn) {
    res.send(`
      <div>
        <h2>Logged in</h2>
        <a href="/logout">Logout</a>
      </div>
    `);
  } else {
    res.send(`
      <div>
        <h2>Logged out</h2>
        <a href="/login">login</a>
      </div>
    `);
  }
});

loginRoutes
  .route("/login")
  .get(
    async (req: Request, res: Response, next: NextFunction) => {
      console.log("Caching".yellow.bold);
      next();
    },
    async (req: Request, res: Response, next: NextFunction) => {
      res.send(`
      <form method="POST">
        <div>
          <label for="email"></label>
          <input type="email" name="email" />
        </div>
        <div>
          <label for="password"></label>
          <input type="password" name="password" />
        </div>
        <div>
          <input type="submit" value="submit" />
        </div>
      </form>
    `);
      await next();
    }
  )
  .post((req: LoginRequest, res: Response, next: NextFunction) => {
    req.session = {
      loggedIn: true,
    };
    res.redirect("/");
  });
loginRoutes.route("/logout").get((req: Request, res: Response) => {
  req.session = null;
  res.redirect("/");
});
app.use(appRoutes);
app.use(loginRoutes);
app.use(adminRoutes);

app.listen(port, () => console.log(`Listening on port ${port}`.green.bold));
