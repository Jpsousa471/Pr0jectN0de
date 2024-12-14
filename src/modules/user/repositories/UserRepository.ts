import { compare, hash } from "bcrypt";
import { pool } from "../../../mysql";
import { v4 as uuidv4  } from 'uuid'
import { Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";

class UserRepository {
    create(request: Request, response: Response){
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
            
                        return response.status(200).json({message: 'Usuário criado com sucesso!'});
            
                    }
                )
            })
        })
    }


    login(request: Request, response: Response){
        const {email, password} = request.body;
        pool.getConnection((err: any, connection: any) => {
        
           
         connection.query(
            'SELECT * FROM users WHERE email = ?',
            [email],
            (error: any, results: any, fildes: any) => {
                connection.release();
                if (error) {
                    return response.status(400).json({error: "Este Email já existe, por favor, tente outro"})
                }
                // console.log(results[0].email)

                compare(password, results[0].password, (err, result) => {
                        if (err) {
                            return response.status(500).json({error: "Erro ao conectar ao banco de dados"})
                        }
                        // console.log(result)
                        if(!result) {
                            return response.status(400).json({error: "Erro de autenticação!"})
                        }
                        const token = sign({
                            userId: results[0].user_id as string,
                            email: results[0].email
                        }, process.env.SECRET as string, {expiresIn: "1d"});

                        //console.log(token)

                        return response.status(200).json({token: token, message: 'Autenticado com sucesso!'})

                        })
                        
                    }
                )

            })
    }

    GetUser(request: any, response: any){
        const decode: any = verify(request.headers.authorization, process.env.SECRET as string);
        if(decode.email){
            pool.getConnection((error, conn) => {
                conn.query(
                    'SELECT * FROM users WHERE email=?',
                    [decode.email],
                    (error, resultado, fields) => {
                        conn.release();
                        if(error){
                            return response.status(400).send({
                                error: error,
                                response: null
                            })
                        }
    
                        console.log(resultado)
    
                        return response.status(201).send({
                            user: {
                                name: resultado[0].name,
                                email: resultado[0].email,
                                id: resultado[0].user_id,
                            }
                        })
                    }
                )
            })
        }
    }

}


export { UserRepository }