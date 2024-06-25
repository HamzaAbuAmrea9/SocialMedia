
package com.project.socialmedia.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.project.socialmedia.model.Message;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findBySenderIdOrReceiverId(Long senderId, Long receiverId);

        @Query("SELECT m FROM Message m WHERE m.id IN (SELECT MAX(m2.id) FROM Message m2 WHERE m2.sender.id = :userId OR m2.receiver.id = :userId GROUP BY m2.sender.id, m2.receiver.id)")
    List<Message> findLatestByUserId(@Param("userId") Long userId);
}

