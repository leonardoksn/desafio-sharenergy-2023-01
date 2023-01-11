import { Button, Center, Flex, Heading, Img, Input, InputGroup, InputRightElement, Stack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useMutation, useQuery } from "react-query";
import { getHttpCat } from "../api/getHttpCat";
import { DebouncedInput } from "../components/DebounceInput"
import colors from "../resource/colors"

function CatPage() {
    const [value, setValue]: any = useState(0);
    const [quantity, setQuantity] = useState(0);


    useEffect(() => {
        const timeout = setTimeout(() => {
           console.log(quantity)
        }, 1500)

        return () => clearTimeout(timeout)
    }, [quantity])
    return (
        <Center flexDirection="column" textAlign="center" justifyContent='center' alignContent="center">
            <Heading mt="0.5em">Digite um status code</Heading>
            <Stack flexDirection="row">
                <Input
                    m="0"
                    fontSize="3em"
                    w="500px"
                    border="8px"
                    borderRadius="2xl"
                    color={colors.primary}
                    inputMode="numeric"
                    min={0}
                    value={value ?? 0}
                    borderColor={colors.middle}
                    onChange={({ target }) => {

                        if (target.value.at(-1) === '&') {
                            setQuantity((prev) => prev + 1)
                            target.value = ''
                        }
                        setValue(() => {
                            return target.value
                        })
                    }}
                    rounded="none"
                    _placeholder={{
                        color: colors.primary
                    }}
                    _focus={
                        {
                            borderColor: colors.primary
                        }}
                    h="100px"
                />

            </Stack>
            <Heading>{quantity}</Heading>
            {/* 
            {<Img
                w="500px"
                src={`https://http.cat/${value}`}
            />} */}

        </Center >
    )
}
export { CatPage }  