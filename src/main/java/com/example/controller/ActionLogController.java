package com.example.controller;

import com.example.dto.ActionLogDto;
import com.example.service.ActionLogService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/api/logs")
public class ActionLogController {

    private final ActionLogService service;

    public ActionLogController(ActionLogService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<ActionLogDto> create(@RequestBody ActionLogDto dto) {
        return ResponseEntity.ok(service.create(dto));
    }

    @GetMapping("/dependent/{dependentId}")
    public ResponseEntity<List<ActionLogDto>> list(@PathVariable Long dependentId) {
        return ResponseEntity.ok(service.getByDependent(dependentId));
    }
}
