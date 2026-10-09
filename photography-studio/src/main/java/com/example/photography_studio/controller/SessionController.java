package com.example.photography_studio.controller;

import com.example.photography_studio.entity.Session;
import com.example.photography_studio.service.SessionService;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.math.BigDecimal;
import java.time.LocalTime;

@RestController
@RequestMapping("/api/sessions")
public class SessionController {

    private final SessionService sessionService;

    public SessionController(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    @GetMapping
    public List<Session> getAllSessions() {
        return sessionService.getAllSessions();
    }

    @GetMapping("/{id}")
    public Session getSessionById(
            @PathVariable Integer id) {

        return sessionService.getSessionById(id);
    }

    @PostMapping
    public Session createSession(
            @RequestBody Session session) {

        return sessionService.createSession(session);
    }

    @PutMapping("/{id}")
    public Session updateSession(
            @PathVariable Integer id,
            @RequestBody Session session) {

        return sessionService.updateSession(id, session);
    }

    @DeleteMapping("/{id}")
    public String deleteSession(
            @PathVariable Integer id) {

        sessionService.deleteSession(id);

        return "Session deleted successfully";
    }
    
    @PostMapping("/book")
    public String bookSession(@RequestBody Session session) {

        sessionService.bookSession(
                session.getCustomerId(),
                session.getPhotographerId(),
                session.getServiceId(),
                session.getSessionDate(),
                session.getStartTime(),
                session.getEndTime()
        );

        return "Session booked successfully";
    }
    
    @GetMapping("/cost")
    public BigDecimal calculateCost(
            @RequestParam Integer serviceId,
            @RequestParam String startTime,
            @RequestParam String endTime) {

        LocalTime start = LocalTime.parse(startTime);
        LocalTime end = LocalTime.parse(endTime);

        return sessionService.calculateCost(
                serviceId,
                start,
                end
        );
    }
}