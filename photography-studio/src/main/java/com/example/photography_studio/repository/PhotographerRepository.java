package com.example.photography_studio.repository;

import com.example.photography_studio.entity.Photographer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PhotographerRepository extends JpaRepository<Photographer, Integer> {
}
