import { Box, Flex, Img, Spinner, Text, Icon } from '@chakra-ui/react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
    ColumnDef,

} from '@tanstack/react-table'

import { useMemo, useState } from 'react'
import { DataTable } from '../components/DataTableUsers'
import { getUsers } from '../api/getUsers'
import { useAuth } from '../context/auth'
import { ActionsUsers } from '../components/ActionsUsers'
import { api } from '../resource/api'
import { patchUser } from '../api/patchUser'
import { UserCircleGear, UserCirclePlus } from 'phosphor-react'
import { postUser } from '../api/postUser'
import { deleteUser } from '../api/deleteUser'


export type IUser = {
    address: string;
    document: string;
    email: string;
    name: string;
    phone: string;
    _id: string;
}

export const Crud = () => {
    const user = useAuth()
    const queryClient = useQueryClient()
    const token = user.token as string
    const [open, setOpen] = useState()


    const columns = useMemo<ColumnDef<IUser, any>[]>(
        () => [
            {
                accessorFn: row => row.name,
                id: 'name',
                cell: info => info.getValue(),
                header: () => <Text>Name</Text>,
                footer: props => props.column.id,
            },
            {
                accessorFn: row => row.address,
                id: 'address',
                cell: info => info.getValue(),
                header: () => <Text>Address</Text>,
                footer: props => props.column.id,
            },
            {
                accessorFn: row => row.document,
                id: 'document',
                cell: info => info.getValue(),
                header: () => <Text>Document</Text>,
                footer: props => props.column.id,
            },
            {
                accessorFn: row => row.email,
                id: 'email',
                cell: info => info.getValue(),
                header: () => <Text>Email</Text>,
                footer: props => props.column.id,
            },
            {
                accessorFn: row => row.phone,
                id: 'phone',
                cell: info => info.getValue(),
                header: () => <Text>Phone</Text>,
                footer: props => props.column.id,
            },
            {
                accessorFn: row => row,
                id: 'actions',
                cell: info => <ActionsUsers editUser={editUser} removeUser={removeUser} row={info.getValue()} />,
                header: () => <Text>Action</Text>,
                footer: props => props.column.id,
            },
        ],
        []
    )


    const { isLoading, error, data, refetch } = useQuery("list-users", () =>
        getUsers({ token })
        , {
            staleTime: 600000,
            cacheTime: 0,
            // enabled: false
        }
    )

    const patch = useMutation({
        mutationFn: patchUser,
        onSuccess: (data) => {
            queryClient.setQueriesData("list-users", (currentData: any) => currentData.map((user: IUser) => user._id === data._id ? data : user))
        }
    })
    const post = useMutation({
        mutationFn: postUser,
        onSuccess: (data) => {
            queryClient.setQueriesData("list-users", (currentData: any) => [...currentData, data])
        }
    })
    const _delete = useMutation({
        mutationFn: deleteUser,
        onSuccess: (data) => {
            queryClient.setQueriesData("list-users", (currentData: any) => currentData.filter((user: IUser) => !(user._id === data._id)))
        }
    })


    const editUser = (event: React.FormEvent<HTMLFormElement>, id: string) => {
        event.preventDefault();
        let formData = new FormData(event.currentTarget);
        let document = formData.get("document") as string;
        let name = formData.get("name") as string;
        let address = formData.get("address") as string;
        let email = formData.get("email") as string;
        let phone = formData.get("phone") as string;
        const data = { document, address, email, phone, name }
        patch.mutate({ token, data, id })

    }

    const addUser = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let formData = new FormData(event.currentTarget);
        let document = formData.get("document") as string;
        let name = formData.get("name") as string;
        let address = formData.get("address") as string;
        let email = formData.get("email") as string;
        let phone = formData.get("phone") as string;
        const data = { document, address, email, phone, name }
        post.mutate({ token, data })

    }
    const removeUser = (event: React.FormEvent<HTMLFormElement>, id: string) => {
        event.preventDefault();
        _delete.mutate({ token, id })
    }
    if (isLoading) {
        return (
            <Flex
                h="100%"
                alignItems="center"
                justifyContent="center"
            >
                <Spinner
                    w={{ base: 'xl', md: "350px" }}
                    h={{ base: 'xl', md: "350px" }}
                    thickness='20px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                />
            </Flex>
        )
    }

    if (error) {
        return (
            <Flex>Erro</Flex>
        )
    }


    return (
        <Flex>

            <DataTable data={data ?? []} addUser={addUser} columns={columns} />
        </Flex>
    )
}
