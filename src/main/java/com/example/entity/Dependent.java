package com.example.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Data
@Entity
public class Dependent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Integer age;

    @ManyToOne
    @JoinColumn(name = "caregiver_id")
    private Caregiver caregiver;

    @OneToMany(mappedBy = "dependent", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CalendarEvent> events;

    @OneToMany(mappedBy = "dependent", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ActionLog> actions;
}
