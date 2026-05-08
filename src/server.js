import moviesRoutes from "./routes/movies.routes.js"; // Importa as rotas de filmes
import usersRoutes from "./routes/users.routes.js"; // Importa as rotas de usuários

import moongose from "./config/database.js"; // Importa a configuração do banco de dados

import express from "express";

const app = express();

const PORT = 3000;

// dois tipos de APIs- Statefull e Stateless

app.use(express.json());
app.use(moviesRoutes);
app.use(usersRoutes);

app.listen(PORT, () => {
  console.log(`API Running on port ${PORT}`);
});
