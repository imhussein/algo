"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cookie_session_1 = __importDefault(require("cookie-session"));
require("colors");
require("reflect-metadata");
var port = process.env.PORT || 5000;
var app = express_1.default();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cookie_session_1.default({ secret: "secret" }));
var requireAuth = function (req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
    }
    else {
        res.redirect("/login");
    }
};
/**
 * @Router
 */
var AppRouter = /** @class */ (function () {
    function AppRouter() {
    }
    AppRouter.getRouter = function () {
        if (!AppRouter.router) {
            AppRouter.router = express_1.default.Router();
        }
        return AppRouter.router;
    };
    return AppRouter;
}());
app.use(AppRouter.getRouter());
app.listen(port, function () { return console.log(("Listening on port " + port).green.bold); });
/***
 * @Decorators
 */
var Methods;
(function (Methods) {
    Methods["get"] = "get";
    Methods["post"] = "post";
    Methods["delete"] = "delete";
    Methods["put"] = "put";
    Methods["patch"] = "patch";
})(Methods || (Methods = {}));
var Keys;
(function (Keys) {
    Keys["path"] = "path";
    Keys["method"] = "method";
    Keys["middleware"] = "middleware";
    Keys["postPath"] = "postPath";
    Keys["caching"] = "caching";
})(Keys || (Keys = {}));
function routeHandler(method) {
    return function (path) {
        return function (target, key, prop) {
            Reflect.defineMetadata(Keys.postPath, path, target, key);
            Reflect.defineMetadata(Keys.method, method, target, key);
        };
    };
}
function use(middleware) {
    return function (target, key, prop) {
        var middlewares = Reflect.getMetadata(Keys.middleware, target, key) || [];
        Reflect.defineMetadata(Keys.middleware, __spreadArrays(middlewares, [middleware]), target, key);
    };
}
function caching(middleware) {
    return function (target, key, prop) {
        Reflect.defineMetadata(Keys.caching, middleware, target, key);
    };
}
function controller(prefixPath) {
    return function (target) {
        var _a;
        for (var key in target.prototype) {
            var routeHandler_1 = target.prototype[key];
            var path = Reflect.getMetadata(Keys.postPath, target.prototype, key);
            var middleware = Reflect.getMetadata(Keys.middleware, target.prototype, key) || [];
            var method = Reflect.getMetadata(Keys.method, target.prototype, key);
            var caching_1 = Reflect.getMetadata(Keys.caching, target.prototype, key) || [];
            if (path) {
                (_a = AppRouter.getRouter()
                    .route(prefixPath + path))[method].apply(_a, __spreadArrays(middleware, [caching_1, routeHandler_1]));
            }
        }
    };
}
var get = routeHandler(Methods.get);
var post = routeHandler(Methods.post);
/***
 * @Routes
 */
var LoginRoutes = /** @class */ (function () {
    function LoginRoutes() {
    }
    LoginRoutes.prototype.get = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        res.send("\n      <form method=\"POST\">\n        <div>\n          <label for=\"email\"></label>\n          <input type=\"email\" name=\"email\" />\n        </div>\n        <div>\n          <label for=\"password\"></label>\n          <input type=\"password\" name=\"password\" />\n        </div>\n        <div>\n          <input type=\"submit\" value=\"submit\" />\n        </div>\n      </form>\n    ");
                        return [4 /*yield*/, next()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginRoutes.prototype.post = function (req, res, next) {
        req.session = {
            loggedIn: true,
        };
        res.redirect("/");
    };
    __decorate([
        get("/"),
        caching(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log("Redis Caching".yellow.bold);
                next();
                return [2 /*return*/];
            });
        }); }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], LoginRoutes.prototype, "get", null);
    __decorate([
        post("/"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", void 0)
    ], LoginRoutes.prototype, "post", null);
    LoginRoutes = __decorate([
        controller("/login")
    ], LoginRoutes);
    return LoginRoutes;
}());
var LogoutRoutes = /** @class */ (function () {
    function LogoutRoutes() {
    }
    LogoutRoutes.prototype.logout = function (req, res) {
        req.session = null;
        res.redirect("/");
    };
    __decorate([
        get("/"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LogoutRoutes.prototype, "logout", null);
    LogoutRoutes = __decorate([
        controller("/logout")
    ], LogoutRoutes);
    return LogoutRoutes;
}());
var AdminRoutes = /** @class */ (function () {
    function AdminRoutes() {
    }
    AdminRoutes.prototype.admin = function (req, res, next) {
        res.send("Admin route");
    };
    __decorate([
        get("/"),
        use(requireAuth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", void 0)
    ], AdminRoutes.prototype, "admin", null);
    AdminRoutes = __decorate([
        controller("/admin")
    ], AdminRoutes);
    return AdminRoutes;
}());
var HomeRoutes = /** @class */ (function () {
    function HomeRoutes() {
    }
    HomeRoutes.prototype.home = function (req, res) {
        if (req.session && req.session.loggedIn) {
            res.send("\n          <div>\n            <h2>Logged in</h2>\n            <a href=\"/logout\">Logout</a>\n          </div>\n        ");
        }
        else {
            res.send("\n          <div>\n            <h2>Logged out</h2>\n            <a href=\"/login\">login</a>\n          </div>\n        ");
        }
    };
    __decorate([
        get("/"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], HomeRoutes.prototype, "home", null);
    HomeRoutes = __decorate([
        controller("")
    ], HomeRoutes);
    return HomeRoutes;
}());
