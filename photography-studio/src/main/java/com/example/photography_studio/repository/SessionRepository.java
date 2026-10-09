package com.example.photography_studio.repository;

import com.example.photography_studio.entity.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;

public interface SessionRepository extends JpaRepository<Session, Integer> {

    @Procedure(procedureName = "book_session")
    void bookSession(
            Integer p_customer_id,
            Integer p_photographer_id,
            Integer p_service_id,
            java.sql.Date p_session_date,
            java.sql.Time p_start_time,
            java.sql.Time p_end_time
    );
}