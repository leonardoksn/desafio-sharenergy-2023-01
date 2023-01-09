import { Flex, Icon, Input } from '@chakra-ui/react'
import { UserCircleGear, X } from 'phosphor-react'
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

export const EditUser = ({ user, handleSubmit }: { user: IUser, handleSubmit: (event: React.FormEvent<HTMLFormElement>, id: string) => void }) => {
    return (
        <Dialog.Root>
            <Dialog.Trigger title='Edit User'>
                <Icon as={UserCircleGear} color="green.300" boxSize={6} />
            </Dialog.Trigger>
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


                            <Box p={6}>
                                <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => handleSubmit(event, user._id)}>
                                    <Stack direction={"row"} spacing={0} align={'center'} mb={5}>
                                        <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                                            Name:
                                        </Heading>
                                        <Input h="auto" fontSize={'2xl'} defaultValue={user.name} name="name"></Input>
                                    </Stack>

                                    <Stack justify={'center'} >
                                        <Stack direction={"row"}>
                                            <Text color={'gray.500'}>Document:</Text><Input name="document" h="auto" defaultValue={user.document}></Input>
                                        </Stack>
                                        <Stack direction={"row"}>
                                            <Text color={'gray.500'}>Address:</Text><Input name="address" h="auto" defaultValue={user.address}></Input>
                                        </Stack>
                                        <Stack direction={"row"}>
                                            <Text color={'gray.500'}>Email:</Text><Input name="email" h="auto" defaultValue={user.email}></Input>
                                        </Stack>
                                        <Stack direction={"row"}>
                                            <Text color={'gray.500'}>Phone:</Text><Input name="phone" h="auto" defaultValue={user.phone}></Input>
                                        </Stack>
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
                                        Edit
                                    </Button>
                                </form>
                            </Box>
                        </Box>
                    </Center>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
