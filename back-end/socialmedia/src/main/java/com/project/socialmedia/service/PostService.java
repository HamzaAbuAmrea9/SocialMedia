package com.project.socialmedia.service;



import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.multipart.MultipartFile;

import com.project.socialmedia.model.Like;
import com.project.socialmedia.model.Comment;
import com.project.socialmedia.model.Friendship;
import com.project.socialmedia.model.Post;
import com.project.socialmedia.model.PostRequest;
import com.project.socialmedia.model.Share;
import com.project.socialmedia.model.User;
import com.project.socialmedia.repository.CommentRepository;
import com.project.socialmedia.repository.FriendshipRepository;
import com.project.socialmedia.repository.LikeRepository;
import com.project.socialmedia.repository.PostRepository;
import com.project.socialmedia.repository.ShareRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.project.socialmedia.repository.UserRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@Service
public class PostService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PostRepository postRepository;
    private final LikeRepository likeRepository;
    private final   CommentRepository commentRepository;
    private final ShareRepository shareRepository;
    private final FriendshipRepository friendshipRepository;
   
    @Autowired
    public PostService(PostRepository postRepository,LikeRepository likeRepository,CommentRepository commentRepository,ShareRepository shareRepository,FriendshipRepository friendshipRepository,UserRepository userRepository) {
        this.postRepository = postRepository;
        this.likeRepository=likeRepository;
        this.commentRepository=commentRepository;
        this.shareRepository=shareRepository;
        this.friendshipRepository=friendshipRepository;
        this.userRepository=userRepository;
    }

  
    public Optional<Post> getPostById(Long id) {
        return postRepository.findById(id);
    }

    public Post savePost(Post post) {
        return postRepository.save(post);
    }
  
    public Post createPost(PostRequest postRequest, User user) {
        // Check if the user exists in the database
        if (!userRepository.existsById(user.getId())) {
            // If the user doesn't exist, save them to the database
            userRepository.save(user);
        }
        
        Post post = new Post();
        post.setText(postRequest.getTextContent());
        post.setImageUrl(postRequest.getImageUrl());
        post.setVideoUrl(postRequest.getVideoUrl());
        post.setUser(user);
        post.setCreatedAt(LocalDateTime.now());
        post.setUpdatedAt(LocalDateTime.now());
        // Handle the file as needed
        
        return postRepository.save(post);
    }
    


    public Post updatePost(Long postId, PostRequest postRequest) {
        // Check if the post exists in the database
        Optional<Post> postOptional = postRepository.findById(postId);
        if (!postOptional.isPresent()) {
            return null; // Or throw an exception indicating that the post does not exist
        }

        Post post = postOptional.get();
        // Update the post fields
        post.setText(postRequest.getTextContent());
        post.setImageUrl(postRequest.getImageUrl());
        post.setVideoUrl(postRequest.getVideoUrl());
        post.setUpdatedAt(LocalDateTime.now());

        // Save the updated post
        return postRepository.save(post);
    }

public boolean deletePost(Long id, User user) {
    return postRepository.findById(id)
        .map(post -> {
          
                postRepository.delete(post);
                return true;
            
           
        }).orElse(false);
}


 public Comment addCommentToPost(Long postId, Optional<User> user, String content) {
    User existingUser = user.get();
    Post post = postRepository.findById(postId)
            .orElseThrow(() -> new RuntimeException("Post not found"));
        Comment comment = new Comment();
        comment.setPost(post);
        comment.setUser(existingUser);
        comment.setContent(content);
        comment.setCreatedAt(LocalDateTime.now());
        return commentRepository.save(comment);
    }

    public void likePost(Long postId, Optional<User> user) {
        // Ensure the user is present
        User existingUser = user.orElseThrow(() -> new IllegalArgumentException("User not found"));
    
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
    
        // Check if a Like object already exists for the given Post and User
        Optional<Like> existingLike = likeRepository.findByPostAndUser(post, existingUser);
        if (existingLike.isPresent()) {
            throw new RuntimeException("Post already liked by the user");
        }
    
        // Create and save the new Like object
        Like like = new Like();
        like.setPost(post);
        like.setUser(existingUser);
        likeRepository.save(like);
    }
    
    
public Share sharePost(Long postId, Optional<User> user) {
    User existingUser = user.get();
    Post originalPost = postRepository.findById(postId)
        .orElseThrow(() -> new RuntimeException("Post not found"));
    Share share = new Share();
    share.setOriginalPost(originalPost);
    share.setUser(existingUser);
    share.setSharedAt(LocalDateTime.now());
    return shareRepository.save(share);
}
public void deleteCommentFromPost(Long postId, Long commentId) {
    
    commentRepository.deleteById(commentId);
}


public void deleteLikeFromPost(Long postId, Long likeId) {
    
    likeRepository.deleteById(likeId);
}


public void deleteShareFromPost(Long postId, Long shareId) {
    
    shareRepository.deleteById(shareId);
}
public List<Post> getFeedForUser( Optional<User> user) {
    User existingUser = user.get();
    List<Friendship> friendships = friendshipRepository.findByUser1AndIsFollowingTrue(existingUser);
    List<User> friendsAndFollowers = friendships.stream()
            .map(Friendship::getUser2)
            .collect(Collectors.toList());
    friendsAndFollowers.add(existingUser); 

    return postRepository.findByUserIn(friendsAndFollowers);
}


public void likeComment(Long commentId, Optional<User> user) {
    User existingUser = user.orElseThrow(() -> new IllegalArgumentException("User not found"));
    
    Comment comment = commentRepository.findById(commentId)
            .orElseThrow(() -> new RuntimeException("Comment not found"));
    
    Optional<Like> existingLike = likeRepository.findByCommentAndUser(comment, existingUser);
    if (existingLike.isPresent()) {
        throw new RuntimeException("Comment already liked by the user");
    }
    
    Like like = new Like();
    like.setComment(comment);
    like.setUser(existingUser);
    likeRepository.save(like);
}



public int getLikesCount(Long commentId) {
    Comment comment = commentRepository.findById(commentId)
            .orElseThrow(() -> new RuntimeException("Comment not found"));
    
    return likeRepository.countByComment(comment);
}
}

