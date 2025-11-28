package com.example.dto;

import lombok.Data;

@Data
public class DependentDto {
    private Long id;
    private String name;
    private Integer age;
    private Long caregiverId;
}
