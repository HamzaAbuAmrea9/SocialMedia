import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookie from "universal-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faEllipsis,
  faHeart as faHeartSolid,
  faShareAlt,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import LoadingSubmit from "../Components/Loading";
import EditPostForm from "./EditPostForm";
import { Link } from "react-router-dom";
import AddPostForm from "./AddPosts";

const PostFeed = () => {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [postDropdownVisible, setPostDropdownVisible] = useState(null);
const [commentDropdownVisible, setCommentDropdownVisible] = useState(null);
  const [commentContent, setCommentContent] = useState({});
  const [comments, setComments] = useState({});
  const [likes, setLikes] = useState({});
  const [shares, setShares] = useState({});
  const [selectedLikes, setSelectedLikes] = useState(null);
  const [selectedComments, setSelectedComments] = useState(null);
  const [selectedShares, setSelectedShares] = useState(null);
  const [editPostId, setEditPostId] = useState(null);
  const [user, setUser] = useState("");
const [userId, setUserId] = useState("");
const [friends, setFriends] = useState([]);
  const [likedPosts, setLikedPosts] = useState(() => {
    const savedLikedPosts = localStorage.getItem(`likedPosts_${user.username}`);
    return savedLikedPosts ? JSON.parse(savedLikedPosts) : [];
  });
  const [editCommentId, setEditCommentId] = useState(null);
const [editedCommentContent, setEditedCommentContent] = useState({});
const [likesCounts, setLikesCounts] = useState(() => {
  // Try to get likesCounts from localStorage when initializing state
  const savedLikesCounts = localStorage.getItem('likesCounts');
  return savedLikesCounts ? JSON.parse(savedLikesCounts) : {};
});

  const cookie = new Cookie();
  const token = cookie.get("socialmedia");








const fetchLikesCount = async (commentId) => {
  try {
    const response = await axios.get(`http://localhost:8080/socialmedia/comments/${commentId}/likes/count`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }});
    setLikesCounts(prevCounts => {
      const newCounts = { ...prevCounts, [commentId]: response.data };
      // Save likesCounts to localStorage whenever it changes
      localStorage.setItem('likesCounts', JSON.stringify(newCounts));
      return newCounts;
    });
  } catch (error) {
    console.error("Error getting likes count:", error);
  }
};
useEffect(() => {
  // Check if 'comments' is defined and is an array
  if (Array.isArray(comments)) {
    // Fetch likes count for each comment initially
    comments.forEach(comment => fetchLikesCount(comment.id));
    
    // Set up an interval to fetch likes count every 5 seconds
    const intervalId = setInterval(() => {
      comments.forEach(comment => fetchLikesCount(comment.id));
    }, 5000); // 5000 ms = 5 seconds

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }
}, [user.id]);


