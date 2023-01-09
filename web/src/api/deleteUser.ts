import { IUser } from "../pages/Crud"
import { api } from "../resource/api"

interface IDeleteUser {
    person: IUser,
    message: string
}


export const deleteUser = ({ token, id }: { token: string, id: string }) => {
    return api.delete<IDeleteUser>(`/person/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then(res => res.data.person)
}