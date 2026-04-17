import { request, response } from "express";
import { v4 as uuidv4 } from "uuid"; 


/*
Atributos:
● id
● title

● description
● year
● genres
● image
● video
*/

//Impressão de crud de filmes

let movies = [];

// LISTAR FILMES
export const list = (request, response) => {
  return response.json(movies);
};

// BUSCAR POR ID
export const getById = (request, response) => {
  const  id  = request.params.id;
  const movie = movies.find((m) => m.id === id);

  if (!movie) {
    return response.status(404).json({ message: "Filme não encontrado" });
  }

  return response.json(movie);
};

// CRIAR FILME
export const create = (request, response) => {
  const { title, description, year, genres, image, video } = request.body;

  const newMovie = {
    id: uuidv4(),
    title,
    description: description || "sem descrição",
    year: year || "sem ano definido",
    genres: genres || "sem gênero definido",
    image: image || "sem imagem definida",
    video: video || "sem vídeo definido",
  };

  movies.push(newMovie);

  return response.status(201).json(newMovie);
};

// ATUALIZAR FILME
export const update = (request, response) => {
  const id  = request.params.id;
  const { title, description, year, genres, image, video } = request.body;

  const movieIndex = movies.find((m) => m.id === id );

  if (movieIndex < 0) {
    return response.status(404).json({ message: "Filme não encontrado" });
  }

  const updatedMovie = {
    title,
    description,
    year,
    genres,
    image,
    video,
  };

  movies[movieIndex] = updatedMovie;

  return response.json(updatedMovie);
};

// REMOVER FILME
export const remove = (request, response) => {
  const id = request.params.id;
  const movieIndex = movies.find((m) => m.id === id);

  if (movieIndex < 0) {
    return response.status(404).json({ message: "Filme não encontrado" });
  }

  movies.splice(movieIndex, 1);

  return response.json({ message: "Filme removido com sucesso" });
};

export default { list, create, getById, update, remove };
