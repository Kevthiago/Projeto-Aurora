package com.example.repository;

import com.example.entity.Caregiver;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CaregiverRepository extends JpaRepository<Caregiver, Long> {
    Optional<Caregiver> findByEmail(String email);
    boolean existsByEmail(String email);
}
