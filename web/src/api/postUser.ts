import { IUser } from "../pages/Crud"
import { api } from "../resource/api"

interface IPatchUser {
    person: IUser,
    message: string
}


export const postUser = ({ token, data }: { token: string, data: Omit<IUser, "_id"> }) => {
    return api.post<IPatchUser>(`/person`, data, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then(res => res.data.person)
}