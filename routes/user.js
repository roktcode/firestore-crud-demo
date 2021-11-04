import { Router } from "express";
import userController from '../controllers/user.js';

const user = Router();

user.get('/', userController.getAll);
user.get('/:id', userController.getById);
user.post('/', userController.create)
user.put('/:id', userController.getByIdAndUpdate)
user.delete('/:id', userController.getByIdAndDelete)

export default user;