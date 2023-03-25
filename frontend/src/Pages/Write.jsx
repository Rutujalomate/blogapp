import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Select,
  Text,
  useColorModeValue,
  Textarea ,
  Image,HStack, Toast, useToast
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useState } from 'react';
import { isExpired, decodeToken } from "react-jwt";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../Redux/blogs/action';

const Write=() =>{
  const authState = useSelector((state) => state.auth);
  const  data1  = useSelector((store) => store.products);
//console.log(';data1',data1);
  const[title,setTitle]=useState('')
  const[content,setContent]=useState('')
  const[image,setImage]=useState('')
  const[category,setCategory]=useState('')
  const token=localStorage.getItem('token')
  //console.log('token',token);

  const myDecodedToken = decodeToken(token);
  const isMyTokenExpired = isExpired(token);
  //console.log('decodedToken',myDecodedToken,isMyTokenExpired);
  //console.log(title,content,image);
  const dispatch = useDispatch();
  const navigate=useNavigate()

const toast=useToast()
  const handeleblogs=(e)=>{
    e.preventDefault()
    dispatch(addProduct({title,content,image,category,author:myDecodedToken.id,name:myDecodedToken.name,create:myDecodedToken.iat}))
    setTitle('')
    setImage('')
    setContent('')
    
      if(data1.AddProduct.error){
        toast({
          title: "something went wrong ...",
          status: "info",
          duration: 2000,
          isClosable: true,
          position: "top",
        });      
      }

//navigate('/')
//navigate('/')
//window.location.reload() 
  }
  var exp = myDecodedToken.iat * 1000;
//console.log(new Date(exp).toJSON().slice(0, 10));
var date=new Date(exp).toJSON().slice(0, 10)
useEffect(()=>{
  if(data1.AddProduct.message==='blog added'){
    
    toast({
      title: "Blog Posted Sucessfully",
      status: "info",
      duration: 2000,
      isClosable: true,
      position: "top",
    });    
    setTimeout(()=>{
      setTitle('')
      setImage('')
      setContent('')
    setCategory('')
   navigate('/')
    },4000)
  
  }
},[data1,dispatch])

  return (
    <Box
    //minH={'100vh'}0
    align={'center'}
    margin='auto'
    justify={'center'}
    textAlign='left'
    bg={useColorModeValue('gray.50', 'gray.800')}>
    <Stack spacing={8} mx={'auto'} py={12} px={6} bg=''>

      <Box
        //rounded={'lg'}
        bg={useColorModeValue('', 'gray.700')}
        //boxShadow={'lg'}
        margin='auto'
        width={['100%','100%','100%','50%']}
        p={10}>
        <Stack spacing={4}>
          
          <FormControl id="title" isRequired>
            <FormLabel>Title</FormLabel>
            <Input type="text" width={'100%'} variant='flushed' value={title} onChange={(e)=>setTitle(e.target.value)}
 />
          </FormControl>
          <FormControl id="image" isRequired>
            <FormLabel>Add image URL</FormLabel>
            <Input type="text" variant='flushed' value={image} onChange={(e)=>setImage(e.target.value)} />
          </FormControl>

          <FormControl id="image" isRequired>
            <FormLabel>Add Category</FormLabel>
            <Select placeholder=' ' variant='flushed' value={category} onChange={(e)=>setCategory(e.target.value)}>
  <option value='news'>News</option>
  <option value='food'>Food</option>
  <option value='lifestyle'>LifeStyle</option>
  <option value='personal'>Personal</option>
  <option value='photography'>Photography</option>
  <option value='fashion'>Fashion</option>
  <option value='travel'>Travel</option>
  <option value='general'>General</option>

</Select>          </FormControl>


          <FormControl id="content" isRequired>
            <FormLabel>Add Your Story here...</FormLabel>
            <Input type="text" variant='flushed' value={content} onChange={(e)=>setContent(e.target.value)} />
          </FormControl>


          <Stack spacing={10} pt={2}>
            <Button
              loadingText="Submitting"
              size="md"
              bg={'pink.400'}
              color={'white'}
              width='50%'
              _hover={{
                bg: 'pink',
              }}
              onClick={handeleblogs}

              >
Post your Story            </Button>
          </Stack>
         
        </Stack>
      </Box>
    </Stack>
  </Box>
  );
}
export default  Write

// {/* <Flex
// minH={'100vh'}
// // align={'flex-start'}
// // justify={'center'}
// bg={''}
// bgImage={"url()"}
// bgSize= {"cover"}
// top= {0}
// right={0}
// left={0}
// bottom= {0}
// opacity={0.9}

// >
// <Stack spacing={'8'} mx={'auto'} maxW={'auto'} py={''} px={''} 
//       bg={useColorModeValue('', 'black')}
//       marginLeft={'30px'}
//       width={'100%'}

// >
//   <Stack align={'center'}>

//     {/* <Image src='https://media.istockphoto.com/id/1247171756/photo/working-home-concept.jpg?s=612x612&w=0&k=20&c=jPbejJ9gpbgFm5C_g4XYPDsfk5wuhJam68CkMmzXLkw=' width={'60%'} /> */}
//   </Stack>
//   <Box
//     rounded={''}
//     bg={useColorModeValue('black', '')}
//     boxShadow={'lg'}
//     //width={'50%'}
//     // className='central'
//     //margin='auto'
//     p={8}
//     >
//     <Stack spacing={4}>
//       <FormControl id="text">
//         <Input type="text" variant='unstyled' placeholder='Title'   
//           _placeholder={{ color: '#91A3B0' }} size="lg" value={title}
//            onChange={(e)=>setTitle(e.target.value)}
//         />

//       </FormControl>
//       <FormControl id="image">
//         <Input type="text" variant='unstyled' placeholder='Add image url'   
//           _placeholder={{ color: '#91A3B0' }} size="lg" value={image}
//           onChange={(e)=>setImage(e.target.value)}

//         />

//       </FormControl>
//       <FormControl id="password">
//         <Textarea  type="text" variant='unstyled' placeholder='Add Your Story...'
//                         _placeholder={{ color: '#91A3B0' }} size='lg' value={content}
//                         onChange={(e)=>setContent(e.target.value)}

//         />
//       </FormControl>
//       <Stack spacing={100}>
       
//         <Button
//           bg={'blue.400'}
//           color={'white'}
//           width={'10%'}
//           _hover={{
//             bg: 'blue.500',
//           }}
//           onClick={handeleblogs}
//           >
//           Post
//         </Button>
//       </Stack>
//     </Stack>
//   </Box>
// </Stack>
// </Flex> */}