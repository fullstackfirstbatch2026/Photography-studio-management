package com.example.photography_studio.repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.sql.Time;

@Repository
public class BookingRepository {

    private final JdbcTemplate jdbcTemplate;

    public BookingRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void bookSession(
            Integer customerId,
            Integer photographerId,
            Integer serviceId,
            Date sessionDate,
            Time startTime,
            Time endTime) {

        String sql = "CALL book_session(?, ?, ?, ?, ?, ?)";

        jdbcTemplate.update(
                sql,
                customerId,
                photographerId,
                serviceId,
                sessionDate,
                startTime,
                endTime
        );
    }
}