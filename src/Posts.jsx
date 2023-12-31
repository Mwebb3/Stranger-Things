import { Link } from 'react-router-dom';

const Posts = ({ posts, auth })=> {
  return (
    <ul>
      {
        posts.map( post => {
          return (
            <li key={ post._id } className={ post.author._id === auth._id ? 'mine': ''}>
              <Link to={`/posts/${post._id}`}>{ post.title }</Link> 
              Price: ${isNaN(post.price*1) === true ? post.price : (post.price*1).toFixed(2)} Location: {post.location} User: {post.author.username}
            </li>
          );
        })
      }
    </ul>
  );
};

export default Posts;

