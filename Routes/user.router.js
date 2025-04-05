import { Router } from "express";
import { login, register,refreshToken } from "../Controllers/user.controller.js";

const Authrouter = Router();


Authrouter.post('/register',register)
Authrouter.post('/login',login)
Authrouter.post('/refreshToken',refreshToken)


export default Authrouter


