import { Box, Flex, Grid, GridItem, Heading, List, ListIcon, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import { Users, Cat, Dog } from 'phosphor-react'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Navbar } from './Navbar/Navbar'
import { ProtectedRoutes } from '../routes/ProtectedRoutes'
import colors from '../resource/colors'

export const Layout = () => {
  return (

    <Grid
      templateAreas={`"nav main"`}
      gridTemplateRows={'100vh'}
      gridTemplateColumns={{ base: "0px 1fr", md: '200px 1fr' }}
      gap='1'
      color='blackAlpha.700'

    >

      <Navbar />
      <GridItem bg={colors.secundary} area={'main'}>
        <Outlet />
      </GridItem>

    </Grid>




  )
}

