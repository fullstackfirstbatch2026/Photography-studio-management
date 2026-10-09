package com.example.photography_studio.repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class SessionReportRepository {

    private final JdbcTemplate jdbcTemplate;

    public SessionReportRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Map<String, Object>> getSessionDetails() {

        String sql = """
                SELECT
                    s.session_id,
                    c.name AS customer_name,
                    p.name AS photographer_name,
                    sv.service_name,
                    s.session_date,
                    s.start_time,
                    s.end_time,
                    s.status
                FROM sessions s
                JOIN customers c
                    ON s.customer_id = c.customer_id
                JOIN photographers p
                    ON s.photographer_id = p.photographer_id
                JOIN services sv
                    ON s.service_id = sv.service_id
                ORDER BY s.session_id
                """;

        return jdbcTemplate.queryForList(sql);
    }
    
    public List<Map<String, Object>> getAboveAveragePhotographers() {

        String sql = """
                SELECT
                    p.photographer_id,
                    p.name,
                    COUNT(s.session_id) AS session_count
                FROM photographers p
                JOIN sessions s
                    ON p.photographer_id = s.photographer_id
                GROUP BY p.photographer_id, p.name
                HAVING COUNT(s.session_id) >
                (
                    SELECT AVG(session_count)
                    FROM
                    (
                        SELECT COUNT(*) AS session_count
                        FROM sessions
                        GROUP BY photographer_id
                    ) AS photographer_counts
                )
                ORDER BY session_count DESC
                """;

        return jdbcTemplate.queryForList(sql);
    }
}