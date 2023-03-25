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

const MyBlogs = () => {
  const { data } = useSelector((store) => store.products);
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
      
  return (
    <div>    
        <SimpleGrid columns={[1, 2,2, 3]} spacingX='20px' spacingY='10px' marginTop={'30px'} className='boximage'>
    {data && data.map((item,index)=>{

      //console.log('item',item.userDetails.name);
      //var exp = item.userDetails.iat * 1000;
      //console.log(new Date(exp).toJSON().slice(0, 10));
      //var date=new Date(exp).toJSON().slice(0, 10)
      const toggleReadMore = () => {
        //setIsReadMore(!isReadMore);
        navigate('/writeblog')
      };
      return(
        <Section item={item}/>
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

export default MyBlogs