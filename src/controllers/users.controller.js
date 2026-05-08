import { request, response } from "express";
import generateHash from "../utils/hashProvider.js";
import User from "../model/user.model.js";

// Lista de usuários
export const list = async (request, response) => {
  const users = await User.find();
  return response.json(users);
};

// Buscar usuário por ID
export const getById = async (request, response) => {
  const id = request.params.id;
  const user = await User.findById(id);
  return response.json(user);
};

// Criar usuário
export const create = async (request, response) => {
  const user = request.body;

  const newUser = new User(user);
  await newUser.save(); // salva o novo usuário no banco de dados

  return response.status(201).json(newUser); // retorna o usuário criado com status 201 (Created)
};

// Atualizar usuário por ID
export const update = async (request, response) => {
  const id = request.params.id;
  const user = request.body;

  const updatedUser = await User.findByIdAndUpdate(id, user, {
    returnDocument: "after",
  });

  if (!updatedUser) {
    return response.status(404).json({ message: "Usuário não encontrado" });
  }
  return response.json(updatedUser);
};

// Remover usuário por ID
export const remove = async (request, response) => {
  const id = request.params.id;
  const user = await User.findByIdAndDelete(id);

  return response.status(204).json("Usuário Removido"); // retorna status 204 (No Content) para indicar que a operação foi bem-sucedida, mas não há conteúdo para retornar
};

export default { list, create, getById, update, remove };
