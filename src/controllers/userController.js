import fs from "fs";
import path from "path";

const __dirname = path.resolve();
const dataPath = path.join(__dirname, "src/data/users.json");

function readUsers() {
  const data = fs.readFileSync(dataPath);
  return JSON.parse(data);
}

function writeUsers(users) {
  fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));
}

export const getUsers = (req, res) => {
  res.json(readUsers());
};

export const getUserById = (req, res) => {
  const users = readUsers();
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
  res.json(user);
};
export const createUser = (req, res) => {
  const users = readUsers();
  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    ...req.body,
  };
  users.push(newUser);
  writeUsers(users);
  res.status(201).json(newUser);
};

export const updateUser = (req, res) => {
  const users = readUsers();
  const index = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Usuário não encontrado" });

  users[index] = { ...users[index], ...req.body };
  writeUsers(users);
  res.json(users[index]);
};

export const deleteUser = (req, res) => {
  let users = readUsers();
  const index = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Usuário não encontrado" });

  users.splice(index, 1);
  writeUsers(users);
  res.json({ message: "Usuário deletado com sucesso" });
};
