package com.example.dto;

import lombok.Data;

@Data
public class AuthResponseDto {
    private String token;
    private String name;
    private Long caregiverId;
}
