package com.example.demo.mutation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.coxautodev.graphql.tools.GraphQLMutationResolver;
import com.example.demo.dao.entity.*;
import com.example.demo.service.*;

//import java.time.LocalDate;
@Component
public class VehicleMutation implements GraphQLMutationResolver {
    @Autowired
    private VehicleService vehicleService;
    public Vehicle createVehicle(final String type, final String modelCode, final String brandName, final int seats,final String launchDate) {
        return this.vehicleService.createVehicle(type, modelCode, brandName, seats, launchDate);
    }
    public void deleteVehicle(final int id) {
         this.vehicleService.deleteVehicle(id);
    }
}