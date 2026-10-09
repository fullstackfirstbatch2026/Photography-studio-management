package com.example.photography_studio.controller;

import com.example.photography_studio.service.SessionReportService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reports")
public class SessionReportController {

    private final SessionReportService sessionReportService;

    public SessionReportController(
            SessionReportService sessionReportService) {

        this.sessionReportService = sessionReportService;
    }

    @GetMapping("/sessions")
    public List<Map<String, Object>> getSessionDetails() {

        return sessionReportService.getSessionDetails();
    }
    
    @GetMapping("/above-average-photographers")
    public List<Map<String, Object>> getAboveAveragePhotographers() {

        return sessionReportService.getAboveAveragePhotographers();
    }
}