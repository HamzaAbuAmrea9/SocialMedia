package com.project.socialmedia.controller;

import org.springframework.web.bind.annotation.*;

import com.project.socialmedia.model.Message;
import com.project.socialmedia.service.MessageService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @PostMapping("/{senderId}/{receiverId}")
    public Message sendMessage(@PathVariable Long senderId, @PathVariable Long receiverId, @RequestBody String content) {
        return messageService.sendMessage(senderId, receiverId, content);
    }

    @GetMapping("/{userId}")
    public List<Message> getMessages(@PathVariable Long userId) {
        return messageService.getMessages(userId);
    }

    @GetMapping("/latest/{userId}")
public List<Message> getLatestMessages(@PathVariable Long userId) {
    return messageService.getLatestMessages(userId);
}


@DeleteMapping("/{messageId}")
public ResponseEntity<String> deleteMessage(@PathVariable Long messageId) {
    return messageService.deleteMessage(messageId);
}

}
