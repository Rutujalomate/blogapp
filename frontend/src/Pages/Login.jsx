import React from 'react'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    useToast,
  } from '@chakra-ui/react';
  import { useState,useEffect } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  import { useDispatch, useSelector } from "react-redux";
import { authLogin, authRegister, signup } from '../Redux/auth/action';
import { Link, useNavigate } from 'react-router-dom';
import { isExpired, decodeToken } from "react-jwt";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const authState = useSelector((state) => state.auth);
    //console.log('authState',authState);
    const navigate = useNavigate();
const toast=useToast()
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(formData);
        dispatch(authLogin({email,password}));
//anotherFunction()
        
      };

      const anotherFunction=()=>{
        
          if(authState.userLogin
            .error ) {
            console.log('ghjui')
            toast({
              title: "incorrect email or password",
              status: "info",
              duration: 2000,
              isClosable: true,
              position: "top",
            });
        
          }
         
      
      }

      const token=localStorage.getItem('token')
     // console.log('token',token);

      const myDecodedToken = decodeToken(token);
      const isMyTokenExpired = isExpired(token);
      //console.log('decodedToken',myDecodedToken,isMyTokenExpired);



      useEffect(() => {
        //onOpen();
//console.log('token===null',token===null);
        if(authState.data.isAuthenticated || token) {
          toast({
            title: "Login Sucessfully",
            status: "info",
            duration: 2000,
            isClosable: true,
            position: "top",
          });
          setTimeout(() => {

            navigate("/");
          }, 2000);  
          }

          if (authState.userLogin.error) {
           // alert('ghjui')
            toast({
              title: "incorrect email or password",
              status: "info",
              duration: 2000,
              isClosable: true,
              position: "top",
            });
        
          }

          
        



        
      }, [token,authState,toast,dispatch])
      
      
  return (
<Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        
        bgImage= {'url("https://images.unsplash.com/photo-1422207258071-70754198c4a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=860&q=80") !important'}
        bgSize= {"cover"}
          top= {'0'}
          right= {'0'}
          left={'0'}
          bottom={'0'}
          opacity= {'0.9'}
        >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'} color={'white'}>
Login           
 </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>

              <FormControl id="email" isRequired>
                <FormLabel color={'white'}>Email address</FormLabel>
                <Input type="email" color={'white'}             
                  onChange={(e) => setEmail(e.target.value)}/>
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel color={'white'}>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'}  color={'white'}         
                       onChange={(e) => setPassword(e.target.value)}/>
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={'black'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  onClick={handleSubmit}

                  >
                    Login
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'} color={'white'}>
                  Don't have account? <Link color={'blue.400'} to={'/signup'}><Text color={'blue.400'}> SignUp</Text></Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>  )
}

export default Login