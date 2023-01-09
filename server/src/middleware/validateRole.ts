import {  Response, NextFunction } from "express";

const jwt = require('jsonwebtoken');

export const validateRole = (req: any, res: Response, next: NextFunction) => {
    try {
        const token = req?.headers?.authorization?.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRET as string);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).send({ message: 'Auth failed' });
    }
};
