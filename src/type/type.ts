import { JwtPayload } from "jsonwebtoken";

// Estender a interface Request para incluir userId
declare module "express-serve-static-core" {
    interface Request {
        userIdToken: string | object  // Adiciona o tipo da propriedade ao Request
    }
}

