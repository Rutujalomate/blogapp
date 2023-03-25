import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getautherblog, updateProduct } from '../Redux/blogs/action';
import { isExpired, decodeToken } from "react-jwt";
import {Box,SimpleGrid,Image,Text,Button,Center,Heading, Avatar,Stack,useColorModeValue,useToast} from '@chakra-ui/react';
import {Link, useNavigate} from 'react-router-dom'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  Flex,
  Grid,
  
} from "@chakra-ui/react";
import Section from './Section';

const Mynewblogs = () => {
  const  data  = useSelector((store) => store.products);
//console.log('data',data);

    const dispatch = useDispatch();
    const token=localStorage.getItem('token')
    const navigate=useNavigate()
    const toast = useToast();

    const myDecodedToken = decodeToken(token);
    const isMyTokenExpired = isExpired(token);
    const [isReadMore, setIsReadMore] = useState(true);
const handleformData=({target})=>{
  let val = target.value;
  
  setProduct({ ...product, [target.name]: val });
}
const handleSubmit=()=>{
  dispatch(updateProduct(product._id, product));
  onClose();
  toast({
    title: "Product updated",
    status: "info",
    duration: 2000,
    isClosable: true,
    position: "top",
  });
}
const [product, setProduct] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
    useEffect(() => {
        dispatch(getautherblog(myDecodedToken.id));
      }, [dispatch,myDecodedToken.id]);

      if(data.AllProducts.loading){
        return (<Heading>Loading...</Heading>)
      }
      
  return (
    <div>    
        <SimpleGrid columns={[1, 2,2, 3]} spacingX='20px' spacingY='10px' marginTop={'30px'} className='boximage'>
    {data.data && data.data?.map((item,index)=>{

      //console.log('item', item);
      //var exp = item.create * 1000;
      //console.log(new Date(exp).toJSON().slice(0, 10));
      //var date=new Date(exp).toJSON().slice(0, 10)
    var exp = item.create * 1000;
      //console.log(new Date(exp).toJSON().slice(0, 10));
      var date=new Date(exp).toJSON().slice(0, 10)
      const toggleReadMore = () => {
        //setIsReadMore(!isReadMore);
        navigate('/writeblog')
      };
      return(
<Center py={6}>
      <Box
        maxW={'445px'}
        key="index"
        w={'full'}
        // bg={useColorModeValue('white', 'gray.900')}
        // boxShadow={'2xl'}
        //boxShadow='rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px'
        rounded={'md'}
        border='1px solid black'
        p={2}
        height='100%'
        overflow={'hidden'}>
        <Box
          h={'250px'}
          bg={'gray.100'}
          mt={-6}
          mx={-6}
          mb={6}
          //backgroundColor='red'
          //border={'1px solid red'}
          pos={'relative'}>
          <Image
            src={
              item.image
            }
            layout={'fill'}
            boxSize='100%'

          />
        </Box>
        <Stack           border={''} width='100%'
        display={'flex'} alignItems='left'
>
          <Text
            color={'green.500'}
            textTransform={'uppercase'}
            fontWeight={800}
            //fontSize={'sm'}
            fontSize={['sm', 'md', 'sm', 'sm']}
            letterSpacing={1.1}>
            {item.category}
          </Text>
          <Heading
            // color={useColorModeValue('gray.700', 'white')}
            textAlign='left'
            //fontSize={'2xl'}
            fontSize={['sm', 'md', 'lg', 'xl']}            fontFamily={'body'}>
            {item.title}
          </Heading>
          {/* <Text fontWeight={600}>{item.userDetails.name}</Text> */}
          <Link to={`/blogs/${item._id}`}>

           <Text color={'gray.500'} textAlign='left'fontSize={['sm', 'md', 'lg', 'md']}
>{isReadMore ? `${item.content?.slice(0, 150) }`: item.content}
<span  onClick={toggleReadMore} className="read-or-hide" color='red'>
{isReadMore ? "...read more" : " show less"}
</span>
</Text> 
</Link>

        </Stack>
        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
          <Avatar
            alt={'Author'}
          />
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
          <Text fontWeight={600}             fontSize={['sm', 'sm', 'sm', 'sm']}>{item.name}</Text> 
          <Text color={'gray.500'}>{date}</Text>
          
          </Stack>
          
        </Stack>
        <Flex>
                    <Button
                      marginTop={5}
                      colorScheme="red"
                  
                      onClick={() => {
                        dispatch(deleteProduct(item._id));
                        toast({
                          title: "Product Deleted",
                          status: "info",
                          duration: 2000,
                          isClosable: true,
                          position: "top",
                        });
                      }}
                    >
                      Delete
                    </Button>

                    <Button
                      onClick={() => {
                        onOpen();
                        setProduct(item);
                      }}
                      marginTop={5}
                      marginLeft="5"
                      colorScheme="blue"
                   
                    >
                      Update
                    </Button>
                  </Flex>
      </Box>

      
    </Center>      
    
    )
      })}
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add A Product</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel> Image URL</FormLabel>
                <Input
                  onChange={handleformData}
                  ref={initialRef}
                  type="url"
                  name="image"
                  value={product.image}
                />
              </FormControl>
              <FormControl>
                <FormLabel> name</FormLabel>
                <Input
                  onChange={handleformData}
                  ref={initialRef}
                  placeholder="Product Name"
                  name="title"
                  value={product.title}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Content</FormLabel>
                <Input
                  onChange={handleformData}
                  name="category"
                  placeholder="Add Your story"
                  value={product.content}
                />
              </FormControl>

             
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    </SimpleGrid>
    </div>

  )
}

export default Mynewblogs