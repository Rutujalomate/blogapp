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
  import { useEffect, useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  import { useDispatch, useSelector } from "react-redux";
import { authRegister, signup } from '../Redux/auth/action';
import { Link, useNavigate } from 'react-router-dom';
//import { signup } from '../Redux/auth/actions';

   const SignUp=()=> {
    const [showPassword, setShowPassword] = useState(false);
    const [name, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth);
    //console.log('authSta',authState.userRegister.message);
const navigate=useNavigate()
const toast=useToast()
    const handleRegister = (e) => {
        e.preventDefault();
//console.log({ name, email, password,age });
        dispatch(authRegister({ name, email, password,age }));
        
      };
      useEffect(()=>{
        if(authState.userRegister.message=='user created sucessfully'){
          toast({
            title: "user Registered Sucessfully",
            status: "info",
            duration: 2000,
            isClosable: true,
            position: "top",
          });
          
          setTimeout(()=>{
            navigate("/");
          },2000)
            
        }
        
      },[authState,dispatch])
      
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
              Sign up
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel color={'white'}>User Name</FormLabel>
                    <Input type="text" color={'white'} onChange={(e) => setFullname(e.target.value)}/>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel color={'white'}>Age</FormLabel>
                    <Input type="number" color={'white'}               
                       onChange={(e) => setAge(e.target.value)}/>

                  </FormControl>
                </Box>
              </HStack>
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
                  onClick={handleRegister}

                  >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'} color={'white'}>
                  Already a user? <Link color={'blue.400'} to='/login'>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }
export default SignUp