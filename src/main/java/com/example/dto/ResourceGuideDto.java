package com.example.dto;

import lombok.Data;

@Data
public class ResourceGuideDto {
    private Long id;
    private String title;
    private String content;
    private String videoUrl;
    private Long dependentId;
}
