import express from 'express';
import { loginUser, registerUser } from "../_controllers/userController.js";
const router = express.Router();

router.post('/', registerUser);
router.post('/tokens', loginUser);

export default router;