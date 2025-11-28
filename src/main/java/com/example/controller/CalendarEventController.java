package com.example.controller;

import com.example.dto.CalendarEventDto;
import com.example.service.CalendarEventService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;



@RestController
@RequestMapping("/api/events")
public class CalendarEventController {

    private final CalendarEventService service;

    public CalendarEventController(CalendarEventService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<CalendarEventDto> create(@RequestBody CalendarEventDto dto) {
        return ResponseEntity.ok(service.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CalendarEventDto> update(@PathVariable Long id, @RequestBody CalendarEventDto dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CalendarEventDto> get(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping("/dependent/{dependentId}")
    public ResponseEntity<List<CalendarEventDto>> getByDependent(@PathVariable Long dependentId) {
        return ResponseEntity.ok(service.getByDependent(dependentId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
