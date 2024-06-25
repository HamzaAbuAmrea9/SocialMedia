package com.project.socialmedia.model;

import jakarta.persistence.*;

@Entity
public class Friendship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user1_id")
    private User user1;

    @ManyToOne
    @JoinColumn(name = "user2_id")
    private User user2;

    @Enumerated(EnumType.STRING)
    private FriendshipStatus status;


    private boolean isFollowing;

    public Friendship() {
    }

    public Friendship(User user1, User user2, FriendshipStatus status, boolean isFollowing) {
        this.user1 = user1;
        this.user2 = user2;
        this.status = status;
        this.isFollowing = isFollowing;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser1() {
        return user1;
    }

    public void setUser1(User user1) {
        this.user1 = user1;
    }

    public User getUser2() {
        return user2;
    }

    public void setUser2(User user2) {
        this.user2 = user2;
    }

    public FriendshipStatus getStatus() {
        return status;
    }

    public void setStatus(FriendshipStatus status) {
        this.status = status;
    }

    public boolean isFollowing() {
        return isFollowing;
    }

    public void setFollowing(boolean isFollowing) {
        this.isFollowing = isFollowing;
    }

   
}
