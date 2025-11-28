package com.example.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
public class ActionLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String action;   // Ex: botão pressionado
    private LocalDateTime timestamp;

    @ManyToOne
    @JoinColumn(name = "dependent_id")
    private Dependent dependent;
}

