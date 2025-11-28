package com.example.controller;

import com.example.service.impl.SelfRegulationAIService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai/self-regulation")
public class SelfRegulationAIController {

    private final SelfRegulationAIService service;

    public SelfRegulationAIController(SelfRegulationAIService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<String> generateGuide() {
        return ResponseEntity.ok(service.generateCalmingGuide());
    }
}
