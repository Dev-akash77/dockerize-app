import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
});

export const TodoModel = mongoose.model("Todo", todoSchema);

  