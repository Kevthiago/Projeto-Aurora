package com.example.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class ResourceGuide {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String content;      // Texto
    private String videoUrl;     // Opcional

    @ManyToOne
    @JoinColumn(name = "dependent_id")
    private Dependent dependent;
}
