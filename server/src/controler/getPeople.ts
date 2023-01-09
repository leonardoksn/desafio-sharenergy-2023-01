import { Response, Request } from 'express';
import { Person } from '../models/Person';

export const getPeople = async (req: Request, res: Response) => {

    try {
        const people = await Person.find()
        return res.status(200).json({ people })
    } catch (error) {
        return res.status(500).json({ error })
    }
}


