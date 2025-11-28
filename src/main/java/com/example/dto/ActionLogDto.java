package com.example.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ActionLogDto {
    private Long id;
    private String action;
    private LocalDateTime timestamp;
    private Long dependentId;
}

