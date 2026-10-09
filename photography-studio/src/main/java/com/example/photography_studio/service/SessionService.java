package com.example.photography_studio.service;

import com.example.photography_studio.entity.Session;
import com.example.photography_studio.repository.BookingRepository;
import com.example.photography_studio.repository.SessionRepository;
import com.example.photography_studio.repository.CostRepository;

import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.math.BigDecimal;

@Service
public class SessionService {

    private final SessionRepository sessionRepository;
    private final BookingRepository bookingRepository;
    private final CostRepository costRepository;

    public SessionService(
            SessionRepository sessionRepository,
            BookingRepository bookingRepository,
            CostRepository costRepository) {
    	
        this.sessionRepository = sessionRepository;
        this.bookingRepository = bookingRepository;
        this.costRepository = costRepository;
    }

    public List<Session> getAllSessions() {
        return sessionRepository.findAll();
    }

    public Session getSessionById(Integer id) {
        return sessionRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Session not found"));
    }

    public Session createSession(Session session) {
        return sessionRepository.save(session);
    }

    public Session updateSession(
            Integer id,
            Session session) {

        Session existing =
                sessionRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Session not found"));

        existing.setCustomerId(session.getCustomerId());
        existing.setPhotographerId(session.getPhotographerId());
        existing.setServiceId(session.getServiceId());
        existing.setSessionDate(session.getSessionDate());
        existing.setStartTime(session.getStartTime());
        existing.setEndTime(session.getEndTime());
        existing.setStatus(session.getStatus());

        return sessionRepository.save(existing);
    }

    public void deleteSession(Integer id) {

        if (!sessionRepository.existsById(id)) {
            throw new RuntimeException("Session not found");
        }

        sessionRepository.deleteById(id);
    }

    // NEW: Stored procedure booking
    public void bookSession(
            Integer customerId,
            Integer photographerId,
            Integer serviceId,
            LocalDate sessionDate,
            LocalTime startTime,
            LocalTime endTime) {

        bookingRepository.bookSession(
                customerId,
                photographerId,
                serviceId,
                Date.valueOf(sessionDate),
                Time.valueOf(startTime),
                Time.valueOf(endTime)
        );
    }
    
    public BigDecimal calculateCost(
            Integer serviceId,
            LocalTime startTime,
            LocalTime endTime) {

        return costRepository.calculateCost(
                serviceId,
                Time.valueOf(startTime),
                Time.valueOf(endTime)
        );
    }
}