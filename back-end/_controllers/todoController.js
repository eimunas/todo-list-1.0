import {Todo} from '../_database/models/todo.js';

export const getTodos = async (req, res) => {
    const user = req.user;
    if (!user) return res.status(403).json({message: 'Unauthorized user.'});
    const todos = await Todo.find({userId: user.userId});
    return res.status(200).json(todos);
};

export const addTodo = async (req, res) => {
    const userId = req.user.userId;
    const { title, notes } = req.body;
    const newTodo = await Todo.create({
        title,
        notes,
        userId
    });
    if (!newTodo) return res.status(400).json({message: 'Invalid data while adding a todo!'});
    return res.status(201).json(newTodo);
};

export const updateTodo = async (req, res) => {
    const { id } = req.params;
    const updatedTodo = await Todo.findByIdAndUpdate(id, req.body);
    return res.status(200).json(updatedTodo);
};

export const deleteTodo = async (req, res) => {
    const { id } = req.params;
    const deletedTodo = await Todo.findByIdAndDelete(id);
    return res.status(200).json(deletedTodo);
};