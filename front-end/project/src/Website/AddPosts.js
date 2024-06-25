import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookie from 'universal-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faUpload, faVideo } from '@fortawesome/free-solid-svg-icons';

const AddPostForm = ({fetchposts}) => {
  const [textContent, setTextContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [user, setUser] = useState(""); 
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const cookie = new Cookie();
  const token = cookie.get('socialmedia');

  
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get('http://localhost:8080/socialmedia/current-user', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setUser(response.data); 
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchCurrentUser();
  }, [token]); 
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("textContent", textContent);
      formData.append("image", imageFile); 
      formData.append("video", videoFile);

      const response = await axios.post('http://localhost:8080/socialmedia/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
          Authorization: `Bearer ${token}`
        }
        
      });
  
      console.log(response);
      setTextContent('');
      setImageFile(null);
      setVideoFile(null);
      setSuccessMessage('Post added successfully!');
      fetchposts();
      
     
    } catch (error) {
      setErrorMessage('Failed to add post. Please try again later.');
      console.error('Error adding post:', error);
    }
  };
  


  
  return (
    <div className="write-post-container">
      <div className="user-profile">
        <img src={`data:image/jpeg;base64,${user.profileImage}`} alt="Profile Pic" />
        <div>
          <p>{user.username}</p>
          <small>public <i className="fas fa-caret-down" /></small>
        </div>
      </div>
      <div className="post-input-container">
        <form onSubmit={handleSubmit}>
          <textarea rows={3} placeholder={`What's on your mind ${user.username}?`} value={textContent} onChange={(e) => setTextContent(e.target.value)} />
        
          <div className="add-post-links">
  <label htmlFor="image-upload" className="upload-icon">
    <FontAwesomeIcon  icon={faCamera} style={{color:"green"}}/> <h6>Photo</h6> 
    
    <input id="image-upload" type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} style={{ display: 'none' }} />
  </label>
  <label htmlFor="video-upload" className="upload-icon">
  <FontAwesomeIcon icon={faVideo} style={{color:"red"}}/> <h6>Video</h6> 
    <input id="video-upload" type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files[0])} style={{ display: 'none' }} />
  </label>
</div>

          <button type="submit" className="btn btn-primary mt-3" disabled={textContent.trim() === ''}>Add Post</button>
        </form>
      </div>
    </div>
  );
};

export default AddPostForm;
