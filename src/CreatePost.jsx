import { useState } from 'react'
import { Link } from 'react-router-dom';

const CreatePost = ({ createPost })=> {
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [location, setLocation] = useState('');

  const submit = async(ev)=> {
    ev.preventDefault();
    try {
      const post = {price, title, description, location};
      await createPost(post);
    }
    catch(ex){
      if(ex.response){
        setError(ex.response.data);
      }
      else {
        setError(ex.response);
      }
    }
  };
  return (
    <div>
      <form onSubmit={ submit }>
        {
          error ? JSON.stringify(error, null, 2) : null
        }
        <input placeholder='title' onChange={ev => setTitle(ev.target.value)} />
        <input placeholder='description' onChange={ev => setDescription(ev.target.value)} />
        <input placeholder='price' onChange={ev => setPrice(ev.target.value)} />
        <input placeholder='location' onChange={ev => setLocation(ev.target.value)}/>
        <button>Create</button>
      </form>
      <Link to='/'>Cancel</Link>
    </div>
  );
};

export default CreatePost;