const handleLikeComment = async (commentId) => {
  try {
    await axios.post(
      `http://localhost:8080/socialmedia/comments/${commentId}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then(() => {
      // Fetch the likes count after the like is fully processed
      fetchLikesCount(commentId);
    });
  } catch (error) {
    if (error.response && error.response.data === 'Comment already liked by the user') {
      console.log("User has already liked this comment");
    } else {
      console.error("Error liking comment:", error);
    }
  }
};



  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get('http://localhost:8080/socialmedia/current-user', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
  
        setUser(response.data);
        setUserId(response.data.id);
  
         // Clear likedPosts state and local storage for new user
         const savedLikedPosts = localStorage.getItem(`likedPosts_${response.data.id}`);
         const parsedLikedPosts = savedLikedPosts ? JSON.parse(savedLikedPosts) : [];
         setLikedPosts(parsedLikedPosts);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchCurrentUser();
  }, [token]);
  
  useEffect(() => {
    // Fetch user friends
    const fetchUserFriends = async () => {
      if (user.username) {
        try {
          const response = await axios.get(`http://localhost:8080/socialmedia/${user.username}/friends`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setFriends(response.data);
        } catch (error) {
          console.error('Error fetching user friends:', error);
        }
      }
    };

    fetchUserFriends();
  }, [user.username, token]);

  
  const fetchComments = async (postId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/socialmedia/posts/${postId}/comments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComments((prevComments) => ({
        ...prevComments,
        [postId]: response.data,
      }));
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const fetchLikes = async (postId) => {
    try {
        const response = await axios.get(
            `http://localhost:8080/socialmedia/posts/${postId}/likes`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        // Update liked state of the post based on the fetched likes
        setLikes((prevLikes) => ({
            ...prevLikes,
            [postId]: response.data,
        }));
        // Update likedPosts array based on the fetched likes
        const likedByUser = response.data.some((like) => like.user.id === userId);
        const newLikedPosts = likedByUser ? [...likedPosts, postId] : likedPosts.filter((id) => id !== postId);
        setLikedPosts(newLikedPosts);
        // Store the updated likedPosts array in local storage
        localStorage.setItem(`likedPosts_${userId}`, JSON.stringify(newLikedPosts));
    } catch (error) {
        console.error("Error fetching likes:", error);
    }
};

  const fetchShares = async (postId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/socialmedia/posts/${postId}/shares`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShares((prevShares) => ({
        ...prevShares,
        [postId]: response.data,
      }));
    } catch (error) {
      console.error("Error fetching shares:", error);
    }
  };

 
    // Fetch feed (posts from you and your friends)
    const fetchFeed = async () => {
      try {
        const response = await axios.get('http://localhost:8080/socialmedia/posts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Filter posts based on your user ID and friend IDs
        const myPostsAndFriendsPosts = response.data.posts.filter((post) => {
          return post.user.id === userId || friends.some((friend) => friend.id === post.user.id);
        });

        setFeed(myPostsAndFriendsPosts);
        setLoading(false);

        // Fetch additional data for each post (comments, likes, shares)
        for (const post of myPostsAndFriendsPosts) {
          fetchComments(post.id);
          fetchLikes(post.id);
          fetchShares(post.id);
        }
      } catch (error) {
        setError('Failed to fetch feed. Please try again later.');
        setLoading(false);
        console.error('Error fetching feed:', error);
      }
    };

    useEffect(() => {
    fetchFeed();
  }, [userId, friends, token]);

  const toggleDropdown = (postId, commentId) => {
    if (postId) {
      setPostDropdownVisible(postId === postDropdownVisible ? null : postId);
    }
    if (commentId) {
      setCommentDropdownVisible(commentId === commentDropdownVisible ? null : commentId);
    }
  };
  
  const likePost = async (postId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/socialmedia/posts/${postId}/likes`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      const likedByUser = response.data.some((like) => like.user.id === userId);
  
      if (!likedByUser) {
        await axios.post(
          `http://localhost:8080/socialmedia/posts/${postId}/like`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        // Fetch updated likes after liking the post
        fetchLikes(postId);
  
        // Update likedPosts state
        const newLikedPosts = [...likedPosts, postId];
        setLikedPosts(newLikedPosts);
        // Store the updated likedPosts array in local storage for the current user
        localStorage.setItem(`likedPosts_${userId}`, JSON.stringify(newLikedPosts));
      } else {
        console.log("Post already liked by the user");
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const commentOnPost = async (postId) => {
    try {
      await axios.post(
        `http://localhost:8080/socialmedia/posts/${postId}/comment`,
        { content: commentContent[postId] },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchComments(postId);

      setCommentContent({ ...commentContent, [postId]: "" });
    } catch (error) {
      console.error("Error commenting on post:", error);
    }
  };

  const sharePost = async (postId) => {
    try {
      await axios.post(
        `http://localhost:8080/socialmedia/posts/${postId}/share`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchShares(postId);
    } catch (error) {
      console.error("Error sharing post:", error);
    }
  };

  if (loading) return <LoadingSubmit />;

  if (error) {
    return <div className="error-message">{error}</div>;
  }


  const deletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:8080/socialmedia/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Remove the post from the feed
      setFeed(feed.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEditClick = (postId) => {
    setEditPostId(postId);
  };

  const handleCancel = () => {
    setEditPostId(null);
  };
  const handleCancelcomment = () => {
    setEditCommentId(null);
  };
  const deleteComment = async (postId, commentId) => {
    try {
        await axios.delete(`http://localhost:8080/socialmedia/posts/${postId}/comments/${commentId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        setComments(prevComments => ({
            ...prevComments,
            [postId]: prevComments[postId].filter(comment => comment.id !== commentId)
        }));
    } catch (error) {
        console.error("Error deleting comment:", error);
    }
};



const handleEditComment = (postId, commentId) => {
  setEditCommentId(commentId);
  
  const currentComment = comments[postId].find((comment) => comment.id === commentId);
  if (currentComment) {
    const parsedContent = currentComment.content; 
    setEditedCommentContent({ ...editedCommentContent, [commentId]: parsedContent });
  }
};

const saveEditedComment = async (postId, commentId) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/socialmedia/posts/${postId}/comments/${commentId}`,
      { content: editedCommentContent[commentId] }, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setComments((prevComments) => ({
      ...prevComments,
      [postId]: prevComments[postId].map((comment) =>
        comment.id === commentId
          ? { ...comment, content: editedCommentContent[commentId] }
          : comment
      ),
    }));
    setEditCommentId(null);
    setEditedCommentContent({});
  } catch (error) {
    console.error("Error editing comment:", error);
  }
};




const toggleLikePost = async (postId) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/socialmedia/posts/${postId}/likes`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const userLike = response.data.find((like) => like.user.id === userId);

    if (!userLike) {
      await axios.post(
        `http://localhost:8080/socialmedia/posts/${postId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Fetch updated likes after liking the post
      fetchLikes(postId);

      // Update likedPosts state
      const newLikedPosts = [...likedPosts, postId];
      setLikedPosts(newLikedPosts);
      // Store the updated likedPosts array in local storage for the current user
      localStorage.setItem(`likedPosts_${userId}`, JSON.stringify(newLikedPosts));
    } else {
      await axios.delete(
        `http://localhost:8080/socialmedia/posts/${postId}/likes/${userLike.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Fetch updated likes after unliking the post
      fetchLikes(postId);

      // Update likedPosts state
      const newLikedPosts = likedPosts.filter((id) => id !== postId);
      setLikedPosts(newLikedPosts);
      // Store the updated likedPosts array in local storage for the current user
      localStorage.setItem(`likedPosts_${userId}`, JSON.stringify(newLikedPosts));
    }
  } catch (error) {
    console.error("Error toggling like on post:", error);
  }
};


  return (
    <>
      <div className="write-post-container">
              <AddPostForm  fetchposts={fetchFeed}/>
            </div>
            
      <div className="feeds">
        {feed.map((post, index) => (
          <div key={index} className="feed">
            <div className="head">
              <div className="user">
                <div className="photo">
                
                          <Link to={`/profile/${post.user.id}`} className="menu-item" id="theme" target="_blank">
            <img src={`data:image/jpeg;base64,${post.user.profileImage}`}  alt={post.user.username}
                    style={{ width: "70px", borderRadius: "50%" }} />
</Link>
                  
                </div>
                <div className="info">
                  <h3>{post.user.username}</h3>
                  <small>
                    {new Date(
                      post.createdAt[0],
                      post.createdAt[1] - 1,
                      post.createdAt[2],
                      post.createdAt[3],
                      post.createdAt[4],
                      post.createdAt[5]
                    ).toLocaleString()}
                  </small>
                </div>
              </div>
              {/*  to just the person who create the post can edit or delete to it */}
              {post.user.id === userId && (
              <span className=".settings-menu" onClick={() => toggleDropdown(post.id)}>
                <FontAwesomeIcon icon={faEllipsis} cursor={"pointer"} />
                {postDropdownVisible === post.id && (
                  <div className="dropdown-content">
                    <a
                      style={{ color: "rgb(13, 114, 13)", cursor: "pointer" }}
                      onClick={() => handleEditClick(post.id)}
                    >
                      Edit Post
                    </a>
                    <br />

                    <a
                      style={{ color: "rgb(199, 13, 13)", cursor: "pointer" }}
                      onClick={() => deletePost(post.id)}
                    >
                      Delete Post
                    </a>
                  </div>
                )}
              </span>
              )}
              {editPostId === post.id && (
                <EditPostForm
                  postId={post.id}
                  initialText={post.text}
                  initialImageUrl={post.imageUrl}
                  initialVideoUrl={post.videoUrl}
                  onCancel={handleCancel}
                  fetchposts={fetchFeed}
                />
              )}
            </div>

            {post.imageUrl && (
              <div className="photo">
                <img
                  src={`data:image/jpeg;base64,${post.imageUrl}`}
                  alt="Post"
                />
              </div>
            )}

            {post.videoUrl && (
              <div className="video">
                <video
                  src={`data:image/jpeg;base64,${post.videoUrl}`}
                  controls
                />
              </div>
            )}

<div className="action-buttons">
  <div className="interaction-buttons">
    <span onClick={() => toggleLikePost(post.id)}>
    <FontAwesomeIcon
  icon={
    likedPosts.includes(post.id)
      ? faHeartSolid
      : faHeartRegular
  }
  cursor={"pointer"}
  color={likedPosts.includes(post.id) ? "red" : "black"}
/>


    </span>
    <span
      onClick={() =>
        setCommentContent({ ...commentContent, [post.id]: "" })
      }
    >
      <FontAwesomeIcon icon={faCommentDots} cursor={"pointer"} />
    </span>
    <span onClick={() => sharePost(post.id)}>
      <FontAwesomeIcon icon={faShareAlt} cursor={"pointer"} />
    </span>
  </div>
  <div className="bookmark">{/* Bookmark button */}</div>
</div>

<div className="liked-by" onClick={() => setSelectedLikes(post.id)}>
  {likes[post.id] && (
    <p>
      Liked by{" "}
      <b style={{ cursor: "pointer" }}>
        {likes[post.id].length} users
      </b>
      {selectedLikes === post.id &&
        likes[post.id].map((like, index) => (
          <p key={index}>{like.user.username}</p>
        ))}
    </p>
  )}
</div>


            <div className="caption">
              <p>
                <strong>{post.user.username} :</strong>
                {post.text} <span className="harsh-tag">{post.hashtags}</span>
              </p>
            </div>

            <div
  className="comments text-muted"
  onClick={() => setSelectedComments(post.id)}
>
  { comments[post.id] && (
    <p>
      View all{" "}
      <b style={{ cursor: "pointer" }}>
        {comments[post.id].length} comments
      </b>
      {selectedComments === post.id &&
  comments[post.id].map((comment, index) => (
    <div key={index}>
      <strong>{comment.user.username}: </strong> 
      {(() => {
        try {
          const parsedContent = JSON.parse(comment.content).content;
          return parsedContent;
        } catch (error) {
          console.error("Error parsing comment content:", error);
          return "Error parsing comment content";
        }
      })()}
            
           <span onClick={() => handleLikeComment(comment.id)} style={{marginLeft:"10px"}}>
  <FontAwesomeIcon icon={faThumbsUp} style={{marginRight:"10px"}} />
  Likes: {likesCounts[comment.id] !== undefined ? likesCounts[comment.id] : 0}
</span>

 {/*  to just the person who create the comment can edit or delete to it */}
{comment.user.id === userId && (
         <span className=".settings-menu" onClick={() => toggleDropdown(post.id, comment.id)}>
        <FontAwesomeIcon icon={faEllipsis} cursor={"pointer"} style={{ marginLeft: "50px" }}/>
        {commentDropdownVisible === comment.id && (
          <div className="dropdown-content">
            <a
              style={{ color: "rgb(13, 114, 13)", cursor: "pointer" }}
              onClick={() => handleEditComment(post.id, comment.id)}
            >
              Edit Comment
            </a>
            <button onClick={handleCancelcomment}   style={{ 
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#1da1f2",
    color: "white",
    cursor: "pointer",
    transition: "background-color 0.3s ease"
  }}>Cancel</button>
            <br />
            <a
              style={{ color: "rgb(199, 13, 13)", cursor: "pointer" }}
              onClick={() => deleteComment(post.id, comment.id)}
            >
              Delete Comment
            </a>
          </div>
        )}
      </span>
)}
      {editCommentId === comment.id && (
        <div>
          <input
            type="text"
            value={editedCommentContent[comment.id] || ""}
            onChange={(e) =>
              setEditedCommentContent({
                ...editedCommentContent,
                [comment.id]: e.target.value,
              })
            }
          />
          <button onClick={() => saveEditedComment(post.id, comment.id)}>
            Save
          </button>
        </div>
      )}
    </div>
  ))
}
    </p>
  )}
</div>
            
            <div className="comment-section">
              <input
                type="text"
                placeholder="Add a comment..."
                value={commentContent[post.id] || ""}
                onChange={(e) =>
                  setCommentContent({
                    ...commentContent,
                    [post.id]: e.target.value,
                  })
                }
              />
              <button
                onClick={() => commentOnPost(post.id)}
                className="btn btn-primary"
                style={{ background: "blue" }}
                disabled={!commentContent[post.id] || commentContent[post.id].trim() === ''}
               
              >
                Comment
              </button>
            </div>

            <div
              className="shares text-muted"
              onClick={() => setSelectedShares(post.id)}
            >
              {shares[post.id] && (
                <p>
                  Shared by{" "}
                  <b style={{ cursor: "pointer" }}>
                    {shares[post.id].length} users
                  </b>
                  {selectedShares === post.id &&
                    shares[post.id].map((share, index) => (
                      <p key={index}>{share.user.username}</p>
                    ))}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PostFeed;
