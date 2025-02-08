import { Todo } from './models/todo.js';
import mongoose from "mongoose";

mongoose.connect('mongodb://127.0.0.1:27017/TodoApp')
    .then(() => console.log("Database is working!"))
    .catch(err => console.log("Database is not working: " + err));

const todos = [
    {
        title: "Todo 1",
        notes: "My first todo"
    },
    {
        title: "Todo 2",
        notes: "My second todo"
    },
    {
        title: "Todo 3",
        notes: "My third todo"
    },
];

Todo.insertMany(todos)
    .then(res => console.log(res))
    .catch(err => console.log(err));

