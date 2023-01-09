import {  Response, NextFunction } from "express";

export const checkAdmin = (req: any, res: Response, next: NextFunction) => {
    try {
        if (req.userData.role === 'admin') {
            next()
          }else{
            throw "Auth failed"

          }
       ;
    } catch (error) {
        return res.status(401).send({ message: 'Auth failed' });
    }
};
