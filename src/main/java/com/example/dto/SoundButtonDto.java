package com.example.dto;

import lombok.Data;

@Data
public class SoundButtonDto {
    private Long id;
    private String label;
    private String audioUrl;
    private String iconUrl;
    private Long caregiverId;
}

