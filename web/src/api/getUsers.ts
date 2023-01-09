import { IUser } from "../pages/Crud"
import { api } from "../resource/api"

interface IGetUser {
    people: IUser[]
}

export const getUsers = ({ token }: { token: string }) => {
    return api.get<IGetUser>("/person", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then(res => res.data.people)
}