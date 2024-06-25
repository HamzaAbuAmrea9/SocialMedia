import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookie from 'universal-cookie';

const FriendsList = ({ currentuser}) => {

  const [friends, setFriends] = useState([]);
  const cookie = new Cookie();
  const token = cookie.get("socialmedia");
  



  useEffect(() => {
    const fetchUserFriends = async () => {
      if (currentuser.username) {
        try {
          const response = await axios.get(`http://localhost:8080/socialmedia/${currentuser.username}/friends`, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });
          setFriends(response.data);
        } catch (error) {
          console.error('Error fetching user friends:', error);
        }
      }
    };
  
    fetchUserFriends();
  }, [currentuser.username, token]); 

  
  const handleDeleteClick = (friend) => {
    const confirmDelete = window.confirm('Are you sure you want to delete?');
    if (confirmDelete) {
      
      axios.delete(`http://localhost:8080/socialmedia/${currentuser.username}/unfriend/${friend.username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }).then((response) => {
        console.log(response.data);
        
        setFriends(friends.filter(f => f.id !== friend.id));
      }).catch((error) => {
        console.error('Error deleting friend:', error);
      });
    }}
  return (
    <div className="friends-list">
     
      <ul className="friend-list">
        {friends.map(friend => (
          <li key={friend.id} className="friend">
            <div className="profile-photo">
            <Link to={`/profile/${friend.id}`} className="menu-item" id="theme" target="_blank">
            <img src={`data:image/jpeg;base64,${friend.profileImage}`} alt={friend.username} />
</Link>
              
            </div>
            <div className="friend-details">
              <h5>{friend.username}</h5>
              <FontAwesomeIcon
      icon={faTrash} 
      onClick={() => handleDeleteClick(friend)}
      style={{color:"red",marginLeft:"140px"}}
    />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsList;
