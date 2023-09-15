import { useState, useEffect } from 'react'
import api from './api';
import AuthForm from './AuthForm';
import CreatePost from './CreatePost';
import Posts from './Posts';
import Post from './Post';
import AboutUs from './AboutUs';
import Home from './Home';
import Contact from './Contact';





import { useNavigate, useParams, Link, Routes, Route } from 'react-router-dom';

function App() {
  const [auth, setAuth] = useState({});
  const [posts, setPosts] = useState([]);

  

  const navigate = useNavigate();



  useEffect(()=> {
    const fetchPosts = async()=> {
      const posts = await api.fetchPosts();
      setPosts(posts);
    };
    fetchPosts();
  }, []);

  useEffect(()=> {
    const attemptLogin = async()=> {
      try {
        const _auth = await api.loginWithToken();
        setAuth(_auth);
      }
      catch(ex){
        console.log(ex);
      }
    };
    attemptLogin();
  }, []);

  const register = async(credentials)=> {
    const _auth = await api.register(credentials);
    setAuth(_auth);
  };

  const login = async(credentials)=> {
    const _auth = await api.login(credentials);
    setAuth(_auth);
  };

  const logout = ()=> {
    api.logout();
    setAuth({});
  };

  const createPost = async(post)=> {
    post = await api.createPost(post);
    setPosts([...posts, post]);
    navigate(`/posts/${post._id}`);
  };

  const UserNum = () => {
    const filtered = posts.filter(post => post.author.username === auth.username).length
    return(
      <div>(
        {filtered}
        )</div>
    )
  }

  const MostExpensive = () => {
    const prices = posts.map(post => {
      if(post.price.includes("$")){
        return post.price.slice(1)
      }
      else {
        return post.price
      }
    })
    prices.filter((price) => {
      return !isNaN(price*1)
    })
    prices.sort((a,b) => {
      return a-b
    })
    console.log(prices)
    const max = prices[prices.length - 1]
    console.log(max)
    return (
      <h1>Highest Number: {max}</h1>
    )
  }
  

  return (
    <>
      <h1><Link to='/'>Strangers Things ({ posts.length })</Link></h1>
      {
        auth.username ? (
          <div>
            <Home/>
            <h1>
              Welcome { auth.username } 
              <UserNum/>
              <button onClick={ logout }>Logout</button>
            </h1>
            <nav className="navbar">
              <Link to="/">Home</Link>
              <Link to='/posts/create'>Create A Post</Link>
              <Link to='/about_us'>About Us</Link>
              <Link to='/contact'>Contact</Link>
              <Link to="/mostexpensive">Most Expensive Post</Link>
            </nav>
            <Routes>
              <Route path='/posts/create' element={ <CreatePost createPost={ createPost } />} />
            </Routes>
          </div>
        ): (
          <>
            <AuthForm submit={ register } txt='Register'/>
            <AuthForm submit={ login } txt='Login'/>
            <Link to='/about_us'>About Us</Link>
          </>
        )
      }
       <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/posts/:id' element={ <Post posts={ posts } auth={ auth }/>} />
        <Route path='/about_us' element={ <AboutUs />} />
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/mostexpensive" element={<MostExpensive posts={posts}/>}/>
      </Routes>
      <Posts posts={ posts } auth={ auth }/>
     
    </>
  )
}

export default App
