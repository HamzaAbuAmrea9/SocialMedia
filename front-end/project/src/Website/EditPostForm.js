import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faVideo, faTimes } from "@fortawesome/free-solid-svg-icons";
import Cookie from "universal-cookie";

const EditPostForm = ({
  postId,
  initialText,
  initialImageUrl,
  initialVideoUrl,
  onCancel,
  fetchposts,
}) => {
  const [textContent, setTextContent] = useState(initialText);
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  const cookie = new Cookie();
  const token = cookie.get("socialmedia");

  const handleEditPost = async () => {
    try {
      const formData = new FormData();
      formData.append("textContent", textContent);
      
      if (imageFile) {
        console.log("Image file:", imageFile);
        formData.append("image", imageFile);
      }
      if (videoFile) {
        formData.append("video", videoFile);
      }

      console.log("Form data:", formData);

      const response = await axios.put(
        `http://localhost:8080/socialmedia/posts/${postId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Post updated:", response.data);
      onCancel();
      fetchposts();
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleCancel = () => {
    setTextContent(initialText);
    setImageFile(initialImageUrl);
    setVideoFile(initialVideoUrl);

    onCancel();
  };
return(
  <div className="edit_post" style={{ width: 'fit-content', maxWidth: '60%', margin: 'auto' }}>
      <textarea
        style={{ resize: 'none', width: '50%',background:"white",color:"black",border: '1px solid black' }}
        rows={3}
        placeholder="Enter text to update..."
        value={textContent}
        onChange={(e) => setTextContent(e.target.value)}
      />
      <div className="add-post-links">
        <label htmlFor="image-upload" className="upload-icon"  style={{  width: '50%'}}>
          <FontAwesomeIcon icon={faCamera} style={{ color: 'green' }} />
          <h6>Photo</h6>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </label>
        <label htmlFor="video-upload" className="upload-icon" style={{  width: '50%'}}>
          <FontAwesomeIcon icon={faVideo} style={{ color: 'red' }} />
          <h6>Video</h6>
          <input
            id="video-upload"
            type="file"
            accept="video/*"
            onChange={(e) => setVideoFile(e.target.files[0])}
          />
        </label>
      </div>
      <div className="buttons">
        <button onClick={handleEditPost}>Update Post</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default EditPostForm;