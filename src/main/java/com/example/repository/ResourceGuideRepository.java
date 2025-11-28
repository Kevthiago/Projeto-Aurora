package com.example.repository;

import com.example.entity.ResourceGuide;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResourceGuideRepository extends JpaRepository<ResourceGuide, Long> {
    List<ResourceGuide> findByDependentId(Long dependentId);
}

