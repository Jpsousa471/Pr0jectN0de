"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoRepository = void 0;
const mysql_1 = require("../../../mysql");
const uuid_1 = require("uuid");
class VideoRepository {
    create(request, response) {
        const { title, description, thumbnail, publishedAt } = request.body;
        const { userId } = request.userIdToken; // Verifica se userIdToken existe
        mysql_1.pool.getConnection((err, connection) => {
            connection.query('INSERT INTO videos (videos_id, user_id, title, description, thumbnail, publishedAt) VALUES (?,?,?,?,?,?)', [(0, uuid_1.v4)(), userId, title, description, thumbnail, publishedAt], (error, result, fildes) => {
                connection.release();
                if (error) {
                    return response.status(400).json(error);
                }
                return response.status(200).json({ message: 'Vídeo criado com sucesso!' });
            });
        });
    }
    getVideos(request, response) {
        const { userId } = request.userIdToken; // Verifica se userIdToken existe
        // const userId = id;
        // console.log(userId)
        mysql_1.pool.getConnection((err, connection) => {
            connection.query('SELECT * FROM videos WHERE user_id = ?', [userId], (error, results, fildes) => {
                connection.release();
                if (error) {
                    return response.status(400).json({ error: "Erro ao buscar os vídeos" });
                }
                //console.log(user_id)
                return response.status(200).json({ message: 'Vídeos retornados com sucesso!', videos: results });
            });
        });
    }
    searchVideos(request, response) {
        const { search: search } = request.query;
        mysql_1.pool.getConnection((err, connection) => {
            connection.query('SELECT * FROM videos WHERE title LIKE ?', [`%${search}%`], (error, results, fildes) => {
                connection.release();
                if (error) {
                    return response.status(400).json({ error: "Erro ao buscar os vídeos" });
                }
                console.log(results);
                return response.status(200).json({ message: 'Vídeos retornados com sucesso!', videos: results });
            });
        });
    }
}
exports.VideoRepository = VideoRepository;
