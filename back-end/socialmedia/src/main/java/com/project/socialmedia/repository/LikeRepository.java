package com.project.socialmedia.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.socialmedia.model.Comment;
import com.project.socialmedia.model.Like;
import com.project.socialmedia.model.Post;
import com.project.socialmedia.model.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
    
    Optional<Like> findByPostAndUser(Post post, User user);

    List<Like> findByPost(Post post);
 
    Optional<Like> findByCommentAndUser(Comment comment, User user);

    List<Like> findByComment(Comment comment);
    int countByComment(Comment comment);
    
}
    

