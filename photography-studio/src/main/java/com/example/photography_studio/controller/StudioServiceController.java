package com.example.photography_studio.controller;

import com.example.photography_studio.entity.StudioService;
import com.example.photography_studio.service.StudioServiceService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
public class StudioServiceController {

    private final StudioServiceService studioServiceService;

    public StudioServiceController(
            StudioServiceService studioServiceService) {
        this.studioServiceService = studioServiceService;
    }

    @GetMapping
    public List<StudioService> getAllServices() {
        return studioServiceService.getAllServices();
    }

    @GetMapping("/{id}")
    public StudioService getServiceById(
            @PathVariable Integer id) {

        return studioServiceService.getServiceById(id);
    }

    @PostMapping
    public StudioService createService(
            @RequestBody StudioService service) {

        return studioServiceService.createService(service);
    }

    @PutMapping("/{id}")
    public StudioService updateService(
            @PathVariable Integer id,
            @RequestBody StudioService service) {

        return studioServiceService.updateService(id, service);
    }

    @DeleteMapping("/{id}")
    public String deleteService(
            @PathVariable Integer id) {

        studioServiceService.deleteService(id);

        return "Service deleted successfully";
    }
}