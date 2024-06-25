package com.project.socialmedia.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.project.socialmedia.model.Friendship;
import com.project.socialmedia.model.FriendshipStatus;
import com.project.socialmedia.model.User;
import com.project.socialmedia.repository.FriendshipRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@Service
public class FriendshipService {

    private final FriendshipRepository friendshipRepository;

    @Autowired
    public FriendshipService(FriendshipRepository friendshipRepository) {
        this.friendshipRepository = friendshipRepository;
    }

    public void sendFriendRequest(User sender, User receiver) {
        Friendship friendship = new Friendship();
        friendship.setUser1(sender);
        friendship.setUser2(receiver);
        friendship.setStatus(FriendshipStatus.PENDING);
        friendshipRepository.save(friendship);
    }


    
}
