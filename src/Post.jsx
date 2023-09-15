import { useState, useEffect } from 'react'
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Post = ({ posts, auth })=> {
  const { id } = useParams();
  const post = posts.find(post => post._id === id);
  const COHORT_NAME = '2307-FTB-ET-WEB-FT'
  const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`
  const navigate = useNavigate()


  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const post = posts.find(post => post._id === id);
    if(post){
      setTitle(post.title)
      setDescription(post.description)
      setLocation(post.location)
      setPrice(post.price)
    }

  }, [posts, id])


  async function handleDelete(){
  const token = window.localStorage.getItem('token');
  const response = await axios.delete(
    `${BASE_URL}/posts/${id}`, 
    {
      headers: {
        authorization: `Bearer ${ token }`
      }
    }
  )
  navigate("/")
}

  const save = (ev) => {
    ev.preventDefault()
    const post = {price, title, description, location};
  }


  return (
    <div>
      <h1>{ post.title }</h1>
      <h2>{post.description}</h2>
      { auth._id === post.author._id ? 
      <form>
        <input value={title} onChange={ev => setTitle(ev.target.value)}/>
        <input value={description} onChange={ev => setDescription(ev.target.value)}/>
        <input value={price} onChange={ev => setPrice(ev.target.value)}/>
        <input value={location} onChange={ev => setLocation(ev.target.value)}/>
        <button>Update</button>
      </form>: ''
      }
      { auth._id === post.author._id ? 
      <button onClick={handleDelete}>x</button>: ''
      }
    </div>
  );
};

export default Post;
