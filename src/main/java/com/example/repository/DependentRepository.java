package com.example.repository;

import com.example.entity.Dependent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DependentRepository extends JpaRepository<Dependent, Long> {
    List<Dependent> findByCaregiverId(Long caregiverId);
}