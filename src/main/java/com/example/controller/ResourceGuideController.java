package com.example.controller;

import com.example.dto.ResourceGuideDto;
import com.example.service.ResourceGuideService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/resource-guide")
public class ResourceGuideController {

    private final ResourceGuideService service;

    public ResourceGuideController(ResourceGuideService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<ResourceGuideDto> create(@RequestBody ResourceGuideDto dto) {
        return ResponseEntity.ok(service.create(dto));
    }

    @GetMapping("/dependent/{dependentId}")
    public ResponseEntity<List<ResourceGuideDto>> list(@PathVariable Long dependentId) {
        return ResponseEntity.ok(service.getByDependent(dependentId));
    }
}
