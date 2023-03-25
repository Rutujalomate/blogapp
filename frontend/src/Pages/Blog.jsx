import React from 'react'
import {Box,SimpleGrid,Image,Text,Button,Center,Heading,Flex, Avatar,Stack,useColorModeValue} from '@chakra-ui/react';

const Blog = () => {
  return (
    <div>
        <Box className="">
          <Box >
          <Box  display={'flex'} 
                      flexDirection={['column', 'md', 'sm', 'row']}

          justifyContent={'space-evenly'} marginTop='50px'>

                          <Box  backgroundColor={''} textAlign='center' margin={'auto'} verticalAlign={''} width={'50%'}>

              <Heading>
              </Heading>
              <Text  marginTop={'50px'}
                          fontSize={['3xl', '4xl', '5xl', '6xl']}

              >
Tell Your <br/>story to  <br/>the world
              </Text>
              <Text 
            fontSize={['sm', 'md', 'md', 'sm']}

              marginTop={'10px'}>
              Join with us! Login or Register. Write your story and share !!              </Text>
            </Box>
            <Box backgroundColor={''}>             
               <Image
                src='https://mehulk05.github.io/Blogapp-using-MERN/static/media/asset-1.171cd5d9.png'
                alt="homeimage"
                width={'90%'}
                className=""
                // style={{ maxHeight: "750px", marginTop:'80px',width:'80%'}}
              /></Box>

            </Box>


            
          </Box>
        </Box>

    </div>
  )
}

export default Blog