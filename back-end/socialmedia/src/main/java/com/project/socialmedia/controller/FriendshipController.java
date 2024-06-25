package com.project.socialmedia.controller;



import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.socialmedia.model.Friendship;
import com.project.socialmedia.model.FriendshipStatus;
import com.project.socialmedia.model.User;
import com.project.socialmedia.repository.FriendshipRepository;
import com.project.socialmedia.repository.UserRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/socialmedia")
public class FriendshipController {

    @Autowired
    private FriendshipRepository friendshipRepository;
    @Autowired
    private UserRepository userRepository;

    @PutMapping("/{receiverUsername}/accept-friend-request/{senderUsername}")
    public ResponseEntity<String> acceptFriendRequest(
            @PathVariable String receiverUsername,
            @PathVariable String senderUsername) {
        User receiver = userRepository.findByUsername(receiverUsername)
                .orElseThrow(() -> new RuntimeException("Receiver not found"));
        User sender = userRepository.findByUsername(senderUsername)
                .orElseThrow(() -> new RuntimeException("Sender not found"));

        Friendship friendship = friendshipRepository.findByUser1AndUser2(sender, receiver)
                .orElseThrow(() -> new RuntimeException("Friendship request not found"));

        friendship.setStatus(FriendshipStatus.ACCEPTED);
        friendshipRepository.save(friendship);

        return ResponseEntity.ok("Friend request accepted successfully.");
    }

    @PostMapping("/{senderUsername}/send-friend-request/{receiverUsername}")
    public ResponseEntity<String> sendFriendRequest(
            @PathVariable String senderUsername,
            @PathVariable String receiverUsername) {
        User sender = userRepository.findByUsername(senderUsername)
                .orElseThrow(() -> new RuntimeException("Sender not found"));
        User receiver = userRepository.findByUsername(receiverUsername)
                .orElseThrow(() -> new RuntimeException("Receiver not found"));
    
        // Check if there is already a pending request between sender and receiver
        Optional<Friendship> existingRequest = friendshipRepository.findByUser1AndUser2AndStatus(sender, receiver, FriendshipStatus.PENDING);
        if (existingRequest.isPresent()) {
            return ResponseEntity.badRequest().body("A pending friend request already exists between sender and receiver.");
        }
    
        Friendship friendship = new Friendship();
        friendship.setUser1(sender);
        friendship.setUser2(receiver);
        friendship.setStatus(FriendshipStatus.PENDING);
        friendshipRepository.save(friendship);
    
        return ResponseEntity.ok("Friend request sent successfully.");
    }
    

    @PutMapping("/accept-friend-request/{requestId}")
    public ResponseEntity<String> acceptFriendRequest(@PathVariable Long requestId) {
        Friendship friendship = friendshipRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Friendship request not found"));

        friendship.setStatus(FriendshipStatus.ACCEPTED);
        friendshipRepository.save(friendship);

        return ResponseEntity.ok("Friend request accepted successfully.");
    }

    @DeleteMapping("/Friendship/requests/{requestId}")
    public ResponseEntity<String> declineFriendRequest(@PathVariable Long requestId) {
        friendshipRepository.deleteById(requestId);
        return ResponseEntity.ok("Friend request declined successfully.");
    }

    @GetMapping("/Friendship")
    public List<Friendship> getFriendships() {
        return friendshipRepository.findAll();
    }

    @GetMapping("/Friendship/requests")
    public List<Friendship> getFriendRequests() {
        return friendshipRepository.findByStatus(FriendshipStatus.PENDING);
    }

    @GetMapping("/{username}/friends")
    public ResponseEntity<List<User>> getUserFriends(@PathVariable String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Friendship> friendships = friendshipRepository.findAllByUserAndStatus(user, FriendshipStatus.ACCEPTED);
        List<User> friends = friendships.stream()
                .map(friendship -> friendship.getUser1().equals(user) ? friendship.getUser2() : friendship.getUser1())
                .collect(Collectors.toList());

        return ResponseEntity.ok(friends);
    }


    @DeleteMapping("/{username1}/unfriend/{username2}")
    public ResponseEntity<String> deleteFriend(
            @PathVariable String username1,
            @PathVariable String username2) {
        User user1 = userRepository.findByUsername(username1)
                .orElseThrow(() -> new RuntimeException("User1 not found"));
        User user2 = userRepository.findByUsername(username2)
                .orElseThrow(() -> new RuntimeException("User2 not found"));

        Optional<Friendship> friendship = friendshipRepository.findByUser1AndUser2(user1, user2);
        if (!friendship.isPresent()) {
            friendship = friendshipRepository.findByUser1AndUser2(user2, user1);
        }

        if (friendship.isPresent()) {
            friendshipRepository.delete(friendship.get());
            return ResponseEntity.ok("Friendship deleted successfully.");
        } else {
            return ResponseEntity.badRequest().body("Friendship not found.");
        }
    }
}
