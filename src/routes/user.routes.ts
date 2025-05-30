import { Router } from "express";
import { UserRepository } from "../modules/user/repositories/UserRepository";
import { login } from "../middleware/login";

const userRoutes = Router();
const userRepository = new UserRepository();

userRoutes.post('/sign-up', (request, response) => {
   console.log(request);
   // console.log(response);
    userRepository.create(request, response);
})

 userRoutes.post('/sign-in', (request, response) => {
    userRepository.login(request, response);
 })

 userRoutes.get('/get-users', login, (request, response) =>{
    userRepository.GetUser(request, response);
 })

 export default userRoutes

