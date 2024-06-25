import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookie from "universal-cookie";
import AddPostForm from "./AddPosts";
import PostFeed from "./Feed";
import {
  faHouse,
  faImage,
  faRightFromBracket,
  faUpload,
  faUserGroup,
  faRocketchat,
  faMessage,
  faCalendarDays,
  faGear,
  faPaperPlane,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FriendsList from "./FriendsList";
import Logo from "./images/project_Logo.png";
import Post_Operation from "./images/Post_Operation.jpg";
import Post from "./images/Post.jpg";
import General from "./images/General.jpg";
import Wepsite from "./images/Wepsite.jpg";
import UserSearch from "./UserSearch";

export default function Homepage() {
  const [user, setUser] = useState("");
  const [allusers, setallUsers] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const cookie = new Cookie();
  const token = cookie.get("socialmedia");
  const navigate = useNavigate();
  const [requestSent, setRequestSent] = useState(() => {
    const storedRequests = localStorage.getItem(
      `friendRequests-${user.username}`
    );
    return storedRequests ? JSON.parse(storedRequests) : {};
  });
  const [friendRequests, setFriendRequests] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [friends, setFriends] = useState([]);
  const [showFriends, setShowFriends] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showprofileimage, setShowprofileimage] = useState(false);
  const [messages, setMessages] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [latestMessages, setLatestMessages] = useState([]);
  const [showUploadButton, setShowUploadButton] = useState(false);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/socialmedia/current-user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCurrentUser();
  }, [token]);

  useEffect(() => {
    const fetchUserFriends = async () => {
      if (user.username) {
        try {
          const response = await axios.get(
            `http://localhost:8080/socialmedia/${user.username}/friends`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setFriends(response.data);
        } catch (error) {
          console.error("Error fetching user friends:", error);
        }
      }
    };

    fetchUserFriends();
  }, [user.username, token]);

  const stories = [
    { name: "General", img: General },
    { name: "Wepsite", img: Wepsite },
    {
      name: "Post",
      img: Post,
    },
    { name: "Post_Operation ", img: Post_Operation },
  ];

  const showStory = (index) => {
    setCurrentIndex(index);
  };

  const nextStory = () => {
    setCurrentIndex((currentIndex + 1) % stories.length);
  };

  const prevStory = () => {
    setCurrentIndex((currentIndex - 1 + stories.length) % stories.length);
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

  const sendFriendRequest = async (receiverUsername) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/socialmedia/${user.username}/send-friend-request/${receiverUsername}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setRequestSent({ ...requestSent, [receiverUsername]: true });
      localStorage.setItem(
        `friendRequests-${user.username}`,
        JSON.stringify({ ...requestSent, [receiverUsername]: true })
      );
    } catch (error) {
      console.error("Error sending friend request:", error);
    }
  };

  useEffect(() => {
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

    fetchFriendRequests();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/socialmedia/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setallUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

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

  const handleImageUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("image", selectedImage);

      const response = await axios.put(
        `http://localhost:8080/socialmedia/users/${user.id}/profile-image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Profile image uploaded successfully:", response.data);

      setUser((prevUser) => ({
        ...prevUser,
        profileImage: response.data.imageURL,
      }));

      setSelectedImage(null);
      setShowUploadButton(false); // Hide upload button after successful upload
    } catch (error) {
      console.error("Error uploading profile image:", error);
    }
  };

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
    setShowUploadButton(true); // Show upload button when an image is selected
  };

  function handlelogout() {
    cookie.remove("socialmedia");

    navigate("/login");
  }

  const handleFriendsClick = () => {
    setShowFriends(!showFriends);
  };

  const handleprofileimageClick = () => {
    setShowprofileimage(!showprofileimage);
  };

  useEffect(() => {
    fetchMessages();
  }, [user.id]);

  const fetchMessages = async () => {
    if (user.id) {
      try {
        const response = await axios.get(
          `http://localhost:8080/messages/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (user.id) {
      try {
        await axios.post(
          `http://localhost:8080/messages/${user.id}/${selectedFriend.id}`,
          { message: newMessage },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setNewMessage("");
        fetchMessages();
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  useEffect(() => {
    if (user.id) {
      fetch(`http://localhost:8080/messages/latest/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setLatestMessages(data));
    }
  }, [user.id]);
  const unreadMessagesCount = messages.filter(
    (message) => message.receiver.id === user.id && !message.read
  ).length;

  const handleMessagesClick = () => {
    setShowMessages(!showMessages);
  };

  const handleDeleteMessageClick = (message) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this message?"
    );
    if (confirmDelete) {
      // Call your delete API here
      axios
        .delete(`http://localhost:8080/messages/${message.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data);

          setMessages(messages.filter((m) => m.id !== message.id));
        })
        .catch((error) => {
          console.error("Error deleting message:", error);
        });
    }
  };

  return (
    <div>
      <div>
        {user && (
          <div>
            <div>
              <nav>
                <div className="container">
                  <img class="logo-top" src={Logo} alt="" />
                  <h2 className="logo">Vivdly</h2>

                  <UserSearch />
                  <div className="create">
                    <div className="nav-user-icon online">
                      <div className="user-profile">
                        <div>
                          <p>{user.username}</p>
                        </div>
                        <span className="online-status"></span>
                        <Link
                          to={`/profile/${user.id}`}
                          className="menu-item"
                          id="theme"
                          target="_blank"
                        >
                          <img
                            src={`data:image/jpeg;base64,${user.profileImage}`}
                            alt="Profile"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        )}
      </div>

      {/*------------------------------ MAIN ---------------------------------*/}
      <main>
        <br />
        <div className="container">
          {/*--------------- LEFT ------------------*/}
          <div className="left">
            <a className="profile" style={{ textDecoration: "none" }}>
              <div className="profile-img">
                <img src={`data:image/jpeg;base64,${user.profileImage}`} />
              </div>
              <div className="handle">
                <h4>{user.username}</h4>
                <p className="text-muted">{user.email}</p>
              </div>
            </a>
            {/*--------------- SIDEBAR ------------------*/}
            <div className="sidebar">
              <a className="menu-item active">
                <span>
                  <i className="uil uil-home" />
                </span>
                <FontAwesomeIcon icon={faHouse} />
                <h3>Home</h3>
              </a>
              <a className="menu-item" onClick={handleFriendsClick}>
                <span>
                  <i className="uil uil-compass" />
                </span>
                <FontAwesomeIcon icon={faUserGroup} />
                <h3>Friends</h3>
              </a>

              {/* Render FriendsList component when showFriends state is true */}
              {showFriends && <FriendsList currentuser={user} />}

              <a className="menu-item">
                <span>
                  <i className="uil uil-bell"></i>
                </span>
                <FontAwesomeIcon icon={faImage} />
                <h3>Profile Image</h3>
                <div className="buttons">
                  {showUploadButton && (
                    <button onClick={handleImageUpload}>Change Image</button>
                  )}
                  <label
                    htmlFor="upload-profile-image"
                    className="upload-profile-btn"
                  >
                    <FontAwesomeIcon icon={faUpload} />
                    <input
                      id="upload-profile-image"
                      type="file"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                  </label>
                </div>
              </a>
              <div className="messaging-component">
                <a
                  className="menu-item"
                  id="messages-notifications"
                  onClick={handleMessagesClick}
                >
                  <span>
                    <i className="uil uil-envelope-alt">
                      <small className="notification-count">
                        {unreadMessagesCount}
                      </small>
                    </i>
                  </span>
                  <FontAwesomeIcon icon={faMessage} />
                  <h3>Messages</h3>
                </a>

                {showMessages && (
                  <div className="messages-popup">
                    <div className="friends-list">
                      {friends.map((friend) => (
                        <div
                          key={friend.id}
                          className={`friend-item ${
                            selectedFriend && selectedFriend.id === friend.id
                              ? "active"
                              : ""
                          }`}
                          onClick={() => setSelectedFriend(friend)}
                        >
                          <div className="profile-img">
                            <img
                              src={`data:image/jpeg;base64,${friend.profileImage}`}
                              alt={friend.username}
                            />
                          </div>
                          <div className="friend-details">
                            <h5>{friend.username}</h5>
                          </div>
                        </div>
                      ))}
                    </div>

                    {selectedFriend && (
                      <div className="chat-area">
                        <h3>Send a message to {selectedFriend.username}</h3>
                        <form onSubmit={handleSendMessage}>
                          <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type a message"
                            style={{ height: "50px", width: "25px" }}
                          />
                          <button type="submit">
                            <FontAwesomeIcon icon={faPaperPlane} />
                          </button>
                        </form>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <Link to={`/Events`} className="menu-item" id="theme">
                <span>
                  <i className="uil uil-palette" />
                </span>
                <FontAwesomeIcon icon={faCalendarDays} />
                <h3>Events</h3>
              </Link>
              <Link to={`/SettingsPage/${user.id}`} className="menu-item">
                <span>
                  <i className="uil uil-setting" />
                </span>
                <FontAwesomeIcon icon={faGear} />
                <h3>Settings</h3>
              </Link>

              <a className="menu-item ">
                <span>
                  <i className="uil uil-home" />
                </span>
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  style={{ color: "red", marginRight: "5px" }}
                  onClick={handlelogout}
                />
                <h3 onClick={handlelogout}>Log Out</h3>
              </a>
            </div>
          </div>
          {/*--------------- MIDDLE ------------------*/}
          <div class="middle">
            <div class="middle">
              <div className="stories">
                {stories.map((story, index) => (
                  <div
                    className="story"
                    key={index}
                    style={{
                      display: index === currentIndex ? "flex" : "none",
                    }}
                  >
                    <button className="prev-btn" onClick={prevStory}>
                      &lt;
                    </button>
                    <div className="Story-img">
                      {story.img && <img src={story.img} alt="Profile Image" />}
                    </div>
                    <p className="name">{story.name}</p>
                    <button className="next-btn" onClick={nextStory}>
                      &gt;
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {/*--------------- END OF STORIES ------------------*/}
            {/* <div className="write-post-container">
              
              <AddPostForm />
            </div> */}
            {/*--------------- FEEDS ------------------*/}
            <div className="feeds">
              <PostFeed />
            </div>
            {/*--------------- END OF FEEDS ------------------*/}
          </div>
          {/*--------------- END OF MIDDLE ------------------*/}
          {/*--------------- Right ------------------*/}
          <div className="Right-sidebar">
            <div>
              <h5>Users you may know</h5>
              <ul>
                {allusers.map((u) => (
                  <li key={u.id}>
                    {u.id !== user.id && (
                      <div>
                        {u.username}
                        {friends.some(
                          (friend) => friend.username === u.username
                        ) ? (
                          <div>You are already friends</div>
                        ) : friendRequests.some(
                            (req) => req.user1.username === u.username
                          ) ? (
                          <div>
                            Friend request sent
                            <button
                              onClick={() =>
                                handleAccept(
                                  friendRequests.find(
                                    (req) => req.user1.username === u.username
                                  ).id,
                                  u.username
                                )
                              }
                            >
                              Accept
                            </button>
                            <button
                              onClick={() =>
                                handleDecline(
                                  friendRequests.find(
                                    (req) => req.user1.username === u.username
                                  ).id
                                )
                              }
                            >
                              Decline
                            </button>
                          </div>
                        ) : requestSent[u.username] ? (
                          <div>Friend request sent</div>
                        ) : (
                          <button onClick={() => sendFriendRequest(u.username)}>
                            Add Friend
                          </button>
                        )}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/*--------------- RIGHT ------------------*/}
            <div className="right">
              {/*----- MESSAGES -----*/}
              <div className="messages">
                <div className="heading">
                  <h4>Messages</h4>
                  <FontAwesomeIcon icon={faEdit} />
                </div>
                <div className="category">
                  <h6 className="active">Primary</h6>
                  <h6>General</h6>
                  <h6 className="message-requests">Requests (7)</h6>
                </div>

                {latestMessages
                  .filter((message) => message.sender.id !== user.id)
                  .map((message) => (
                    <div
                      className="message"
                      key={message.id}
                      onClick={() => setSelectedFriend(message.sender)}
                    >
                      <div className="profile-photo">
                        <img
                          src={`data:image/jpeg;base64,${message.sender.profileImage}`}
                          alt={message.sender.username}
                        />
                      </div>
                      <div className="message-body">
                        <h5>{message.sender.username}</h5>
                        <p className="text-muted">
                          {(() => {
                            try {
                              const parsedContent = JSON.parse(
                                message.content
                              ).message;
                              return parsedContent;
                            } catch (error) {
                              console.error(
                                "Error parsing message content:",
                                error
                              );
                              return "Error parsing message content";
                            }
                          })()}
                        </p>
                      </div>
                    </div>
                  ))}

                {selectedFriend && (
                  <div className="chat-area">
                    <h3>Chat with {selectedFriend.username}</h3>
                    <div className="chat-messages">
                      {messages
                        .filter(
                          (message) =>
                            (message.sender.id === selectedFriend.id &&
                              message.receiver.id === user.id) ||
                            (message.sender.id === user.id &&
                              message.receiver.id === selectedFriend.id)
                        )
                        .map((message) => (
                          <div
                            key={message.id}
                            className={`chat-message ${
                              message.sender.id === user.id
                                ? "sent"
                                : "received"
                            }`}
                          >
                            <div className="message-content">
                              <p>
                                {(() => {
                                  try {
                                    const parsedContent = JSON.parse(
                                      message.content
                                    ).message;
                                    return parsedContent;
                                  } catch (error) {
                                    console.error(
                                      "Error parsing message content:",
                                      error
                                    );
                                    return "Error parsing message content";
                                  }
                                })()}
                              </p>
                              {message.sender.id === user.id && (
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  onClick={() =>
                                    handleDeleteMessageClick(message)
                                  }
                                  style={{
                                    color: "red",
                                    marginLeft: "110px",
                                    cursor: "pointer",
                                  }}
                                />
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                    <form
                      onSubmit={handleSendMessage}
                      className="chat-input-form"
                    >
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message"
                        style={{ height: "50px", width: "25px" }}
                      />
                      <button type="submit">
                        <FontAwesomeIcon icon={faPaperPlane} />
                      </button>
                    </form>
                  </div>
                )}
              </div>
              {/*----- END OF MESSAGES -----*/}
              {/*----- FRIEND REQUEST -----*/}

              <div className="friend-requests">
                <h4>Friend Requests</h4>
                {friendRequests.map((request) => {
                  // Check if the logged-in user is the receiver of the request
                  if (request.user2.username === user.username) {
                    return (
                      <div className="request" key={request.id}>
                        <div className="info">
                          <div className="profile-img">
                            <img
                              src={`data:image/jpeg;base64,${request.user1.profileImage}`}
                              alt={request.user1.username}
                            />
                          </div>
                          <div>
                            <h5>{request.user1.username}</h5>
                          </div>
                        </div>
                        <div className="action">
                          <button
                            className="btn btn-primary"
                            onClick={() => handleAccept(request.id)}
                          >
                            Accept
                          </button>
                          <button
                            className="btn"
                            onClick={() => handleDecline(request.id)}
                          >
                            Decline
                          </button>
                        </div>
                      </div>
                    );
                  }
                  return null; // If the logged-in user is the sender, don't display the request
                })}
              </div>
            </div>
            {/*--------------- END OF RIGHT ------------------*/}
          </div>
        </div>
      </main>
    </div>
  );
}
