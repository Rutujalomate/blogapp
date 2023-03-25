import React, { useState } from 'react'
import { ReactNode } from 'react';
import { HiUserCircle,HiShoppingCart,HiOutlineUserCircle,HiOutlineUserGroup ,HiHome,HiPencilAlt} from "react-icons/hi";
import { GrRefresh } from "react-icons/gr";
import {
  Box,
  Flex,
  Text,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { FaUserAlt } from 'react-icons/fa';

import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import {Link, useNavigate }from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../Redux/auth/action';
import { useEffect } from 'react';
// const Links = ['Dashboard', 'Projects', 'Team'];

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}>
    {children}
  </Link>
);

const NavBar = (props) => {
const {handleAdd}=props
//console.log('handleAdd',handleAdd);
  const toast=useToast()
  const [text, setText] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate=useNavigate()
//console.log('auth',authState);
useEffect(()=>{
  //handleAdd(text);
  console.log('authState.data.isAuthenticated',authState.data.isAuthenticated);
//   if (authState.userLogout.message=='Logout Successfully') {
//     // alert('ghjui')
//      toast({
//        title: "user logged out",
//        status: "info",
//        duration: 2000,
//        isClosable: true,
//        position: "top",
//      });
 
//    }
  if(handleAdd==undefined){
    console.log('yes')
  }
else{
  handleAdd(text)
}
},[text,authState,toast,dispatch])
const handlelogOut=(e)=>{
  //console.log('hello');
  e.preventDefault();

  dispatch(signout());
 // alert(authState.userLogout.message)
  //anotherFunc()

}








const anotherFunc=()=>{
  //alert('hello')

  if(authState.userLogout.message=="Logout Successfully"){
    toast({
      title: "user Logged out Sucessfully",
      status: "info",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
   }
}
const handlerefresh=()=>{
   // console.log("refreshing.................");
    navigate('/')
    window.location.reload() 
   }
   const handlerefreshblog=()=>{
    ///console.log("refreshing.................");
    navigate('/myallblog')
    window.location.reload() 

   }
   
  return (
    <div>
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={''}         width={['100%','100%','100%','100%']}
 boxShadow='rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px'>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'} backgroundColor='' padding={'2%'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'} backgroundColor=''    >
          
          <Box cursor={"pointer"} display="flex" border={'3px solid blue'} padding='6px'> <Link to={"/"} ><Text as='b'>Blog</Text></Link></Box>
           <Box cursor={"pointer"} display="flex" > <HiHome style={{color: 'black', border:'1px',fontSize:'25px'}} /><Link to={"/home"}><Text fontSize={['sm', 'md', 'lg', 'lg']} >Home</Text></Link></Box>

          <Box cursor={"pointer"} display="flex" > <HiPencilAlt style={{color: 'black', border:'1px', fontSize: '25px'}}/><Link to={"/writeblog"}><Text fontSize={['sm', 'md', 'lg', 'lg']}>writeblog</Text></Link></Box>

        
           
        
              {/* {isOpen ? (<Box>Categories</Box>):null} */}
            {/* <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', lg: 'flex' }}>
               Flex gap={'40px'}
            <Link to={`/product?category=`}>
                 
                 <Text as='b'>HOME</Text>
              </Link>
           
            <Link to={`/product?category=Mens`}>
                 <Text as='b'>WriteBlog</Text>

              </Link>
            
            </HStack> */}
          </HStack>
          
          <Flex alignItems={'center'}>
            <Menu>
              <MenuItem>
                
                 <Flex gap={'40px'} className='hide' display={{ base: 'none', sm: 'inline-flex'  }}>
                 <Menu>

</Menu>
          <Button>
          {!authState.data.isAuthenticated ? (<Link to='/login'><Text>Login</Text></Link>):(<Text ></Text>)}

          </Button>
            
            
<Box cursor={"pointer"} display="flex" border={'3px solid black'} padding='6px'>

    <Link to='/signup' ><Text>Signup</Text></Link>

</Box>

            </Flex>
              </MenuItem>
              <MenuList>
                <MenuItem>Link 1</MenuItem>
                 <MenuItem>Link 2</MenuItem> 
                <MenuDivider />
                <MenuItem>Link 3</MenuItem>
              </MenuList>
            </Menu>
          </Flex>

        </Flex>
        

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
            Flex gap={'40px'}
            {/* <Link to={`/`}>
                 <Text as='b'>HOME</Text>
              </Link>
           
            
            <Link to={`/product?category=Womens`}>
              WriteBlog
              </Link> */}
            
               <Flex gap={'40px'} flexDirection={'column'}>
               <Menu>
  <MenuButton as={''} rightIcon={<FaUserAlt />}>
    <Box display={'flex'}><HiUserCircle style={{color: 'black', border:'1px', fontSize: '30px'}}/><Text>    Account</Text></Box>
  </MenuButton>
  <MenuList>
    <Link to={"/myallblog"}><MenuItem >My Blogs</MenuItem></Link>
    <Link to='/user'><MenuItem>Profile</MenuItem></Link>
    <MenuItem>
    
    {!authState.data.isAuthenticated ? (<Link to={'/login'}><Text>Login</Text></Link>):(<Text onClick={handlelogOut}>Logout</Text>)}
    </MenuItem>
    
  </MenuList>
             </Menu>           
             <Box cursor={"pointer"} display="flex" > <HiUserCircle style={{color: 'black', border:'1px', fontSize: '30px'}}/><Link to={"/signup"} >SignUp</Link></Box>
            <Menu>
  <MenuButton as={Button} >
    Category
  </MenuButton>
  <MenuList >
    <MenuItem onClick={()=>setText('news')}>News</MenuItem>
    <MenuItem onClick={()=>setText('lifestyle')}>Life-style</MenuItem>
    <MenuItem onClick={()=>setText('fashion')}>fashion</MenuItem>
    <MenuItem onClick={()=>setText('travel')}>Travel</MenuItem>
    <MenuItem onClick={()=>setText('photography')}>PhotoGraphy</MenuItem>
    <MenuItem onClick={()=>setText('general')}>General</MenuItem>
    <MenuItem onClick={()=>setText('personal')}>Personal</MenuItem>
    <MenuItem onClick={()=>setText('food')}>Food</MenuItem>

  </MenuList>
</Menu>
            </Flex> 
            </Stack>
          </Box>
        ) : null}

      </Box>


    </div>
  )
}

export default NavBar