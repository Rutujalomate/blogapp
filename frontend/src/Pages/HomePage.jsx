//import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { getAllProducts } from '../Redux/blogs/action';
import {Box,SimpleGrid,Image,Text,Button,Center,Heading,Flex, Avatar,Stack,useColorModeValue} from '@chakra-ui/react';
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { isExpired, decodeToken } from "react-jwt";
import Pagination from "./Pagination";
import Section from "./Section";


const HomePage = ({query}) => {
  //const [data1,setData]=useState('')
 const { data } = useSelector((store) => store.products);
 const  data1  = useSelector((store) => store.products);

//console.log('dataeeeee=',data);
//setData(data[0].userDetails)
//console.log('da=',data1);

//console.log('q',query);
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const [page, setPage] = useState(1);

  const [isReadMore, setIsReadMore] = useState(true);
  const token=localStorage.getItem('token')

  const myDecodedToken = decodeToken(token);
  const isMyTokenExpired = isExpired(token);
  //console.log('decodedToken',myDecodedToken,isMyTokenExpired);
  const location = useLocation()

  const toggleReadMore = () => {
    //setIsReadMore(!isReadMore);
    navigate('/writeblog')
  };

  useEffect(() => {

    dispatch(getAllProducts(page,query));

  }, [dispatch,page,query]);
//   var exp = myDecodedToken.iat * 1000;
// console.log(new Date(exp).toJSON().slice(0, 10));
// var date=new Date(exp).toJSON().slice(0, 10)
const button=Math.ceil(data.length/9)
//console.log('button',button);
if(data1.AllProducts.loading){
  return (<Heading>Loading...</Heading>)
}
if(data.length===0){
  return (<Heading>Sorry blogs are not present</Heading>)
}
  return (
<div className="back">





  








      <SimpleGrid columns={[1, 2,2, 3]} spacingX='20px' spacingY='10px' marginTop={'30px'} className='boximage'>
{data && data.reverse().map((item,index)=>{
 //console.log('item',item)
 // var exp = item.userDetails.iat * 1000;
  //console.log(new Date(exp).toJSON().slice(0, 10));
  //var date=new Date(exp).toJSON().slice(0, 10)
    return(

     <Section item={item}/>


    )

  
          })}
</SimpleGrid>
<Box>
  <Pagination
  currentPage={page}
  totalPages={10}
  handlePageChange={(value) => setPage(value)}
  />
</Box>
    </div>
    )
}

export default HomePage