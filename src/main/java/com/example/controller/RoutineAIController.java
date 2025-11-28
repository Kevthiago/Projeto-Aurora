package com.example.controller;

import com.example.service.impl.PersonalizedRoutineAIService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai/routine")
public class RoutineAIController {

    private final PersonalizedRoutineAIService service;

    public RoutineAIController(PersonalizedRoutineAIService service) {
        this.service = service;
    }

    @GetMapping("/{dependentId}")
    public ResponseEntity<String> generateRoutine(@PathVariable Long dependentId) {
        return ResponseEntity.ok(service.generateRoutine(dependentId));
    }
}
