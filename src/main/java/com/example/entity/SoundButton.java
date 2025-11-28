package com.example.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class SoundButton {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String label;        // Ex: "Estou com fome"
    private String audioUrl;     // Link do áudio gerado
    private String iconUrl;      // Ícone no app

    @ManyToOne
    @JoinColumn(name = "caregiver_id")
    private Caregiver caregiver;
}

