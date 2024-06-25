package com.project.socialmedia.controller;

import java.io.IOException;
import java.security.Principal;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.project.socialmedia.model.Friendship;
import com.project.socialmedia.model.Post;
import com.project.socialmedia.model.User;
import com.project.socialmedia.model.UserUpdateRequest;
import com.project.socialmedia.repository.UserRepository;
import com.project.socialmedia.service.FileStorageService;
import com.project.socialmedia.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import jakarta.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/socialmedia")
public class UserController {
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private FileStorageService fileStorageService;
    
        private final UserService userService;
        public UserController(UserService userService, BCryptPasswordEncoder passwordEncoder) {
            this.userService = userService;
        }
       

   @PutMapping("/users/{id}/profile-image")
public ResponseEntity<?> updateProfileImage(@PathVariable Long id, @RequestParam("image") MultipartFile image, Principal principal) {
    String username = principal.getName();
    Optional<User> userOptional = userRepository.findByUsername(username);

    if (!userOptional.isPresent()) {
        return new ResponseEntity<>("User must be authenticated to update profile image", HttpStatus.UNAUTHORIZED);
    }

    try {
        User user = userOptional.get();

        String imageUrl = null;
        if (image != null) {
            imageUrl = convertFileToBase64(image);
        }

        if (imageUrl == null) {
            return new ResponseEntity<>("Failed to process the image", HttpStatus.BAD_REQUEST);
        }

        user.setProfileImage(imageUrl);
        userRepository.save(user);

        return ResponseEntity.ok("Profile image updated successfully");
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update profile image");
    }
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

    
  @GetMapping("/users")
    public List<User> getAllusers() {
        return userRepository.findAll();
    }

   
    
    
    
    @PutMapping("/users/{id}")
    public ResponseEntity<?> updateUser(@PathVariable(value = "id") Long userId, @Valid @RequestBody UserUpdateRequest updateRequest) {
        User updatedUser = userService.updateProfile(userId, updateRequest);
        return ResponseEntity.ok(updatedUser);
    }
    
    @GetMapping("/current-user")
    public ResponseEntity<User> getCurrentUser() {
        User currentUser = userService.getCurrentUser();
        return ResponseEntity.ok(currentUser);
    }
@GetMapping("/users/{id}")
public ResponseEntity<Map<String, Object>> getUserById(@PathVariable Long id) {
    User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Error: User not found."));
    
    // Load the friendships and posts
    List<Friendship> friendships1 = user.getFriendships1();
    List<Friendship> friendships2 = user.getFriendships2();
    List<Post> posts = user.getPosts();

    // Get the friends from the friendships
    List<User> friends = Stream.concat(friendships1.stream(), friendships2.stream())
            .map(friendship -> friendship.getUser1().equals(user) ? friendship.getUser2() : friendship.getUser1())
            .collect(Collectors.toList());

    // Prepare the response
    Map<String, Object> response = new HashMap<>();
    response.put("user", user);
    response.put("friends", friends);
    response.put("posts", posts);

    return ResponseEntity.ok(response);
}



}

