import { Response, Request } from 'express';
import { Person } from '../models/Person';

export const patchPerson = async (req: Request, res: Response) => {
    const { id } = req.params
    const { name, email, phone, address, document } = req.body

    if (!id) {
        return res.status(400).json({ message: "Nem todos os parâmetros foram informados." })
    }

    if (!["name", "email", "phone", "address", "document"].every((key) => key in req.body)) {
        return res.status(400).json({ message: "Nem todos os parâmetros foram informados." })

    }
    const person: any = { name, email, phone, address, document };

    try {
        const [error, updatePerson] = await Person.updateOne({ _id: id }, person)
            .then(person => [null, person])
            .catch((error) =>
                [error, null]
            )
        person["_id"] = id;
        if (error) {
            return res.status(404).json({ message: "Usuário não encontrado" })
        }
        if (updatePerson.modifiedCount === 0) {
            return res.status(200).json({ person, message: "Solicitação bem-sucedida, mas nenhum dado foi alterado" })

        }

        return res.status(200).json({ person: { name, email, phone, address, document, _id: id }, message: "Sucesso na alteração" })

    } catch (error) {
        return res.status(500).json({ error })
    }
}


