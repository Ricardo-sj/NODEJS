import { request, response } from "express";
import Movie from "../model/movie.model.js";

// Lista de Filme
export const list = async (request, response) => {
  const movies = await Movie.find();
  return response.json(movies);
};

// Buscar Filme por ID
export const getById = async (request, response) => {
  const id = request.params.id;
  const movie = await Movie.findById(id);
  return response.json(movie);
};

// Criar Filme
export const create = async (request, response) => {
  const movie = request.body;

  const newMovie = new Movie(movie);
  await newMovie.save(); // salva o novo usuário no banco de dados

  return response.status(201).json(newMovie); // retorna o usuário criado com status 201 (Created)
};

// Atualizar Filme por ID
export const update = async (request, response) => {
  const id = request.params.id;
  const movie = request.body;

  const updatedMovie = await Movie.findByIdAndUpdate(id, movie, {
    returnDocument: "after",
  });

  if (!updatedMovie) {
    return response.status(404).json({ message: "Filme não encontrado" });
  }
  return response.json(updatedMovie);
};

// Remover Filme por ID
export const remove = async (request, response) => {
  const id = request.params.id;
  const movie = await Movie.findByIdAndDelete(id);

  return response.status(204).json("Filme Removido"); // retorna status 204 (No Content) para indicar que a operação foi bem-sucedida, mas não há conteúdo para retornar
};

export default { list, create, getById, update, remove };
