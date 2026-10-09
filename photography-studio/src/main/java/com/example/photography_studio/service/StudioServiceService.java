package com.example.photography_studio.service;

import com.example.photography_studio.entity.StudioService;
import com.example.photography_studio.repository.StudioServiceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudioServiceService {

    private final StudioServiceRepository studioServiceRepository;

    public StudioServiceService(
            StudioServiceRepository studioServiceRepository) {
        this.studioServiceRepository = studioServiceRepository;
    }

    public List<StudioService> getAllServices() {
        return studioServiceRepository.findAll();
    }

    public StudioService getServiceById(Integer id) {
        return studioServiceRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Service not found"));
    }

    public StudioService createService(StudioService service) {
        return studioServiceRepository.save(service);
    }

    public StudioService updateService(
            Integer id,
            StudioService service) {

        StudioService existing =
                studioServiceRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Service not found"));

        existing.setServiceName(service.getServiceName());
        existing.setPricePerHour(service.getPricePerHour());
        existing.setDescription(service.getDescription());

        return studioServiceRepository.save(existing);
    }

    public void deleteService(Integer id) {

        if (!studioServiceRepository.existsById(id)) {
            throw new RuntimeException("Service not found");
        }

        studioServiceRepository.deleteById(id);
    }
}
