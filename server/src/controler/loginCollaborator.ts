import { Response, Request } from 'express';
import { Collaborator } from '../models/Collaborator';
import { sign } from 'jsonwebtoken'

export const loginCollaborator = async (req: Request, res: Response) => {
    const { usercode, password } = req.body

    if (!usercode || !password) {
        return res.status(400).json({ message: "Falta parâmetros" })
    }

    try {
        const [error, collaborator] = await Collaborator.findOne({ usercode })
            .then(collaborator => {
                if (collaborator) {
                    return [null, collaborator]
                } else {
                    return ['Usuário não encontrado', null]
                }
            }
            )
            .catch((error) =>
                [error, null]
            )

        if (error) {
            return res.status(404).json({ message: "Usuário não encontrado" })
        }

        if (collaborator.password !== password) {
            return res.status(401).send({ message: 'Senha incorreta' });

        }

        const token = sign({ userId: collaborator._id, role: collaborator.role }, process.env.SECRET as string);

        return res.status(200).json({message : "Autenticado com sucesso" , token })

    } catch (error) {
        return res.status(500).json({ error })
    }
}


