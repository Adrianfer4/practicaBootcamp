import express from 'express';
import { getAllUsers, create, getUserById, updateUser, deleteUser } from '../controller/userController.js';

const route = express.Router();

route.post('/user', create);
route.get('/users', getAllUsers);
route.get('/users/:id', getUserById);
route.put('/update/users/:id', updateUser);
route.delete('/delete/users/:id', deleteUser);

export default route;