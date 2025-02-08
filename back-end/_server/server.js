import express from 'express';
import cors from 'cors';
import todoRoutes from '../_routers/todoRoutes.js';
import userRoutes from '../_routers/userRoutes.js';
import mongoose from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/TodoApp')
    .then(() => console.log("Database is working!"))
    .catch(err => console.log("Database is not working: " + err));


const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/api/todos', todoRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));



