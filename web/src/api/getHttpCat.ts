import { api } from "../resource/api"

export const getHttpCat = async ({ status }: { status: number }) => {
    return await api.get(`/http/cat/${status}`,)
        .then(res => res.data)
        .catch(err => err)
}