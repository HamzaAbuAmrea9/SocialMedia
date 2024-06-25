package com.project.socialmedia.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.project.socialmedia.model.Post;
import com.project.socialmedia.model.User;

import java.util.List;
import java.util.Set;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByUser(User user);
    List<Post> findByUserIn(List<User> users);
   

    @Query("SELECT p FROM Post p JOIN FETCH p.user") 
    List<Post> findAllWithUser();

    @Query("SELECT p FROM Post p JOIN FETCH p.user ORDER BY p.createdAt DESC")
    List<Post> findAllWithUserOrderByCreatedAtDesc();
    
}
