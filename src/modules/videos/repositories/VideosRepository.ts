import { compare, hash } from "bcrypt";
import { pool } from "../../../mysql";
import { v4 as uuidv4  } from 'uuid'
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";

class VideoRepository {
    create(request: Request, response: Response){
        const {title, description, user_id} = request.body;
        pool.getConnection((err: any, connection: any) => {
            connection.query(
                'INSERT INTO videos (videos_id, user_id, title, description) VALUES (?,?,?,?)',
                [uuidv4(), user_id, title, description],
                (error: any, result: any, fildes: any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json(error)
                    }
        
                    return response.status(200).json({message: 'Vídeo criado com sucesso!'});
        
                }
            )
        
        })

    }


    getVideos(request: Request, response: Response){
        const {user_id} = request.body;
        pool.getConnection((err: any, connection: any) => {
        
            console.log(user_id)

         connection.query(
            'SELECT * FROM videos WHERE user_id = ?',
            [user_id],
            (error: any, results: any, fildes: any) => {
                connection.release();
                if (error) {
                    return response.status(400).json({error: "Erro ao buscar os vídeos"})
                }
                //console.log(user_id)
                return response.status(200).json({ message: 'Vídeos retornados com sucesso!', videos: results})

                        
                    }
                )
    
            })
    }


    serachVideos(request: Request, response: Response){
        const { serach } = request.query;
        pool.getConnection((err: any, connection: any) => {
        
         connection.query(
            'SELECT * FROM videos WHERE description LIKE ?',
            [`%${serach}%`],
            (error: any, results: any, fildes: any) => {
                connection.release();
                if (error) {
                    return response.status(400).json({error: "Erro ao buscar os vídeos"})
                }

                console.log(results)

                return response.status(200).json({ message: 'Vídeos retornados com sucesso!', videos: results})

                        
                    }
                )
    
            })
    }


}


export { VideoRepository };
