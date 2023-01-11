import { Response, Request, NextFunction } from "express";

const jwt = require('jsonwebtoken');

export const verifyToken = (req: Request, res: Response) => {
    try {

        const {token} = req.body
    
        jwt.verify(token, process.env.SECRET as string);

        return res.status(200).send({ token, auth: true });

    } catch (error) {
        return res.status(401).send({ auth: false });
    }
};
