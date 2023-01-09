import { Box, Flex, Img, Spinner, Text } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { getClients } from '../api/getClients'
import {
  ColumnDef,

} from '@tanstack/react-table'

import { useMemo } from 'react'
import { DataTable } from '../components/DataTableClients'
import { useAuth } from '../context/auth'

export type IPerson = {
  picture: string;
  fullName: string;
  email: string;
  age: number;
  username: string;
}

export const ClientList = () => {
  const columns = useMemo<ColumnDef<IPerson, any>[]>(
    () => [
      {
        accessorFn: row => { return { fullname: row.fullName, picture: row.picture } },
        id: 'fullName',
        cell: info =>
          <Flex
            fontWeight="bold"
            h="100%"
            alignItems="center"
          >
            <Img m="auto 0" rounded="full" w="50px" src={info.getValue().picture} mr="12px" />
            <Text>{info.getValue().fullname}</Text>
          </Flex>,
        header: () => <Box >Name</Box>,
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
        accessorFn: row => row.age,
        id: 'age',
        cell: info => info.getValue(),
        header: () => <Text>Age</Text>,
        footer: props => props.column.id,
      },
      {
        accessorFn: row => row.username,
        id: 'username',
        cell: info => info.getValue(),
        header: () => <Text>Username</Text>,
        footer: props => props.column.id,
      }
    ],
    []
  )


  const { isLoading, error, data } = useQuery("list-clients", () =>
    getClients()
      .then((res) =>
        res.results.map((client: any) => {
          return {
            picture: client.picture.large,
            fullName: `${client.name.first} ${client.name.last}`,
            email: client.email,
            username: client.login.username,
            age: client.dob.age
          }
        })
      ), {
    staleTime: 600000,
    cacheTime: 0,
    // enabled: false
  }
  )


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

    <DataTable data={data || []} columns={columns} />

  )
}
