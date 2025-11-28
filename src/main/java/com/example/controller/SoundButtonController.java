package com.example.controller;

import com.example.dto.SoundButtonDto;
import com.example.service.SoundButtonService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/api/buttons")
public class SoundButtonController {

    private final SoundButtonService service;

    public SoundButtonController(SoundButtonService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<SoundButtonDto> create(@RequestBody SoundButtonDto dto) {
        return ResponseEntity.ok(service.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SoundButtonDto> update(@PathVariable Long id, @RequestBody SoundButtonDto dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/caregiver/{caregiverId}")
    public ResponseEntity<List<SoundButtonDto>> list(@PathVariable Long caregiverId) {
        return ResponseEntity.ok(service.getByCaregiver(caregiverId));
    }
}
