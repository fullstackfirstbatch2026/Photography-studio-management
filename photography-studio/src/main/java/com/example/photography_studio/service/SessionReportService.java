package com.example.photography_studio.service;

import com.example.photography_studio.repository.SessionReportRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class SessionReportService {

    private final SessionReportRepository sessionReportRepository;

    public SessionReportService(
            SessionReportRepository sessionReportRepository) {

        this.sessionReportRepository = sessionReportRepository;
    }

    public List<Map<String, Object>> getSessionDetails() {

        return sessionReportRepository.getSessionDetails();
    }
    
    public List<Map<String, Object>> getAboveAveragePhotographers() {

        return sessionReportRepository.getAboveAveragePhotographers();
    }
}