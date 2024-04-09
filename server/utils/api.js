import express from "express";
import { Register, Login } from "../controllers/auth-controller.js";
import { registerSchema } from "../validateSchema/registerSchema.js";
import { loginSchema } from "../validateSchema/loginSchema.js";
import {
  createTodo,
  getAllTodos,
  markTodo,
  removeTodo,
} from "../controllers/todo-controller.js";
import { check } from "express-validator";

export const apiRoute = express.Router();

export const protectedRoute = express.Router();

apiRoute.post("/register", registerSchema, Register);
apiRoute.post("/login", loginSchema, Login);

//Protected Routes
protectedRoute.post(
  "/createtodo",
  [check("desc", "Todo desc is required").exists()],
  createTodo
);

protectedRoute.get("/todolist", getAllTodos);

protectedRoute.post(
  "/marktodo",
  [check("todo_id", "Todo id is required").exists()],
  markTodo
);

protectedRoute.post(
  "/deletetodo",
  [check("todo_id", "Todo id is required").exists()],
  removeTodo
);
