import express, {
  Request,
  Response,
  NextFunction,
  Router,
  RequestHandler,
} from "express";
import "colors";

interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

interface RequestHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler;
}

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.session && req.session.loggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
};

/**
 * @Router
 */

export class AppRouter {
  private static router: Router;

  static getRouter(): Router {
    if (!AppRouter.router) {
      AppRouter.router = express.Router();
    }
    return AppRouter.router;
  }
}

/***
 * @Decorators
 */

enum Methods {
  get = "get",
  post = "post",
  delete = "delete",
  put = "put",
  patch = "patch",
}

enum Keys {
  path = "path",
  method = "method",
  middleware = "middleware",
  postPath = "postPath",
  caching = "caching",
}

function routeHandler(method: Methods) {
  return function (path: string) {
    return function (target: any, key: string, prop: RequestHandlerDescriptor) {
      Reflect.defineMetadata(Keys.postPath, path, target, key);
      Reflect.defineMetadata(Keys.method, method, target, key);
    };
  };
}

function use(middleware: RequestHandler) {
  return function (target: any, key: string, prop: RequestHandlerDescriptor) {
    const middlewares: RequestHandler[] =
      Reflect.getMetadata(Keys.middleware, target, key) || [];
    Reflect.defineMetadata(
      Keys.middleware,
      [...middlewares, middleware],
      target,
      key
    );
  };
}

function caching(middleware: RequestHandler) {
  return function (target: any, key: string, prop: PropertyDescriptor) {
    Reflect.defineMetadata(Keys.caching, middleware, target, key);
  };
}

function controller(prefixPath: string) {
  return function (target: Function) {
    for (let key in target.prototype) {
      const routeHandler: RequestHandler = target.prototype[key];
      const path = Reflect.getMetadata(Keys.postPath, target.prototype, key);
      const middleware =
        Reflect.getMetadata(Keys.middleware, target.prototype, key) || [];
      const method: Methods = Reflect.getMetadata(
        Keys.method,
        target.prototype,
        key
      );
      const caching: RequestHandler =
        Reflect.getMetadata(Keys.caching, target.prototype, key) || [];
      if (path) {
        AppRouter.getRouter()
          .route(prefixPath + path)
          [method](...middleware, caching, routeHandler);
      }
    }
  };
}

const get = routeHandler(Methods.get);
const post = routeHandler(Methods.post);

/***
 * @Routes
 */
@controller("/login")
class LoginRoutes {
  @get("/")
  @caching(async (req: Request, res: Response, next: NextFunction) => {
    console.log("Redis Caching".yellow.bold);
    next();
  })
  async get(req: Request, res: Response, next: NextFunction) {
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

  @post("/")
  post(req: LoginRequest, res: Response, next: NextFunction) {
    req.session = {
      loggedIn: true,
    };
    res.redirect("/");
  }
}

@controller("/logout")
class LogoutRoutes {
  @get("/")
  logout(req: Request, res: Response) {
    req.session = null;
    res.redirect("/");
  }
}

@controller("/admin")
class AdminRoutes {
  @get("/")
  @use(requireAuth)
  admin(req: Request, res: Response, next: NextFunction) {
    res.send("Admin route");
  }
}

@controller("")
class HomeRoutes {
  @get("/")
  home(req: Request, res: Response) {
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
  }
}
