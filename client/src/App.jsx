import postService from './services/posts'
import React, { useState, useEffect } from 'react';
import PostItem from './PostItem'; 
import PostForm from './PostForm';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    email: '',
    Spots_Available: '',
    Dorm: '',
    Room_Number: '',
    Room_Type: '',
    Room_Capacity: '',
  });

  useEffect(() => {
    postService.getAll()
      .then(response => {
        console.log(response);
        setPosts(response)
      })
      .catch(error => {
        console.error('Error fetching posts:', error)
      })
  }, [])

  return (
    <div>
      <h1>Room Swapping Availability</h1>
      <PostForm />
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <PostItem post={post} />
          </li>
        ))}
      </ul>
      {/* Add input fields for the form data */}
      {/* Add a button or form submit to trigger handleCreatePost */}
    </div>
  );
};

export default App;
