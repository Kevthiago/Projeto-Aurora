package com.example.service;

import com.example.dto.CalendarEventDto;

import java.util.List;

public interface CalendarEventService {
    CalendarEventDto create(CalendarEventDto dto);
    CalendarEventDto update(Long id, CalendarEventDto dto);
    void delete(Long id);
    CalendarEventDto getById(Long id);
    List<CalendarEventDto> getByDependent(Long dependentId);
}

