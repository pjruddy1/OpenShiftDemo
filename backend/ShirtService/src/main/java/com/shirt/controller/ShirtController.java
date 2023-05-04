package com.shirt.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.shirt.models.Shirt;
import com.shirt.service.ShirtService;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"}, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class ShirtController {
    @Autowired
    private ShirtService service;

    @GetMapping("/")
    public String apiRoot(){
        return "BeefyBoys get testing!";
    }

    @GetMapping("/shirts")
    public ResponseEntity<List<Shirt>> getAllShirts(){
        return new ResponseEntity<List<Shirt>>(service.getAllShirts(), HttpStatus.OK);
    }

    @GetMapping("/shirt/{Id}")
    public ResponseEntity<Shirt> getShirtId(@PathVariable int Id){
        return new ResponseEntity<Shirt>(service.getShirtById(Id), HttpStatus.OK);
    }

    @PostMapping("/shirts")
    @ResponseStatus(HttpStatus.CREATED)
    public Shirt createShirt(@RequestBody Shirt shirt) throws SQLException {
        return service.createShirt(shirt);
    }

    @DeleteMapping("/shirts/{Id}")
    public ResponseEntity deleteShirtById(@PathVariable int Id){
        ResponseEntity response = new ResponseEntity(HttpStatus.NOT_FOUND);
        if(service.deleteShirtById(Id)){
            response = new ResponseEntity(HttpStatus.OK);
        }
        return response;
    }

    @PutMapping("/shirts/{shirtId}")
    public ResponseEntity<Shirt> updateShirtById(@PathVariable int shirtId, @RequestBody Shirt shirt) throws SQLException{
        ResponseEntity<Shirt> response = new ResponseEntity(HttpStatus.NOT_FOUND);
        if(shirtId != shirt.getShirtId()){
            response = new ResponseEntity<Shirt>(HttpStatus.UNPROCESSABLE_ENTITY);
        } else {
            return new ResponseEntity<Shirt>(service.updateShirtById(shirt), HttpStatus.OK);
        }
        return response;
    }
}
