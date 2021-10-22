import { Router } from "express";
import { login } from "../controllers/login";



const routerLogin = Router();

routerLogin.get("/",(request, response) => {
    response.render("home");
  });


routerLogin.post('/login',login)


export { routerLogin };
