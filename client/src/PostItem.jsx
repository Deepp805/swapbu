import React from 'react';
import axios from 'axios'; // Import axios if not already imported

const PostItem = ({ post: { id, Dorm, Room_Capacity, Room_Number, Room_Type, Spots_Available, email } }) => {
  const baseUrl = 'http://localhost:3001'; // Replace with your backend base URL

  const removePost = (id) => {
    axios.delete(`${baseUrl}/api/posts/${id}`)
      .then(response => {
        console.log('Post deleted successfully.');
        // Optionally, you can update the list of posts here after deletion
        // For example, if you have a state that stores posts, you can filter out the deleted post
        // setPosts(posts => posts.filter(post => post._id !== id));
      })
      .catch(error => {
        console.error('Error deleting post:', error);
      });
  };

  return (
    <div className="bg-black rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300 ease-in-out">
      <h3 className="text-xl font-semibold mb-2">{Dorm}</h3>
      <div className="grid grid-cols-2 gap-4">
        <p>
          <span className="font-semibold">Room Capacity:</span> {Room_Capacity}
        </p>
        <p>
          <span className="font-semibold">Room Number:</span> {Room_Number}
        </p>
        <p>
          <span className="font-semibold">Room Type:</span> {Room_Type}
        </p>
        <p>
          <span className="font-semibold">Spots Available:</span> {Spots_Available}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {email}
        </p>
      </div>
      <button
        className="bg-red-500 text-white rounded-md py-2 px-4 mt-4"
        onClick={() => removePost(id)}
      >
        Remove
      </button>
    </div>
  );
};

export default PostItem;
