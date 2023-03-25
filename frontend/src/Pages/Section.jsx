import React, { useState } from 'react'
import {Box,SimpleGrid,Image,Text,Button,Center,Heading, Avatar,Stack,useColorModeValue} from '@chakra-ui/react';
import { useNavigate ,Link} from 'react-router-dom';

const Section = ({item}) => {
    const [isReadMore, setIsReadMore] = useState(true);
//console.log("secton",item);
   const navigate=useNavigate()
    const toggleReadMore = () => {
        //setIsReadMore(!isReadMore);
        navigate('/writeblog')
      };
      var exp = item.create * 1000;
      //console.log(new Date(exp).toJSON().slice(0, 10));
      var date=new Date(exp).toJSON().slice(0, 10)
     // console.log('typrof',date);

  return (
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
      </Box>
    </Center>  )
}

export default Section