import { Flex, Icon, Input } from '@chakra-ui/react'
import { UserCircleMinus, X } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog';
import { IUser } from '../pages/Crud';
import colors from '../resource/colors';

import {
    Heading,
    Avatar,
    Box,
    Center,
    Image,
    Text,
    Stack,
    Button,
    useColorModeValue,
} from '@chakra-ui/react';
import './style.css'
import { useEffect, useReducer, useState } from 'react';

function reducer(state: { count: number, beep: boolean }, action: string) {
    switch (action) {
        case 'beep':
            return { count: state.count + 1, beep: true };
        default:
            throw new Error();
    }
}

export const RemoveContent = ({ handleSubmit, user }: { handleSubmit: (event: React.FormEvent<HTMLFormElement>, id: string) => void, user: IUser }) => {
    const [value, setValue]: any = useState(0);
    const [quantity, dispatch] = useReducer(reducer, { count: 0, beep: false });
    const [auxState, setaxusState] = useState()

    useEffect(() => {
        if (quantity.beep) {
            const timeout = setTimeout(() => {
                console.log(quantity)
            }, 500)
            return () => clearTimeout(timeout)
        }
    }, [quantity])
    return (
        <Dialog.Portal>
            <Dialog.Overlay style={{ background: "#00000060", inset: 0, position: "fixed" }} />

            <Dialog.Content style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: colors.secundary, boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", }}>
                <Center >
                    <Dialog.Close>
                        <Icon boxSize={5} pos="absolute" as={X} top="2" right="2" />
                    </Dialog.Close>

                    <Box
                        py="5"
                        maxW={{ base: '270px', md: "500px" }}
                        w={'full'}
                        bg={"white"}
                        boxShadow={'2xl'}
                        rounded={'md'}
                        overflow={'hidden'}>
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
                                    dispatch('beep')
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

                        <Box p={6}>
                            <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => handleSubmit(event, user._id)}>
                                <Heading>Tem certeza que deseja remover o usuário?</Heading>

                                <Stack justify={'center'} >
                                    <Text color={'gray.500'}>Name: {user.name}</Text>

                                    <Text color={'gray.500'}>Document: {user.document}</Text>


                                    <Text color={'gray.500'}>Address: {user.address}</Text>


                                    <Text color={'gray.500'}>Email: {user.email}</Text>


                                    <Text color={'gray.500'}>Phone: {user.phone}</Text>

                                </Stack>



                                <Button
                                    w={'full'}
                                    mt={8}
                                    bg={useColorModeValue('#151f21', 'gray.900')}
                                    color={'white'}
                                    rounded={'md'}
                                    type="submit"
                                    _hover={{
                                        transform: 'translateY(-2px)',
                                        boxShadow: 'lg',
                                    }}>
                                    Remove
                                </Button>

                            </form>
                        </Box>
                    </Box>
                </Center>
            </Dialog.Content>
        </Dialog.Portal>
    )
}
