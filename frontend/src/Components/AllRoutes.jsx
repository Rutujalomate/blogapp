import { useState } from "react";
import {Routes,Route,useRoutes,Router} from "react-router-dom"
import Blog from "../Pages/Blog";
import HomePage from "../Pages/HomePage";
import Login from "../Pages/Login";
import MenuBar from "../Pages/MenuBar";
import MyBlogs from "../Pages/MyBlogs";
import Mynewblogs from "../Pages/Mynewblogs";
import SignUp from "../Pages/SignUp";
import SingleBlog from "../Pages/SingleBlog";
import SocialProfileWithImage from "../Pages/SocialProfileWithImage";
import Write from "../Pages/Write";
import NavBar from "./NavBar";
import PrivateRoute from "./PrivateRoute";


function AllRoutes() {
  const [text, setText] = useState("");

  const handleAdd=(cat)=>{
//console.log('text',cat);
setText(cat)
  }
 // console.log('text',text);

  return (
    <div>




      <Routes>
        <Route path="/" element={<><MenuBar handleAdd={handleAdd}/><Blog query={text}/></>}/> 
        <Route path="/home" element={<><MenuBar handleAdd={handleAdd}/><HomePage query={text}/></>}/> 

         <Route path="/login" element={<><MenuBar handleAdd={handleAdd}/><Login /></>} /> 
         <Route path="/signup" element={<><MenuBar handleAdd={handleAdd}/><SignUp /></>} /> 
         <Route path="/myallblog" element={<><MenuBar handleAdd={handleAdd}/><PrivateRoute><Mynewblogs/></PrivateRoute></>}/> 
         <Route path="/writeblog" element={<><MenuBar handleAdd={handleAdd}/><PrivateRoute><Write /></PrivateRoute></>}/> 
         <Route path="/blogs/:id" element={<><MenuBar handleAdd={handleAdd}/><PrivateRoute><SingleBlog /></PrivateRoute></>}/> 

         <Route path="/user" element={<><MenuBar/><PrivateRoute><SocialProfileWithImage/></PrivateRoute></>}/> 

        
        
      </Routes>


    </div>
  );
}

export default AllRoutes;
