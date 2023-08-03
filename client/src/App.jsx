import React, { useState, useEffect } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

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
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await api.get('/api/posts'); // Use the 'api' instance for the request
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/post', formData); // Use the 'api' instance for the request
      setPosts((prevPosts) => [...prevPosts, response.data]);
      setFormData({
        email: '',
        Spots_Available: '',
        Dorm: '',
        Room_Number: '',
        Room_Type: '',
        Room_Capacity: '',
      });
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/posts/${id}`); // Use the 'api' instance for the request
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleUpdate = async (id, updatedPostData) => {
    try {
      const response = await api.put(`/api/posts/${id}`, updatedPostData); // Use the 'api' instance for the request
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === id ? response.data : post))
      );
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <p>{post.email}</p>
            <p>{post.Spots_Available}</p>
            <p>{post.Dorm}</p>
            <p>{post.Room_Number}</p>
            <p>{post.Room_Type}</p>
            <p>{post.Room_Capacity}</p>
            <button onClick={() => handleDelete(post._id)}>Delete</button>
            <button
              onClick={() =>
                handleUpdate(post._id, {
                  email: 'Updated email',
                  Spots_Available: 'Updated Spots_Available',
                  Dorm: 'Updated Dorm',
                  Room_Number: 'Updated Room_Number',
                  Room_Type: 'Updated Room_Type',
                  Room_Capacity: 'Updated Room_Capacity',
                })
              }
            >
              Update
            </button>
          </li>
        ))}
      </ul>
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">email</label>
        <input
          id="email"
          type="text"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <label htmlFor="Spots_Available">Spots_Available</label>
        <input
          id="Spots_Available"
          type="text"
          name="Spots_Available"
          value={formData.Spots_Available}
          onChange={handleInputChange}
        />
        <label htmlFor="Dorm">Dorm</label>
        <input
          id="Dorm"
          type="text"
          name="Dorm"
          value={formData.Dorm}
          onChange={handleInputChange}
        />
        <label htmlFor="Room_Number">Room_Number</label>
        <input
          id="Room_Number"
          type="text"
          name="Room_Number"
          value={formData.Room_Number}
          onChange={handleInputChange}
        />
        <label htmlFor="Room_Type">Room_Type</label>
        <input
          id="Room_Type"
          type="text"
          name="Room_Type"
          value={formData.Room_Type}
          onChange={handleInputChange}
        />
        <label htmlFor="Room_Capacity">Room_Capacity</label>
        <input
          id="Room_Capacity"
          type="text"
          name="Room_Capacity"
          value={formData.Room_Capacity}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
  


};

export default App;
