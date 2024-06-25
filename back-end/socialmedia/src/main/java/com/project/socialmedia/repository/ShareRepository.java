package com.project.socialmedia.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.socialmedia.model.Post;
import com.project.socialmedia.model.Share;

@Repository
public interface ShareRepository extends JpaRepository<Share, Long> {
    List<Share> findByOriginalPost(Post originalPost);
    
   
}
