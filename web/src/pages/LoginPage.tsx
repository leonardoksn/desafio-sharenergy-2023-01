import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,

} from '@chakra-ui/react';

import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import colors from '../resource/colors';

export function LoginPage() {

  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();
  const [remember, setRemember] = useState<boolean>(false)

  let from = location.state?.from?.pathname || "/users";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let username = formData.get("username") as string;
    let password = formData.get("password") as string;

    auth.signin({ username, password, remember }, (isAuth: boolean) => {
      navigate(isAuth ? "/users" : '/login?err=err');
    });
  }
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={colors.dark}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack color={colors.primary} align={'center'}>
          <Heading

            fontSize={'4xl'}>Logue em sua conta</Heading>
          <Text fontSize={'lg'}>
            Divirta-se com as novas atualizações ✌️
          </Text>
        </Stack>
        <Box
          color="#fff"
          rounded={'lg'}
          bg={colors.high}
          boxShadow={'lg'}

          p={8}>
          <Stack spacing={4}>
            <form onSubmit={handleSubmit}>
              <FormControl id="username" >
                <FormLabel>Endereço de email</FormLabel>
                <Input type="text" name="username" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Senha</FormLabel>
                <Input type="password" name="password" />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox
                    onChange={(e) => { setRemember(e.target.checked) }}
                    name='remember'
                  >Lembre-se de mim</Checkbox>

                </Stack>
                <Button
                  type="submit"
                  bg={colors.secundary}
                  color={'white'}
                  _hover={{
                    bg: colors.secundary + "90",
                  }}>
                  Logar
                </Button>

              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack >
    </Flex >
  );
}