package com.example.dto;

import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class CalendarEventDto {
    private Long id;
    private String title;
    private String description;
    private LocalDate date;
    private LocalTime time;
    private Long dependentId;
}

