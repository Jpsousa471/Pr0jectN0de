import { Router } from "express";
import { pool } from "../mysql";
import { compare, hash } from "bcrypt";
import { v4 as uuidv4  } from 'uuid'
import { sign } from "jsonwebtoken";

const userRoutes = Router();
userRoutes.post('/user/sign-up', (request, response) => {
    const {name, email, password} = request.body;
    pool.getConnection((err: any, connection: any) => {
     hash(password, 10, (err, hash) => {
         if(err) {
             return response.status(500).json(err)
         }
 
         connection.query(
             'INSERT INTO users (user_id, name, email, password) VALUES (?,?,?,?)',
             [uuidv4(), name, email, hash],
             (error: any, result: any, fildes: any) => {
                 connection.release();
                 if (error) {
                     return response.status(400).json(error)
                 }
     
                 return response.status(200).json({succes: true});
     
             }
         )
 
     })
 
    })
 
 
 })

 userRoutes.post('/user/login', (request, response) => {
    const {email, password} = request.body;
   pool.getConnection((err: any, connection: any) => {
   
      connection.query(
           'SELECT * FROM users WHERE email = ?',
            [email],
            (error: any, results: any, fildes: any) => {
                connection.release();
                 if (error) {
                    return response.status(400).json({error: "Erro na sua autenticação!"})
                 }
                 // console.log(results[0].email)

              compare(password, results[0].password, (err, result) => {
                       if (err) {
                           return response.status(500).json({error: "Erro ao conectar ao banco de dados"})
                       }
                       console.log(result)
                     if(!result) {
                           return response.status(400).json({error: "Erro de autenticação!"})
                       }
                       const token = sign({
                         id: results[0].user_id,
                         email: results[0].email
                    }, "segredo", {expiresIn: "1d"});

                     //console.log(token)

                     return response.status(200).json({token: token})

                    })
                    
             }
         )

    })
   
 })

 export default userRoutes

