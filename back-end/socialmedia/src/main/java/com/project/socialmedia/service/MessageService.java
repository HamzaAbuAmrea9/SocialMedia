package com.project.socialmedia.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.project.socialmedia.model.Message;
import com.project.socialmedia.model.User;
import com.project.socialmedia.repository.MessageRepository;
import com.project.socialmedia.repository.UserRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    public Message sendMessage(Long senderId, Long receiverId, String content) {
        User sender = userRepository.findById(senderId).orElseThrow(() -> new RuntimeException("User not found"));
        User receiver = userRepository.findById(receiverId).orElseThrow(() -> new RuntimeException("User not found"));

        Message message = new Message();
        message.setSender(sender);
        message.setReceiver(receiver);
        message.setContent(content);

        return messageRepository.save(message);
    }

    public List<Message> getMessages(Long userId) {
        return messageRepository.findBySenderIdOrReceiverId(userId, userId);
    }


    public List<Message> getLatestMessages(Long userId) {
        return messageRepository.findLatestByUserId(userId);
  
    }



    public ResponseEntity<String> deleteMessage(Long messageId) {
    Optional<Message> message = messageRepository.findById(messageId);
    if (message.isPresent()) {
        messageRepository.delete(message.get());
        return ResponseEntity.ok("Message deleted successfully.");
    } else {
        return ResponseEntity.badRequest().body("Message not found.");
    }
}

}


