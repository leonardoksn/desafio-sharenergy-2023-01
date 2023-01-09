import { IUser } from "../pages/Crud"
import { api } from "../resource/api"

interface IPatchUser {
    person: IUser,
    message: string
}


export const patchUser = ({ token, data, id }: { token: string, data: Omit<IUser, "_id">, id: string }) => {
    return api.patch<IPatchUser>(`/person/${id}`, data, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then(res => res.data.person)
}