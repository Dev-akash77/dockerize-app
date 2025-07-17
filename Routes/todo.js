import express from "express";
import { getAlltodo } from "../Controller/todo.js";

const router = express.Router();

//! Get all todos (with Redis cache)
router.get("/all-todo", getAlltodo);



export const todoRouter =  router;
