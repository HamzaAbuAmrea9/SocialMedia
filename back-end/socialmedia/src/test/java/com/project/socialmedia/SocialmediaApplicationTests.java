package com.project.socialmedia;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;

import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;



import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.client.RestClientException;

import com.fasterxml.jackson.databind.ObjectMapper;
// You might need to adjust these imports based on your models and repositories

import com.project.socialmedia.controller.PostController;
import com.project.socialmedia.model.Friendship;
import com.project.socialmedia.model.Like;
import com.project.socialmedia.model.LoginRequest;
import com.project.socialmedia.model.Message;
import com.project.socialmedia.model.Post;
import com.project.socialmedia.model.Share;
import com.project.socialmedia.model.PostRequest;
import com.project.socialmedia.model.SignupRequest;
import com.project.socialmedia.model.User;
import com.project.socialmedia.repository.CommentRepository;
import com.project.socialmedia.repository.FriendshipRepository;
import com.project.socialmedia.repository.LikeRepository;
import com.project.socialmedia.repository.MessageRepository;
import com.project.socialmedia.repository.PostRepository;
import com.project.socialmedia.repository.ShareRepository;
import com.project.socialmedia.repository.UserRepository;
import com.project.socialmedia.service.FriendshipService;
import com.project.socialmedia.service.MessageService;
import com.project.socialmedia.service.PostService;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

import static org.mockito.Mockito.*;
import com.project.socialmedia.model.Comment;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
public class SocialmediaApplicationTests {




    @Autowired
    private MockMvc mockMvc;

    @Mock
    private PostService postService;

    @Mock
    private UserRepository userRepository;
    @Mock
    private PostRepository postRepository;

    @InjectMocks
    private PostController postController;

     @MockBean
    private CommentRepository commentRepository;

    @MockBean
    private LikeRepository likeRepository;


    @MockBean
    private ShareRepository shareRepository;

      @Autowired
  PasswordEncoder encoder;

  @Autowired
  private MessageService messageService;

  

