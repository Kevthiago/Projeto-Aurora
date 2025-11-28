package com.example.repository;

import com.example.entity.ActionLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ActionLogRepository extends JpaRepository<ActionLog, Long> {
    List<ActionLog> findByDependentIdOrderByTimestampDesc(Long dependentId);
}