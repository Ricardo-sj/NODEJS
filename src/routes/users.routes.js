import { Router } from "express";

import userController from "../controllers/users.controller.js";

const routes = Router();
routes.get("/users", userController.list);

routes.post("/users", userController.create);
routes.get("/users/:id", userController.getById);
routes.put("/users/:id", userController.update);
routes.delete("/users/:id", userController.remove);

export default routes;