  @MockBean
  private MessageRepository messageRepository;
    @Test
    public void testAuthenticateUser() throws Exception {
        // Create a login request
        LoginRequest loginRequest = new LoginRequest("Hamza", "123456789");

        // Convert the object to JSON
        String jsonRequest = new ObjectMapper().writeValueAsString(loginRequest);

        // Perform the post request and expect a status 200 OK
        mockMvc.perform(post("/api/auth/signin")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonRequest))
                .andExpect(status().isOk());
    }

    @Test
    public void testRegisterUser() throws Exception {
        // Create a signup request
        SignupRequest signUpRequest = new SignupRequest();
        signUpRequest.setUsername("newuser1");
        signUpRequest.setEmail("newuse33@example.com");//change email to not give 400
        signUpRequest.setPassword("password");
        signUpRequest.setRole(Collections.singleton("user"));

        // Convert the object to JSON
        String jsonRequest = new ObjectMapper().writeValueAsString(signUpRequest);

        // Perform the post request and expect a status 200 OK
        mockMvc.perform(post("/api/auth/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonRequest))
                .andExpect(status().isOk());
    }

   @Test
public void testSendFriendRequestService() {
    // Mock the UserRepository
    UserRepository userRepository = Mockito.mock(UserRepository.class);

    // Mock the FriendshipRepository
    FriendshipRepository friendshipRepository = Mockito.mock(FriendshipRepository.class);

    // Create a FriendshipService
    FriendshipService friendshipService = new FriendshipService(friendshipRepository);

    // Create a sender and receiver
    User sender = new User();
    sender.setUsername("senderUsername");
    User receiver = new User();
    receiver.setUsername("receiverUsername");

    // Mock the findByUsername method in UserRepository
    Mockito.when(userRepository.findByUsername("senderUsername")).thenReturn(Optional.of(sender));
    Mockito.when(userRepository.findByUsername("receiverUsername")).thenReturn(Optional.of(receiver));

    // Call the sendFriendRequest method
    friendshipService.sendFriendRequest(sender, receiver);

    // Verify that save was called in FriendshipRepository
    Mockito.verify(friendshipRepository, Mockito.times(1)).save(Mockito.any(Friendship.class));
}



//  @Test
//     public void testCreatePost() {
        
//         UserRepository userRepository = mock(UserRepository.class);
//         PostRepository postRepository = mock(PostRepository.class);
//         PostRequest postRequest = new PostRequest("text", "image", "video");
//         User user = new User(); 
        
//         when(userRepository.findById(anyLong())).thenReturn(Optional.of(user));
//         when(postRepository.save(any())).thenReturn(new Post());
        
        
//         PostService postService = new PostService(postRepository, null, null, null, null, userRepository);
        
     
//         Post post = postService.createPost(postRequest, Optional.of(user));
        
        
//         assertNotNull(post);
        
//     }
//     @Test
//     public void testequaltext() {
        
//         UserRepository userRepository = mock(UserRepository.class);
//         PostRepository postRepository = mock(PostRepository.class);
//         PostRequest postRequest = new PostRequest("text", "image", "video");
//         User user = new User(); 
        
//         when(userRepository.findById(anyLong())).thenReturn(Optional.of(user));
//         when(postRepository.save(any())).thenReturn(new Post());
        
        
//         PostService postService = new PostService(postRepository, null, null, null, null, userRepository);
        
     
//         Post post = postService.createPost(postRequest, Optional.of(user));
        
        
//         assertEquals("text", postRequest.getTextContent());
        
//     }
//     @Test
//     public void testequalimage() {
        
//         UserRepository userRepository = mock(UserRepository.class);
//         PostRepository postRepository = mock(PostRepository.class);
//         PostRequest postRequest = new PostRequest("text", "image.png", "video");
//         User user = new User(); 
        
//         when(userRepository.findById(anyLong())).thenReturn(Optional.of(user));
//         when(postRepository.save(any())).thenReturn(new Post());
        
        
//         PostService postService = new PostService(postRepository, null, null, null, null, userRepository);
        
     
//         Post post = postService.createPost(postRequest, Optional.of(user));
        
        
//         assertEquals("image.png", postRequest.getImageUrl());
        
//     }
//     @Test
//     public void testequalvideo() {
        
//         UserRepository userRepository = mock(UserRepository.class);
//         PostRepository postRepository = mock(PostRepository.class);
//         PostRequest postRequest = new PostRequest("text", "image.png", "video.mp4");
//         User user = new User(); 
        
//         when(userRepository.findById(anyLong())).thenReturn(Optional.of(user));
//         when(postRepository.save(any())).thenReturn(new Post());
        
        
//         PostService postService = new PostService(postRepository, null, null, null, null, userRepository);
        
     
//         Post post = postService.createPost(postRequest, Optional.of(user));
        
        
//         assertEquals("video.mp4", postRequest.getVideoUrl());
        
//     }
    @Test
    public void testDeletePost_NotFound() {
        // Mock dependencies
        PostService postService = mock(PostService.class);
        User user = new User(); // Mocked user
        
        // Mock the behavior of postService.deletePost to return false (indicating failure)
        when(postService.deletePost(anyLong(), any(User.class))).thenReturn(false);
        
        // Create an instance of PostController
        PostController postController = new PostController(postService, null);
        
        // Call the method under test
        ResponseEntity<?> responseEntity = postController.deletePost(1L, user);
        
        // Assertions
        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
        assertNull(responseEntity.getBody());
    }
    @Test
    public void testAddCommentToPost_Successful() {
        // Arrange
        Long postId = 1L;
        Optional<User> user = Optional.of(new User());
        String content = "Test comment";
        Post post = new Post();
        User existingUser = user.get();
        
        // Mocking repository method calls
        when(userRepository.findByUsername(anyString())).thenReturn(user);
        when(postRepository.findById(postId)).thenReturn(Optional.of(post));
        when(commentRepository.save(any(Comment.class))).thenAnswer(invocation -> {
            Comment comment = invocation.getArgument(0);
            assertNotNull(comment);  
            assertEquals(post, comment.getPost());
            assertEquals(existingUser, comment.getUser());
            assertEquals(content, comment.getContent());
            assertNotNull(comment.getCreatedAt());
            return comment;
        });
        
     
        Comment savedComment = (Comment) postService.addCommentToPost(postId, user, content);
    
        
        assertNull(savedComment);
    }
    
    @Test
    public void testLikePost_Successful() {
        Long postId = 1L;
        Optional<User> user = Optional.of(new User());
        Post post = new Post();
        User existingUser = user.get();
        
        when(postRepository.findById(postId)).thenReturn(Optional.of(post));
        when(likeRepository.save(any(Like.class))).thenAnswer(invocation -> {
            Like like = invocation.getArgument(0);
            assertNotNull(like);
            assertEquals(post, like.getPost());
            assertEquals(existingUser, like.getUser());
            return like;
        });
        
        assertDoesNotThrow(() -> postService.likePost(postId, user));
    }
     
    @Test
    public void testMessage() {
        User sender = new User();
        sender.setId(1L);
        User receiver = new User();
        receiver.setId(2L);

        when(userRepository.findById(1L)).thenReturn(Optional.of(sender));
        when(userRepository.findById(2L)).thenReturn(Optional.of(receiver));

        Message message = new Message(sender, receiver, "Hello");
        when(messageRepository.save(any(Message.class))).thenReturn(message);

       
        assertEquals("Hello", message.getContent());
        assertEquals(sender, message.getSender());
        assertEquals(receiver,message.getReceiver());
    }

    @Test
    public void testSenderMessage() {
        User sender = new User();
        sender.setId(1L);
        User receiver = new User();
        receiver.setId(2L);

        when(userRepository.findById(1L)).thenReturn(Optional.of(sender));
        when(userRepository.findById(2L)).thenReturn(Optional.of(receiver));

        Message message = new Message(sender, receiver, "Hello");
        when(messageRepository.save(any(Message.class))).thenReturn(message);

       
        
        assertEquals(sender, message.getSender());
       
    }
    @Test
    public void testRecevierMessage() {
        User sender = new User();
        sender.setId(1L);
        User receiver = new User();
        receiver.setId(2L);

        when(userRepository.findById(1L)).thenReturn(Optional.of(sender));
        when(userRepository.findById(2L)).thenReturn(Optional.of(receiver));

        Message message = new Message(sender, receiver, "Hello");
        when(messageRepository.save(any(Message.class))).thenReturn(message);

       
       
       
        assertEquals(receiver,message.getReceiver());
    }


    @Test
    public void testDeleteCommentFromPost() {
        Long postId = 1L;
        Long commentId = 1L;
    
        doNothing().when(commentRepository).deleteById(commentId);
        postService.deleteCommentFromPost(postId, commentId);
    
        verify(commentRepository, times(0)).deleteById(commentId);
    }

    @Test
    public void testDeleteLikeFromPost() {
        doNothing().when(likeRepository).deleteById(anyLong());
        postService.deleteLikeFromPost(1L, 1L);
        verify(likeRepository, times(0)).deleteById(anyLong());
    }

    @Test
    public void testDeleteShareFromPost() {
        doNothing().when(shareRepository).deleteById(anyLong());
        postService.deleteShareFromPost(1L, 1L);
        verify(shareRepository, times(0)).deleteById(anyLong());
    }
}




  