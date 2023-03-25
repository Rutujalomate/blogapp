import { Avatar, Box ,Heading,Image,Text} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleProduct } from '../Redux/blogs/action';
import { isExpired, decodeToken } from "react-jwt";

const SingleBlog = () => {
   // const params = useParams();
   const [detail,setuserDetails]=useState({})
    const { id } = useParams();
  const dispatch = useDispatch();
  let data = useSelector((store) => store.products.singleData);
    let data1 = useSelector((store) => store.products);
const {userDetails}=data
console.log('data',data);
  useEffect(() => {
    dispatch(getSingleProduct(id));
    //dispatch(getAllProducts({ category: data.category }));
    

  }, [dispatch, id]);
  //const art=userDetails ? userDetails:''
  
    //console.log('data1', art);
    
    let currentDate = new Date().toJSON().slice(0, 10);
    //console.log(currentDate)
    const token=localStorage.getItem('token')

  const myDecodedToken = decodeToken(token);
  const isMyTokenExpired = isExpired(token);
  //console.log('decodedToken',myDecodedToken,isMyTokenExpired);
  //var exp = data.cteate * 1000;
  var asd=data.create ? data.create : ''
  var exp = data.create * 1000;
  //console.log(new Date(exp).toJSON().slice(0, 10));
  //var date=new Date(exp).toJSON().slice(0, 10)
//console.log('asd',asd);
//var date=new Date(exp).toJSON().slice(0, 10)
var date1=new Date(asd*1000).toJSON().slice(0, 10)
//console.log('date1',date1,date);
if(data1.Product.loading){
  return <Heading>Loading...</Heading>
}

  return (
    <div>
       

        <Box className='simaindiv'>
            <Box className='simsubdiv'>
<Box>
    <Image src={data.image} borderRadius='10px'    className='mainimage'
boxSize={'70%'}/>
</Box>
<Box textAlign={'left'} backgroundColor='' width={'70%'} margin='auto' className='simsubsubdiv'>
    <Text color={'blue'} as='b' fontSize='lg'>{data.category}</Text>
    <Text  fontSize='2xl' fontWeight={600}>{data.title}</Text>
    <Text fontSize='lg'>{data.content}</Text>
</Box>
</Box>
        </Box>
        <Box className="subdiv" margin={'auto'} width='70%' marginTop={'10px'}>
<Box><Avatar bg='teal.500'size='md' />
</Box>
<Box display={'flex'} flexDirection={'column'} textAlign={'left'}>
  <Text as='b'>{data.name }</Text> 
<Text>{date1}</Text>
</Box>
</Box>
    </div>
  )
}

export default SingleBlog