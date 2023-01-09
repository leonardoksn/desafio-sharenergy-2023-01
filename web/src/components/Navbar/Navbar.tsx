import { Box, GridItem, Heading, List, ListIcon, ListItem } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { linksManu } from '../../ultis/links'
import './style.navbar.css';

import { SignOut } from 'phosphor-react'
import { useAuth } from '../../context/auth';
import colors from '../../resource/colors'

export const Navbar = () => {
    let navigate = useNavigate();

    const { signout } = useAuth()
    return (
        <GridItem
            display={{ base: 'none', md: 'block' }}
            pl='2'
            bg={colors.dark}
            area={'nav'}

        >
            <Box p="1em" h="100%"
            >
                <Heading as='h4' size='md' mb="30px" color={colors.primary}>
                    Sharenergy
                </Heading>
                <List
                    color={colors.secundary}
                    fontSize="lg"
                >
                    {
                        linksManu.map((item) => (
                            <ListItem
                                key={item.key}
                            >
                                <Link
                                    className='link-menu'
                                    to={item.path}>
                                    <ListIcon as={item.icon}

                                    />
                                    {item.desc}
                                </Link>

                            </ListItem>
                        ))
                    }

                    <ListItem
                      className='link-menu'
                    >

                        <ListIcon
                          
                            as={SignOut}
                        />
                        <button
                            onClick={() => {
                                signout(() => navigate("/login"));
                            }}
                        >
                            Sair
                        </button>

                    </ListItem>

                </List>
            </Box>

        </GridItem>
    )
}
