import "./database";
import "reflect-metadata";
import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import { router } from "./routes/routesUser";
import { routerProduct }   from "./routes/routesProduct";
import { routerCategory }   from "./routes/routerCategory";
import { routerLogin } from "./routes/auth";
import expressLayouts from "express-ejs-layouts"
import session from "express-session";
import passport from "passport";




const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//RUTAS
app.use(router);
app.use(routerProduct);
app.use(routerCategory);


app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return response.status(400).json({
      error: err.message,
    });
  }

  return response.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
});

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, "..", "public")));

app.use(expressLayouts);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,  "../views"));



app.use(routerLogin)

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
