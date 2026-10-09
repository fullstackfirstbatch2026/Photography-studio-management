package com.example.photography_studio.controller;

import com.example.photography_studio.entity.Photographer;
import com.example.photography_studio.service.PhotographerService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/photographers")
public class PhotographerController {

    private final PhotographerService photographerService;

    public PhotographerController(
            PhotographerService photographerService) {
        this.photographerService = photographerService;
    }

    @GetMapping
    public List<Photographer> getAllPhotographers() {
        return photographerService.getAllPhotographers();
    }

    @GetMapping("/{id}")
    public Photographer getPhotographerById(
            @PathVariable Integer id) {

        return photographerService.getPhotographerById(id);
    }

    @PostMapping
    public Photographer createPhotographer(
            @RequestBody Photographer photographer) {

        return photographerService.createPhotographer(photographer);
    }

    @PutMapping("/{id}")
    public Photographer updatePhotographer(
            @PathVariable Integer id,
            @RequestBody Photographer photographer) {

        return photographerService.updatePhotographer(id, photographer);
    }

    @DeleteMapping("/{id}")
    public String deletePhotographer(
            @PathVariable Integer id) {

        photographerService.deletePhotographer(id);

        return "Photographer deleted successfully";
    }
}