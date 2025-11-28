package com.example.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Entity
public class CalendarEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;

    private LocalDate date;
    private LocalTime time;

    @ManyToOne
    @JoinColumn(name = "dependent_id")
    private Dependent dependent;
}
