import { ColumnDef } from '@tanstack/react-table';
import React from 'react'
import { IPerson } from '../pages/ClientList';

import {
    Column,
    useReactTable,
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFacetedMinMaxValues,
    getPaginationRowModel,
    sortingFns,
    getSortedRowModel,
    FilterFn,
    SortingFn,
    flexRender,
    FilterFns,
} from '@tanstack/react-table'
import { compareItems, rankItem } from '@tanstack/match-sorter-utils';
import { fuzzyFilter } from '../ultis/table-sort';
import {
    Flex,
    Table,
    Thead,
    Tr,
    Th,
    Td,
    Box,
    Tbody,
    Stack,
    Text,
    Select,
    Button,
    ButtonGroup,
    Icon,

} from '@chakra-ui/react';
import { DebouncedInput } from './DebounceInput';
import colors from '../resource/colors';
import { IUser } from '../pages/Crud';
import { User, UserCirclePlus } from 'phosphor-react';
import { AddUser } from './AddUser';

export const DataTable = ({ data, columns, addUser }: { data: IUser[]; columns: ColumnDef<IUser, any>[], addUser(e: any): void }) => {

    const [globalFilter, setGlobalFilter] = React.useState('')
    const table = useReactTable({
        data,
        columns,
        filterFns: {
            fuzzy: fuzzyFilter,
        },
        state: {
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: fuzzyFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues(),
        debugTable: true,
        debugHeaders: true,
        debugColumns: false,

    })

    return (
        <Flex p="2em" maxH="100vh">

            <Flex
                flexDirection="column"
                className="p-2"
                bg={colors.primary}
                w="100%"
                overflow="auto"
                p="1em"
                css={{
                    '&::-webkit-scrollbar': {
                        width: '6px',
                    },
                    '&::-webkit-scrollbar-track': {
                        width: '6px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: colors.middle,
                        borderRadius: '8px',
                    },
                }}
            >
                <Flex mb="1em" >
                    <DebouncedInput
                        value={globalFilter ?? ''}
                        onChange={value => setGlobalFilter(String(value))}
                        rounded="none"
                        placeholder="Search for all columns..."
                    />
                    <AddUser handleSubmit={addUser} />
                </Flex>
                <Table w="100%" rounded="md" boxShadow="lg" >
                    <Thead boxShadow="md" >
                        {table.getHeaderGroups().map(headerGroup => (
                            <Tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => {
                                    return (
                                        <Th textTransform="none" fontSize="1em" key={header.id} colSpan={header.colSpan}>
                                            {header.isPlaceholder ? null : (
                                                <Box >
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}

                                                </Box>

                                            )}
                                        </Th>
                                    )
                                })}
                            </Tr>
                        ))}
                    </Thead>
                    <Tbody borderTop="1px solid red">
                        {table.getRowModel().rows.map(row => {
                            return (
                                <Tr _hover={
                                    {
                                        background: "rgba(0,0,0,0.1)",

                                    }}
                                    key={row.id}
                                    transition="0.2s"
                                >
                                    {row.getVisibleCells().map(cell => {
                                        return (
                                            <Td p="0.7em !important" borderColor="gray.300" key={cell.id} fontSize={{ base: "0.6em", md: "0.2em", lg: "0.8em" }}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </Td>
                                        )
                                    })}
                                </Tr>
                            )
                        })}
                    </Tbody>
                </Table>
                <Stack direction='row' spacing={4} align='center' justifyContent="space-between">

                    <Text fontSize="0.8em">Showing{' '}<Text as={"span"} fontWeight="bold">{table.getState().pagination.pageSize} </Text>out of{''}<Text as={"span"} fontWeight="bold"> {table.getPrePaginationRowModel().rows.length}</Text> entries</Text>






                    <Select
                        w=""
                        value={table.getState().pagination.pageSize}
                        onChange={e => {
                            table.setPageSize(Number(e.target.value))
                        }}
                    >
                        {[10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </Select>
                    <ButtonGroup isAttached>
                        <Button
                            colorScheme={"gray"}
                            className="border rounded p-1"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Previous
                        </Button>
                        <Button
                            colorScheme={"gray"}
                            className="border rounded p-1"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                        </Button>
                    </ButtonGroup>

                    <span className="flex items-center gap-1">
                        <div>Page</div>
                        <strong>
                            {table.getState().pagination.pageIndex + 1} of{' '}
                            {table.getPageCount()}
                        </strong>
                    </span>
                </Stack>

            </Flex>
        </Flex>
    )
}
