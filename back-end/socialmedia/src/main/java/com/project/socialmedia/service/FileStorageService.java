package com.project.socialmedia.service;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@CrossOrigin(origins = "*", maxAge = 3600)
@Service
public class FileStorageService {

    private final String uploadDir = "profile-images"; // Directory to store profile images

    public String storeProfileImage(MultipartFile file) throws Exception {
        try {
            // Normalize file name
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());

            // Generate a unique file name to prevent collisions
            String uniqueFileName = UUID.randomUUID().toString() + "_" + fileName;

            // Resolve the path to the upload directory
            Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();

            // Create the directory if it doesn't exist
            Files.createDirectories(uploadPath);

            // Copy the file to the upload directory
            Path targetLocation = uploadPath.resolve(uniqueFileName);
            Files.copy(file.getInputStream(), targetLocation);

            return uniqueFileName;
        } catch (IOException ex) {
            throw new Exception("Could not store profile image " + file.getOriginalFilename() + ". Please try again!", ex);
        }
    }
}
