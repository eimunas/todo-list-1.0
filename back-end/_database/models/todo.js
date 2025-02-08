import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    notes: { type: String, required: false },
    userId: { type: String, required: true }
});

export const Todo = mongoose.model('Todo', todoSchema);