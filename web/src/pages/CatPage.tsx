import { Button, Center, Flex, Heading, Img, Input, InputGroup, InputRightElement, Stack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useMutation, useQuery } from "react-query";
import { getHttpCat } from "../api/getHttpCat";
import { DebouncedInput } from "../components/DebounceInput"
import colors from "../resource/colors"

function CatPage() {
    const [value, setValue] = useState(0);

    return (
        <Center flexDirection="column" textAlign="center" justifyContent='center' alignContent="center">
            <Heading mt="0.5em">Digite um status code</Heading>
            <Stack flexDirection="row">
                <DebouncedInput
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
                    onChange={value => {
                        setValue((prev) => {
                            return isNaN(Number(value)) ? prev : Number(value)
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

            {<Img
                w="500px"
                src={`https://http.cat/${value}`}
            />}

        </Center >
    )
}
export { CatPage }  