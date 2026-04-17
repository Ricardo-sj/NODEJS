import { Router } from "express";

import movieController from "../controllers/MovieController.js";

const routes = Router();
routes.get("/movies", movieController.list);

routes.post("/movies", movieController.create);
routes.get("/movies/:id", movieController.getById);
routes.put("/movies/:id", movieController.update);
routes.delete("/movies/:id", movieController.remove);

export default routes;
