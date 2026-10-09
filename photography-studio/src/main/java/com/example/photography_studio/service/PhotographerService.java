package com.example.photography_studio.service;

import com.example.photography_studio.entity.Photographer;
import com.example.photography_studio.repository.PhotographerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PhotographerService {

    private final PhotographerRepository photographerRepository;

    public PhotographerService(PhotographerRepository photographerRepository) {
        this.photographerRepository = photographerRepository;
    }

    public List<Photographer> getAllPhotographers() {
        return photographerRepository.findAll();
    }

    public Photographer createPhotographer(Photographer photographer) {
        return photographerRepository.save(photographer);
    }

    public Photographer getPhotographerById(Integer id) {
        return photographerRepository.findById(id)
                .orElseThrow(() ->
                    new RuntimeException("Photographer not found"));
    }

    public Photographer updatePhotographer(
            Integer id,
            Photographer photographer) {

        Photographer existing =
                photographerRepository.findById(id)
                .orElseThrow(() ->
                    new RuntimeException("Photographer not found"));

        existing.setName(photographer.getName());
        existing.setSpecialization(photographer.getSpecialization());
        existing.setPhone(photographer.getPhone());

        return photographerRepository.save(existing);
    }

    public void deletePhotographer(Integer id) {

        if (!photographerRepository.existsById(id)) {
            throw new RuntimeException("Photographer not found");
        }

        photographerRepository.deleteById(id);
    }
}