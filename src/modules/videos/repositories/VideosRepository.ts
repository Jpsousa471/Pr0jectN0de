import { pool } from "../../../mysql";
import { v4 as uuidv4  } from 'uuid'
import { Request, Response } from "express";

class VideoRepository {
    create(request: Request, response: Response){
        const {title, description, thumbnail, publishedAt} = request.body;
        const {userId}  = request.userIdToken; // Verifica se userIdToken existe
        pool.getConnection((err: any, connection: any) => {
            connection.query(
                'INSERT INTO videos (videos_id, user_id, title, description, thumbnail, publishedAt) VALUES (?,?,?,?,?,?)',
                [uuidv4(),userId, title, description, thumbnail, publishedAt],
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
        const {userId}  = request.userIdToken; // Verifica se userIdToken existe
        // const userId = id;
        // console.log(userId)
        pool.getConnection((err: any, connection: any) => {

        
         connection.query(
            'SELECT * FROM videos WHERE user_id = ?',
            [userId],
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


    searchVideos(request: Request, response: Response){
        const { search: search } = request.query;
        pool.getConnection((err: any, connection: any) => {
        
         connection.query(
            'SELECT * FROM videos WHERE title LIKE ?',
            [`%${search}%`],
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
