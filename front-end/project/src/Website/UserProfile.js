import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Cookie from "universal-cookie";
import styled from 'styled-components';
import LoadingSubmit from '../Components/Loading';

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({ user: {}, friends: [], posts: [] });
  const [friends, setFriends] = useState([]);
  const [currentuserfriends, setcurrentuserFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [requestSent, setRequestSent] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cookie = new Cookie();
  const token = cookie.get('socialmedia');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await axios.get(`http://localhost:8080/socialmedia/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(userRes.data);
      } catch (err) {
        setError(err);
        console.error(err);
      }
    };
    fetchData();
  }, [id, token]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/socialmedia/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAllUsers(response.data);
      } catch (err) {
        setError(err);
        console.error('Error fetching users:', err);
      }
    };
    fetchAllUsers();
  }, [token]);

  useEffect(() => {
    const fetchUserFriends = async () => {
      if (userData.user.username) {
        try {
          const response = await axios.get(`http://localhost:8080/socialmedia/${userData.user.username}/friends`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setFriends(response.data);
        } catch (err) {
          setError(err);
          console.error('Error fetching user friends:', err);
        }
      }
    };
    fetchUserFriends();
  }, [userData.user.username, token]);

  useEffect(() => {
    const fetchUserFriends = async () => {
      if (userData.user.username) {
        try {
          const response = await axios.get(`http://localhost:8080/socialmedia/${user.username}/friends`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setcurrentuserFriends(response.data);
        } catch (err) {
          setError(err);
          console.error('Error fetching user friends:', err);
        }
      }
    };
    fetchUserFriends();
  }, [userData.user.username, token]);


  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get('http://localhost:8080/socialmedia/current-user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (err) {
        setError(err);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentUser();
  }, [token]);

  const sendFriendRequest = async (receiverUsername) => {
    if (user && userData.user.username) {
      try {
        const response = await axios.post(
          `http://localhost:8080/socialmedia/${user.username}/send-friend-request/${receiverUsername}`,
          null,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(response.data);
        setRequestSent({ ...requestSent, [receiverUsername]: true });
        sessionStorage.setItem(
          `friendRequests-${user.username}`,
          JSON.stringify({ ...requestSent, [receiverUsername]: true })
        );
      } catch (err) {
        console.error('Error sending friend request:', err);
      }
    }
  };

  const handleAccept = async (requestId, senderUsername) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/socialmedia/accept-friend-request/${requestId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);

      fetchFriendRequests();
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  const handleDecline = async (requestId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/socialmedia/Friendship/requests/${requestId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);

      fetchFriendRequests();
    } catch (error) {
      console.error("Error declining friend request:", error);
    }
  };

  const fetchFriendRequests = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/socialmedia/Friendship/requests",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFriendRequests(response.data);
    } catch (error) {
      console.error("Error fetching friend requests:", error);
    }
  };

  if (loading) {
    return <LoadingSubmit/>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Container>
      {userData && userData.user && (
        <>
          <ProfileHeader>
            <ProfileImage src={`data:image/jpeg;base64,${userData.user.profileImage}`} alt="Profile" />
            <Username>{userData.user.username}</Username>
            {userData.user.id === user.id && <YourProfile>(You)</YourProfile>}
          </ProfileHeader>
          <Section>
      <Username>User</Username>
      <UserContainer>
      {userData.user.username}
        {currentuserfriends.some((friend) => friend.username === userData.user.username) ? (
          <div> You are already friends</div>
        ) : friendRequests.some((req) => req.user1.username === userData.user.username) ? (
          <div>
            Friend request received
            <Button onClick={() => handleAccept(friendRequests.find((req) => req.user1.username === userData.user.username).id, userData.user.username)}>
              Accept
            </Button>
            <Button onClick={() => handleDecline(friendRequests.find((req) => req.user1.username === userData.user.username).id)}>
              Decline
            </Button>
          </div>
        ) : requestSent[userData.user.username] ? (
          <div>Friend request sent</div>
        ) : (
           // Only render the Add Friend button if the profile is not the current user's own profile
           userData.user.id !== user.id && <Button onClick={() => sendFriendRequest(userData.user.username)}>Add Friend</Button>
          )}
        
      </UserContainer>
    </Section>
          <Section>
            <SectionTitle>Friends</SectionTitle>
            <UserList>
              {friends.map((friend) => (
                <UserListItem key={friend.id}>{friend.username}</UserListItem>
              ))}
            </UserList>
          </Section>
          <Section>
            <SectionTitle>Posts</SectionTitle>
            <PostList>
              {userData.posts.map((post) => (
                <PostListItem key={post.id}>
                  <PostText>{post.text}</PostText>
                  {post.imageUrl && <PostImage src={`data:image/jpeg;base64,${post.imageUrl}`} alt="Post" />}
                </PostListItem>
              ))}
            </PostList>
          </Section>
       
        </>
      )}
    </Container>
  );
};

export default UserProfile;
// Styled Components

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  background-color: #f0f2f5;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const Username = styled.h1`
  font-size: 24px;
  color: #333;
  font-weight: 600;
`;

const YourProfile = styled.span`
  font-size: 16px;
  color: #666;
  font-style: italic;
`;

const Section = styled.div`
  margin-bottom: 40px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  color: #333;
  margin-bottom: 20px;
  font-weight: 600;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
`;

const UserList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const Button = styled.button`
  background-color: #3b5998;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
  margin-left: 10px;

  &:hover {
    background-color: #2a4887;
  }
`;

const PostList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const PostListItem = styled.li`
  background-color: #f9f9f9;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

const PostText = styled.p`
  color: #333;
  margin-bottom: 10px;
  font-size: 16px;
`;

const UserListItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #ccd0d5;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PostImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;