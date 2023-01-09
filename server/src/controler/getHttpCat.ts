import { Response, Request } from 'express';
import { Person } from '../models/Person';

import axios from 'axios'

export const getHttpCat = async (req: Request, res: Response) => {
    const { status } = req.params

    if (!status) {
        return res.status(400).json({ message: "Falta parâmetros" })
    }

    try {
 
        const data = await axios.get(`https://http.cat/${status}`)
        .then(res => res.status)
        .then(res => res)
        return res.status(200).json({ data })

    } catch (error) {
        return res.status(500).json({ error })
    }
}


