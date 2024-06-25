package com.project.socialmedia.repository;

 
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

import com.project.socialmedia.model.Friendship;
import com.project.socialmedia.model.FriendshipStatus;
import com.project.socialmedia.model.Like;
import com.project.socialmedia.model.Post;
import com.project.socialmedia.model.User;

public interface FriendshipRepository extends JpaRepository<Friendship, Long> {

    Optional<Friendship> findByUser1AndUser2(User user1, User user2);

    List<Friendship> findAllByUser1OrUser2(User user1, User user2);

    void deleteByUser1AndUser2(User user1, User user2);

   @Query("SELECT f FROM Friendship f WHERE f.status = :status")
    List<Friendship> findByStatus(@Param("status") FriendshipStatus status);
    
    List<Friendship> findByUser2AndIsFollowingTrue(User user);
    List<Friendship> findByUser1AndIsFollowingTrue(User user);
    @Query("SELECT f FROM Friendship f WHERE (f.user1 = :user OR f.user2 = :user) AND f.status = :status")
List<Friendship> findAllByUserAndStatus(@Param("user") User user, @Param("status") FriendshipStatus status);


Optional<Friendship> findByUser1AndUser2AndStatus(User user1, User user2, FriendshipStatus status);

}
