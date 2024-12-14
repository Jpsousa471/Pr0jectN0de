import { verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";

const login = (req: Request, res: Response, next: NextFunction ) => {
    
    const authorization = req.headers.authorization;

    if(!authorization) {
        return res.status(401).json({message: "token não fornecido"});
    }

    const [ token ] = authorization.split(" ");

    try{
        const decode = verify(token, process.env.SECRET as string);
        req.userIdToken = decode
        console.log(decode);
        return next();
    } catch(error){
        return res.status(401).json({message: "Não autorizado!"});
    }
}


export { login };