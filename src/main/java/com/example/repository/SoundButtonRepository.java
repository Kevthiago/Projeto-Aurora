package com.example.repository;

import com.example.entity.SoundButton;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SoundButtonRepository extends JpaRepository<SoundButton, Long> {
    List<SoundButton> findByCaregiverId(Long caregiverId);
}