import { useState, useEffect } from 'react'
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Post = ({ posts, auth })=> {
  const { id } = useParams();
  const post = posts.find(post => post._id === id);

  if(!post){
    return null;
  }
  return (
    <div>
      <h1>{ post.title }</h1>
      <h2>{post.description}</h2>
      { auth._id === post.author._id ? <button>x</button>: ''}
    </div>
  );
};

export default Post;
