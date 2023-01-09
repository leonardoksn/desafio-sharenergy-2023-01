import { api } from "../resource/api"

export const getDog = async () => {
    return await api.get("https://random.dog/woof.json")
        .then(res => res.data)
        .catch(err => err)
}