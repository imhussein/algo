import express from "express";
import cookieSession from "cookie-session";
import "colors";
import "reflect-metadata";
import { AppRouter } from "./server";

const port = process.env.PORT || 5000;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({ secret: "secret" }));
app.use(AppRouter.getRouter());
app.listen(port, () => console.log(`Listening on port ${port}`.green.bold));
