import { useAuth } from "../context/auth"
import { api } from "../resource/api"

export const getClients = async () => {
    return await api.get("https://randomuser.me/api/?results=50")
        .then(res => res.data)
        .catch(err => err)
}