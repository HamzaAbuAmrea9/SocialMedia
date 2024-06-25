package com.project.socialmedia.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.socialmedia.model.FileEntity;

public interface FileRepository extends JpaRepository<FileEntity, Long> {
}
