import { Box, Flex, Heading, Spinner, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import colors from '../resource/colors'

export const LoadingPage = () => {
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={colors.dark}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack color={colors.primary} align={'center'}>

                    <Spinner size='xl' />
                </Stack>

            </Stack >
        </Flex >
    )
}
