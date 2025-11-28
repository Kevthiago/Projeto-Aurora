package com.example.controller;

import com.example.dto.DependentDto;
import com.example.service.DependentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/api/dependents")
public class DependentController {

    private final DependentService service;

    public DependentController(DependentService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<DependentDto> create(@RequestBody DependentDto dto) {
        return ResponseEntity.ok(service.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DependentDto> update(@PathVariable Long id, @RequestBody DependentDto dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @GetMapping("/caregiver/{caregiverId}")
    public ResponseEntity<List<DependentDto>> getByCaregiver(@PathVariable Long caregiverId) {
        return ResponseEntity.ok(service.getByCaregiver(caregiverId));
    }
}
