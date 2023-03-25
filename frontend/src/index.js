import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <Provider store={store}>     
   <ChakraProvider >

<BrowserRouter>
<App/>
  </BrowserRouter>
  </ChakraProvider>
 </Provider> 

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();










{/* <Box className='maindiv'>

<Box>
<Image
src={item.image}
alt='Dan Abramov'
boxSize='150px'

className='mainimage'
width={'100%'}
/>
<Box className='desc'>
<Text as='b'>{item.title}</Text>

<Text className="">{isReadMore ? item.content.slice(0, 150) : item.content}
<Link to={`/blogs/${item._id}`}>
<span  onClick={toggleReadMore} className="read-or-hide" color='red'>
{isReadMore ? "...read more" : " show less"}
</span>
</Link>

</Text>

</Box>

</Box>
<Box className="subdiv">
<Box><Avatar bg='teal.500'size='sm' />
</Box>
<Box display={'flex'} flexDirection={'column'} textAlign={'left'}><Text>{item.userDetails.name}</Text>
<Text>{date}</Text>
</Box>
</Box>
</Box> */}