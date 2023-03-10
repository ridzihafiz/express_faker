import express from "express";
import { user_create, user_read } from "../controllers/user_controller";

const user_routes = express.Router();

// route create user
user_routes.post("/api/user/create", user_create);

// route read user
user_routes.get("/api/users/read", user_read);

export default user_routes;
