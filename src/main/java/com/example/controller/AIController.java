package com.example.controller;

import com.example.service.AIService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/ai")
public class AIController {

    private final AIService aiService;

    public AIController(AIService aiService) {
        this.aiService = aiService;
    }

    @GetMapping("/analyze/{dependentId}")
    public ResponseEntity<String> analyze(@PathVariable Long dependentId) {
        return ResponseEntity.ok(aiService.analyzeDependentActions(dependentId));
    }
}
