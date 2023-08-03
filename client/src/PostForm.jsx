// PostForm.jsx
import React, { useState } from 'react';
import postService from './services/posts'

const PostForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    Spots_Available: '',
    Dorm: '',
    Room_Number: '',
    Room_Type: '',
    Room_Capacity: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    postService.create(formData)
      .then(response => {
        setPosts([...posts, response])
        setFormData({
          email: '',
          Spots_Available: '',
          Dorm: '',
          Room_Number: '',
          Room_Type: '',
          Room_Capacity: '',
        })
      })
      .catch(error => {
        console.error('Error creating post:', error)
      })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h3 className="text-xl font-semibold mb-2">Create a New Post</h3>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="Dorm"
          placeholder="Dorm"
          value={formData.Dorm}
          onChange={handleInputChange}
          className="border rounded-md p-2"
        />
        <input
          type="text"
          name="Room_Capacity"
          placeholder="Room Capacity"
          value={formData.Room_Capacity}
          onChange={handleInputChange}
          className="border rounded-md p-2"
        />
        <input
          type="text"
          name="Room_Number"
          placeholder="Room Number"
          value={formData.Room_Number}
          onChange={handleInputChange}
          className="border rounded-md p-2"
        />
        <input
          type="text"
          name="Room_Type"
          placeholder="Room Type"
          value={formData.Room_Type}
          onChange={handleInputChange}
          className="border rounded-md p-2"
        />
        <input
          type="text"
          name="Spots_Available"
          placeholder="Spots Available"
          value={formData.Spots_Available}
          onChange={handleInputChange}
          className="border rounded-md p-2"
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          className="border rounded-md p-2"
        />
        <button type="submit" className="bg-blue-500 text-white rounded-md py-2 px-4 col-span-2">
          Create Post
        </button>
      </div>
    </form>
  );
};

export default PostForm;
