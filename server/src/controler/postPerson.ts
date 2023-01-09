import { Response, Request } from 'express';
import { Person } from '../models/Person';

export const postPerson = async (req: Request, res: Response) => {
    const { name, email, phone, address, document } = req.body;

    if (!["name", "email", "phone", "address", "document"].every((key) => key in req.body)) {
        return res.status(400).json({ message: "Nem todos os parâmetros foram informados." })

    }
        const person = { name, email, phone, address, document };

        try {
            const response = await Person.create(person)
            return res.status(201).json({ message: "Inserido no sistema com sucesso!", person: response })
        } catch (error) {
            return res.status(500).json({ error })
        }
    


}