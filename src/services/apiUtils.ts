import axios from "axios";
import { IPost } from "../interfaces/Post/Post";

export const getPosts = async () => {
  // Make a request for a user with a given ID
  //tmpResult = await  axios.get(`${URI}/tasks`)
 
  const URI = "https://my-json-server.typicode.com/sergemr/my-json-server";
  const data = await axios
    .get(`${URI}/posts`)
    .then((response) => {
      return response.data;
    })
    .catch((error: any) => {
      
    });

 

  return data;
}; 

export const getPost = async (postID:string) => {
  // Make a request for a user with a given ID
  //tmpResult = await  axios.get(`${URI}/tasks`)
   let filter = postID; 
  
  const URI = "https://my-json-server.typicode.com/sergemr/my-json-server";
  const data = await axios
    .get(`${URI}/posts/${filter}`)
    .then((response) => {
      return response.data;
    })
    .catch((error : any) => {
     
    });

  

  return data;
}; 


export const updatePost = async (post: IPost) => {
  // Make a request for a user with a given ID
  //tmpResult = await  axios.get(`${URI}/tasks`)
   
  const URI = "https://my-json-server.typicode.com/sergemr/my-json-server";
  const data = await axios
    .put(`${URI}/posts/${post.id}`, {
      data: post
    })
    .then((response) => {
      return response.data;
    })
    .catch((error: any) => {
      
    });
 

  return data;
}; 

export const deletePost = async (postID: IPost) => {
  // Make a request for a user with a given ID
  //tmpResult = await  axios.get(`${URI}/tasks`)
   let filter = postID;  
  const URI = "https://my-json-server.typicode.com/sergemr/my-json-server";
  const data = await axios
    .delete(`${URI}/posts/${postID}`)
    .then((response) => {
      return response.data;
    })
    .catch((error: any) => {
      
    });
 
  return data;
}; 

export const createNewPost = async (post: IPost) => {
  // Make a request for a user with a given ID
  //tmpResult = await  axios.get(`${URI}/tasks`)
   
  const URI = "https://my-json-server.typicode.com/sergemr/my-json-server";
  const data = await axios
    .post(`${URI}/posts/`, {
      data: post
    })
    .then((response) => {
      return response.data;
    })
    .catch((error: any) => {
      
    });
 

  return data;
}; 