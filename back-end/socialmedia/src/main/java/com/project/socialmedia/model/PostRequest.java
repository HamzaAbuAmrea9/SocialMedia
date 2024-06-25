package com.project.socialmedia.model;

public class PostRequest {
   
    private String textContent;
    private String imageUrl;
    private String videoUrl;
   


    public PostRequest() {
    }


    

    
  


    public PostRequest(String textContent, String imageUrl, String videoUrl) {
        this.textContent = textContent;
        this.imageUrl = imageUrl;
        this.videoUrl = videoUrl;
    }
    public String getTextContent() {
        return textContent;
    }
    public void setTextContent(String textContent) {
        this.textContent = textContent;
    }
    public String getImageUrl() {
        return imageUrl;
    }
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
    public String getVideoUrl() {
        return videoUrl;
    }
    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }


}

    


