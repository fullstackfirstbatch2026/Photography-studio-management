package com.example.photography_studio.repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.sql.Time;

@Repository
public class CostRepository {

    private final JdbcTemplate jdbcTemplate;

    public CostRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public BigDecimal calculateCost(
            Integer serviceId,
            Time startTime,
            Time endTime) {

        String sql =
                "SELECT calculate_session_cost(?, ?, ?)";

        return jdbcTemplate.queryForObject(
                sql,
                BigDecimal.class,
                serviceId,
                startTime,
                endTime
        );
    }
}