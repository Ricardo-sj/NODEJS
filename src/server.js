import routes from "./routes/movieRouter.js";

import express from "express";

const app = express();

const PORT = 3000;

// dois tipos de APIs- Statefull e Stateless

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`API Running on port ${PORT}`);
});
