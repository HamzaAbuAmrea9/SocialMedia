package com.project.socialmedia.model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;


@CrossOrigin(origins = "*", maxAge = 3600)
@Entity
@Table(name = "users", 
    uniqueConstraints = { 
      @UniqueConstraint(columnNames = "username"),
      @UniqueConstraint(columnNames = "email") 
    })

public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;
   
    private String email;
    private String profileImage;

        public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }


        @OneToMany(mappedBy = "user1")
        @JsonBackReference
    private List<Friendship> friendships1;

    @OneToMany(mappedBy = "user2")
    @JsonBackReference
    private List<Friendship> friendships2;

    
    
      @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonManagedReference
    @JsonIgnoreProperties("user")
    private List<Post> posts = new ArrayList<>();
    

   

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(  name = "user_roles", 
          joinColumns = @JoinColumn(name = "user_id"), 
          inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    
    public List<Friendship> getFriendships1() {
        return friendships1;
    }

    public void setFriendships1(List<Friendship> friendships1) {
        this.friendships1 = friendships1;
    }

    public List<Friendship> getFriendships2() {
        return friendships2;
    }

    public void setFriendships2(List<Friendship> friendships2) {
        this.friendships2 = friendships2;
    }

    public List<Post> getPosts() {
        return posts;
    }

    public void setPosts(List<Post> posts) {
        this.posts = posts;
    }

    public User() {
       
    }
    public User(String username, String email) {
        this.username = username;
        
       
     
        this.email = email;
       
    }

    public User(String username,  String email,String password) {
        this.username = username;
        
        this.password =password;
     
        this.email = email;
       
    }

    

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
       
        this.password =password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

   
    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                 
                '}';
    }
}

