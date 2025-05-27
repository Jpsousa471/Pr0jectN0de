"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const bcrypt_1 = require("bcrypt");
const mysql_1 = require("../../../mysql");
const uuid_1 = require("uuid");
const jsonwebtoken_1 = require("jsonwebtoken");
class UserRepository {
    create(request, response) {
        const { name, email, password } = request.body;
        mysql_1.pool.getConnection((err, connection) => {
            (0, bcrypt_1.hash)(password, 10, (err, hash) => {
                console.log(password);
                if (err) {
                    return response.status(500).json(err);
                }
                connection.query('INSERT INTO users (user_id, name, email, password) VALUES (?,?,?,?)', [(0, uuid_1.v4)(), name, email, hash], (error, result, fildes) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json(error);
                    }
                    return response.status(200).json({ message: 'Usuário criado com sucesso!' });
                });
            });
        });
    }
    login(request, response) {
        const { email, password } = request.body;
        mysql_1.pool.getConnection((err, connection) => {
            connection.query('SELECT * FROM users WHERE email = ?', [email], (error, results, fildes) => {
                connection.release();
                if (error) {
                    return response.status(400).json({ error: "Este Email já existe, por favor, tente outro" });
                }
                // console.log(results[0].email)
                (0, bcrypt_1.compare)(password, results[0].password, (err, result) => {
                    if (err) {
                        return response.status(500).json({ error: "Erro ao conectar ao banco de dados" });
                    }
                    console.log(result);
                    if (!result) {
                        return response.status(400).json({ error: "Erro de autenticação!" });
                    }
                    const token = (0, jsonwebtoken_1.sign)({
                        userId: results[0].user_id,
                        email: results[0].email
                    }, process.env.SECRET, { expiresIn: "1d" });
                    //console.log(token)
                    return response.status(200).json({ token: token, message: 'Autenticado com sucesso!' });
                });
            });
        });
    }
    GetUser(request, response) {
        const decode = (0, jsonwebtoken_1.verify)(request.headers.authorization, process.env.SECRET);
        if (decode.email) {
            mysql_1.pool.getConnection((error, conn) => {
                conn.query('SELECT * FROM users WHERE email=?', [decode.email], (error, resultado, fields) => {
                    conn.release();
                    if (error) {
                        return response.status(400).send({
                            error: error,
                            response: null
                        });
                    }
                    console.log(resultado);
                    return response.status(201).send({
                        user: {
                            name: resultado[0].name,
                            email: resultado[0].email,
                            id: resultado[0].user_id,
                        }
                    });
                });
            });
        }
    }
}
exports.UserRepository = UserRepository;
