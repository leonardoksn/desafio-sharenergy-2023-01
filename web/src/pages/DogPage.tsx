import { Button, Flex, Img } from "@chakra-ui/react"
import { useState } from "react"
import { useQuery } from "react-query"
import { getDog } from "../api/getDog"
import { RefreshButton } from "../components/RefreshButton"

function DogPage() {
    const [click, setClick] = useState(false)
    const { data, isLoading, isError } = useQuery(['dog', click], () => getDog(),
        {
            staleTime: 600000,
            cacheTime: 0,
        })
    if (isLoading) return <Flex>Carregando...</Flex>
    if (isError) return <Flex>Deu erro</Flex>
    return (
        <Flex w="100%">
            <Img maxH="90vh" maxW="100%" src={data.url} />
            <Button
                onClick={() => setClick(prev => !prev)}
            />
        </Flex>
    )
}
export { DogPage }  