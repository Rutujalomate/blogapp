import axios from "axios";
import {
  ADD_PRODUCT_FAILURE,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  GET_ALL_PRODUCTS_FAILURE,
  GET_ALL_PRODUCTS_REQUEST,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_AUTHOR_PRODUCT_REQUEST,
  GET_AUTHOR_PRODUCT_SUCCESS,
  GET_AUTHOR_PRODUCT_FAILURE,
  GET_SINGLE_PRODUCT_FAILURE,
  GET_SINGLE_PRODUCT_REQUEST,
  GET_SINGLE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
} from "./actionTypes";

export const getAllProducts = (page,query) => async (dispatch) => {
console.log('page',page);
  try {
    dispatch({ type: GET_ALL_PRODUCTS_REQUEST });
   
    
    const res = await axios.get(`https://bnmn-re8p.onrender.com/blogs/getall?limit=9&page=${page}&category=${query}`);
  
console.log(res);
    dispatch({ type: GET_ALL_PRODUCTS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: GET_ALL_PRODUCTS_FAILURE,
      payload:error
    });
  }
};

export const getSingleProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_PRODUCT_REQUEST });

    const res = await axios.get(
      `https://bnmn-re8p.onrender.com/blogs/${id}`
    );
    
console.log('fgh',res);
    dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_PRODUCT_FAILURE,
    });
  }
};






export const getautherblog = (id) => async (dispatch) => {
  //console.log('is',iid);
  //var id=id
    console.log('is',id);

  try {
    dispatch({ type: GET_AUTHOR_PRODUCT_REQUEST });

  const res=  await fetch(`https://bnmn-re8p.onrender.com/blogs`, {
      // body: JSON.stringify(res),
      method: "GET",
      headers: {
        id
,
        "Content-Type": "application/json",
      },
    });
    var data=await res.json()
console.log('fgh123',data);
    dispatch({ type: GET_AUTHOR_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_AUTHOR_PRODUCT_FAILURE,
    });
  }
};














export const addProduct = (data) => async (dispatch) => {
 //console.log('dis',data);
 //var body1= JSON.stringify({...data,userDetails:data.userDetails})
// var body2= JSON.stringify(data)

 //console.log('body2=',body1);

  try {
    dispatch({ type: ADD_PRODUCT_REQUEST });

    const res = await fetch("https://bnmn-re8p.onrender.com/blogs/blogpost", {
      body: JSON.stringify(data),
      method: "POST",
      headers: {
        token: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });
    let data1 = await res.json();
    //console.log('res=',res);
    console.log('data1=',data1);
    dispatch({ type: ADD_PRODUCT_SUCCESS, payload: data1 });
  } catch (error) {
    dispatch({
      type: ADD_PRODUCT_FAILURE,
    });
  }
};

export const updateProduct = (id, data) => async (dispatch) => {
  
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    await fetch(`https://bnmn-re8p.onrender.com/blogs/${id}`, {
      body: JSON.stringify(data),
      method: "PATCH",
      headers: {
        token: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });
    

    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAILURE,
    });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    await fetch(`https://bnmn-re8p.onrender.com/blogs/${id}`, {
      method: "DELETE",
      headers: {
        token: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: id });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAILURE,
    });
  }
};