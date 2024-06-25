package com.project.socialmedia.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.project.socialmedia.model.Comment;
import com.project.socialmedia.model.Like;
import com.project.socialmedia.model.Post;
import com.project.socialmedia.model.PostRequest;
import com.project.socialmedia.model.Share;
import com.project.socialmedia.model.User;
import com.project.socialmedia.repository.CommentRepository;
import com.project.socialmedia.repository.LikeRepository;
import com.project.socialmedia.repository.PostRepository;
import com.project.socialmedia.repository.ShareRepository;
import com.project.socialmedia.repository.UserRepository;
import com.project.socialmedia.service.PostService;
import com.project.socialmedia.service.StorageService;

import org.springframework.http.ResponseEntity;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/socialmedia")
public class PostController {
   @Autowired
    private UserRepository userRepository;
    @Autowired
    private PostService postService;
    @Autowired
    private StorageService storageService;
    @Autowired
    private PostRepository  postRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private LikeRepository likeRepository;

    @Autowired
    private ShareRepository shareRepository;
    
    @Autowired
    public PostController(PostService postService,StorageService storageService) {
        this.postService = postService;
        this.storageService=storageService;
    } 


@PostMapping("/posts")
public ResponseEntity<?> createPost(@RequestParam(value = "image", required = false) MultipartFile image,
                                    @RequestParam(value = "video", required = false) MultipartFile video,
                                    @RequestParam("textContent") String textContent,
                                    Principal principal) {
    String username = principal.getName();
    Optional<User> userOptional = userRepository.findByUsername(username);

    if (!userOptional.isPresent()) {
        return new ResponseEntity<>("User must be authenticated to create a post", HttpStatus.UNAUTHORIZED);
    }

    User user = userOptional.get();

    String imageUrl = null;
    String videoUrl = null;

    // Convert the image and video files to Base64 strings and get their URLs
    if (image != null) {
        imageUrl = convertFileToBase64(image);
    }
    if (video != null) {
        videoUrl = convertFileToBase64(video);
    }

    PostRequest postRequest = new PostRequest(textContent, imageUrl, videoUrl);
    // You can set other attributes of postRequest as needed

    // Create the post
    Post post = postService.createPost(postRequest, user);
    if (post == null) {
        return new ResponseEntity<>("Post could not be created", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Construct the response containing both the post and the user who created it
    Map<String, Object> response = new HashMap<>();
    response.put("post", post);
    response.put("user", user);

    // Return the response containing both the post and the user
    return new ResponseEntity<>(response, HttpStatus.CREATED);
}

public String convertFileToBase64(MultipartFile file) {
    try {
        // Convert the file to a byte array
        byte[] bytes = file.getBytes();
        // Convert the byte array to a Base64 string
        String base64Image = Base64.getEncoder().encodeToString(bytes);
        // Return the Base64 string
        return base64Image;
    } catch (IOException e) {
        e.printStackTrace();
        // Handle the exception appropriately, such as logging an error or returning null
        return null;
    }
}

    
   



@GetMapping("/posts")
public Map<String, Object> getAllPosts() {
    Map<String, Object> response = new HashMap<>();
    List<Post> posts = postRepository.findAllWithUserOrderByCreatedAtDesc();
    response.put("posts", posts);
    
  
    List<User> users = posts.stream().map(Post::getUser).collect(Collectors.toList());
    response.put("users", users);
    
    return response;
}



    @GetMapping("/posts/comments")
    public List<Comment> getAllComments() {
        return commentRepository.findAll();   
    }

    @GetMapping("/posts/likes")
    public List<Like> getAllLikes() {
        return likeRepository.findAll();   
    }

    @GetMapping("/posts/shares")
    public List<Share> getAllShares() {
        return shareRepository.findAll();   

    }

    @GetMapping("/posts/{postId}/comments")
    public ResponseEntity<List<Comment>> getCommentsForPost(@PathVariable Long postId) {
        Optional<Post> post = postRepository.findById(postId); 
        if (post.isPresent()) {
            List<Comment> comments = commentRepository.findByPost(post.get());
            return ResponseEntity.ok(comments);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/posts/{postId}/likes")
    public ResponseEntity<List<Like>> getLikesForPost(@PathVariable Long postId) {
        Optional<Post> post = postRepository.findById(postId); 
        if (post.isPresent()) {
            List<Like> likes = likeRepository.findByPost(post.get());
            return ResponseEntity.ok(likes);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    

@GetMapping("/posts/{postId}/shares")
public ResponseEntity<List<Share>> getSharesForPost(@PathVariable Long postId) {
    Optional<Post> post = postRepository.findById(postId); 
    if (post.isPresent()) {
        List<Share> shares = shareRepository.findByOriginalPost(post.get());
        return ResponseEntity.ok(shares);
    } else {
        return ResponseEntity.notFound().build();
    }
}
@PutMapping("/posts/{postId}")
public ResponseEntity<?> updatePost(@PathVariable Long postId,
                                     @RequestParam(value = "image", required = false) MultipartFile image,
                                     @RequestParam(value = "video", required = false) MultipartFile video,
                                     @RequestParam("textContent") String textContent,
                                     Principal principal) {

                                       
    
    String username = principal.getName();

    
    Optional<User> userOptional = userRepository.findByUsername(username);

    if (!userOptional.isPresent()) {
        return new ResponseEntity<>("User must be authenticated to update a post", HttpStatus.UNAUTHORIZED);
    }

    // Get the user object
    User user = userOptional.get();

    // Find the post to be updated
    Optional<Post> postOptional = postRepository.findById(postId);

    if (!postOptional.isPresent()) {
        return new ResponseEntity<>("Post not found", HttpStatus.NOT_FOUND);
    }

    // Get the post object
    Post post = postOptional.get();

    // Check if the authenticated user is the owner of the post
    if (!post.getUser().equals(user)) {
        return new ResponseEntity<>("You are not authorized to update this post", HttpStatus.FORBIDDEN);
    }

    // Convert image and video files to Base64 strings and get their URLs
    String imageUrl = null; // Initialize as null
    String videoUrl = null; // Initialize as null

    try {
        if (image != null) {
            imageUrl = convertFileToBase64(image);
        }
        if (video != null) {
            videoUrl = convertFileToBase64(video);
        }
    } catch (Exception e) {
        e.printStackTrace();
        return new ResponseEntity<>("Error processing file", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Update post fields
    post.setText(textContent);
    // Update imageUrl and videoUrl only if new files are uploaded
    if (imageUrl != null) {
        post.setImageUrl(imageUrl);
    }
    if (videoUrl != null) {
        post.setVideoUrl(videoUrl);
    }
    post.setUpdatedAt(LocalDateTime.now());

    // Save the updated post
    post = postRepository.save(post);

    // Return the updated post
    return new ResponseEntity<>(post, HttpStatus.OK);
}


@DeleteMapping("/posts/{id}")
public ResponseEntity<?> deletePost(@PathVariable Long id, @AuthenticationPrincipal User user) {
    if (postService.deletePost(id, user)) {
        return new ResponseEntity<>("Deleted successfully", HttpStatus.OK);
    } else {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}

@PostMapping("/posts/{postId}/comment")
public ResponseEntity<?> addComment(@PathVariable Long postId, @RequestBody String content, Principal principal) {
    String username = principal.getName();
    
    Optional<User> user = userRepository.findByUsername(username);
    Comment comment = postService.addCommentToPost(postId, user, content);
    return new ResponseEntity<>(comment, HttpStatus.CREATED);
}

    @PostMapping("/posts/{postId}/like")
    public ResponseEntity<?> likePost(@PathVariable Long postId, Principal principal) {
        String username = principal.getName();
    
        Optional<User> user = userRepository.findByUsername(username);
        postService.likePost(postId, user);
        return new ResponseEntity<>("Post liked successfully", HttpStatus.OK);
    }


    @PostMapping("/posts/{postId}/share")
    public ResponseEntity<?> sharePost(@PathVariable Long postId, Principal principal) {
        String username = principal.getName();
    
        Optional<User> user = userRepository.findByUsername(username);
        Share share = postService.sharePost(postId, user);
        return new ResponseEntity<>(share, HttpStatus.CREATED);
    }

    @DeleteMapping("/posts/{postId}/comments/{commentId}")
public ResponseEntity<?> deleteComment(@PathVariable Long postId, @PathVariable Long commentId) {
    postService.deleteCommentFromPost(postId, commentId);
    return new ResponseEntity<>("Comment deleted successfully", HttpStatus.OK);
}


@DeleteMapping("/posts/{postId}/likes/{likeId}")
public ResponseEntity<?> deleteLike(@PathVariable Long postId, @PathVariable Long likeId) {
    postService.deleteLikeFromPost(postId, likeId);
    return new ResponseEntity<>("Like removed successfully", HttpStatus.OK);
}


@DeleteMapping("/posts/{postId}/shares/{shareId}")
public ResponseEntity<?> deleteShare(@PathVariable Long postId, @PathVariable Long shareId) {
    postService.deleteShareFromPost(postId, shareId);
    return new ResponseEntity<>("Share removed successfully", HttpStatus.OK);
}

    @GetMapping("/feed")
public ResponseEntity<List<Post>> getFeedForCurrentUser(Principal principal) {
    String username = principal.getName();
    
    Optional<User> user = userRepository.findByUsername(username);
    List<Post> feed = postService.getFeedForUser(user);
    return new ResponseEntity<>(feed, HttpStatus.OK);



}


@PutMapping("/posts/{postId}/comments/{commentId}")
public ResponseEntity<?> editComment(@PathVariable Long postId, 
                                     @PathVariable Long commentId, 
                                     @RequestBody Map<String, String> request, 
                                     Principal principal) {
    String newContent = request.get("content");
    String username = principal.getName();
    
    Optional<User> userOptional = userRepository.findByUsername(username);
    if (!userOptional.isPresent()) {
        return new ResponseEntity<>("User must be authenticated to edit a comment", HttpStatus.UNAUTHORIZED);
    }
    
    User user = userOptional.get();
    
    Optional<Comment> commentOptional = commentRepository.findById(commentId);
    if (!commentOptional.isPresent()) {
        return new ResponseEntity<>("Comment not found", HttpStatus.NOT_FOUND);
    }
    
    Comment comment = commentOptional.get();
    if (!comment.getUser().equals(user)) {
        return new ResponseEntity<>("You are not authorized to edit this comment", HttpStatus.FORBIDDEN);
    }
    
    comment.setContent(newContent);
    comment.setCreatedAt(LocalDateTime.now()); 
    
    commentRepository.save(comment);
    
    return new ResponseEntity<>(comment, HttpStatus.OK);
}

@PostMapping("/comments/{commentId}/like")
public ResponseEntity<?> likeComment(@PathVariable Long commentId, Principal principal) {
    String username = principal.getName();
    Optional<User> user = userRepository.findByUsername(username);
    
    try {
        postService.likeComment(commentId, user);
        return new ResponseEntity<>("Comment liked successfully", HttpStatus.OK);
    } catch (RuntimeException e) {
        if (e.getMessage().equals("Comment already liked by the user")) {
            return new ResponseEntity<>("You have already liked this comment", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }
}


@GetMapping("/comments/{commentId}/likes/count")
public ResponseEntity<?> getLikesCount(@PathVariable Long commentId) {
    int likesCount = postService.getLikesCount(commentId);
    return new ResponseEntity<>(likesCount, HttpStatus.OK);
}


}
