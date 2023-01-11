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
import { RemoveContent } from './RemoveContent';

export const RemoveUser = ({ user, handleSubmit }: { user: IUser, handleSubmit: (event: React.FormEvent<HTMLFormElement>, id: string) => void }) => {
    return (
        <Dialog.Root>
            <Dialog.Trigger title='Remove User'>
                <Icon as={UserCircleMinus} color="tomato" boxSize={6} />
            </Dialog.Trigger>
            <RemoveContent handleSubmit={handleSubmit} user={user} />
        </Dialog.Root>
    )
}
