import { Response, Request } from 'express';
import { Person } from '../models/Person';

export const getPerson = async (req: Request, res: Response) => {
    const { id } = req.params

    if (!id) {
        return res.status(400).json({ message: "Falta parâmetros" })
    }

    try {
        const [error, person] = await Person.findOne({ _id: id })
            .then(person => {
                if (person) {
                    return [null, person]
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

        return res.status(200).json({ person })

    } catch (error) {
        return res.status(500).json({ error })
    }
}


