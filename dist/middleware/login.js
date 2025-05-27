"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const login = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).json({ message: "token não fornecido" });
    }
    const [token] = authorization.split(" ");
    try {
        const decode = (0, jsonwebtoken_1.verify)(token, process.env.SECRET);
        req.userIdToken = decode;
        console.log(decode);
        return next();
    }
    catch (error) {
        return res.status(401).json({ message: "Não autorizado!" });
    }
};
exports.login = login;
