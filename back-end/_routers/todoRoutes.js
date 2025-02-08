import express from 'express';
import {
    addTodo,
    deleteTodo,
    getTodos,
    updateTodo
} from "../_controllers/todoController.js";
import { verifyToken } from "../_middleware/auth.js";
const router = express.Router();

router.get('/', verifyToken, getTodos);
router.post('/', verifyToken, addTodo);
router.put('/:id', verifyToken, updateTodo);
router.delete('/:id', verifyToken, deleteTodo);

export default router;