import { Response, Request } from 'express';
import { Collaborator } from '../models/Collaborator';

export const postCollaborator = async (req: Request, res: Response) => {
    const { name, email, phone, address, document, role, password, usercode } = req.body;

    if (!["name", "email", "phone", "address", "document", "role", "password", "usercode"].every((key) => key in req.body)) {
        return res.status(400).json({ message: "Nem todos os parâmetros foram informados." })
    }
    const collaborator = { name, email, phone, address, document, role, password, usercode };

    try {
        const response = await Collaborator.create(collaborator)
        return res.status(201).json({ message: "Inserido no sistema com sucesso!", id: response._id })
    } catch (error) {
        return res.status(500).json({ error })
    }
}