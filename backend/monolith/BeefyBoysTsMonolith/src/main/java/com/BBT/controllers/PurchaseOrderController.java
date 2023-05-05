package com.BBT.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.BBT.models.PurchaseOrder;
import com.BBT.services.PurchaseOrderService;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"}, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class PurchaseOrderController {
    @Autowired
    private PurchaseOrderService service;

    
    @GetMapping("/orders")
    public ResponseEntity<List<PurchaseOrder>> getAllPurchaseOrders(){
        return new ResponseEntity<List<PurchaseOrder>>(service.getAllPurchaseOrders(), HttpStatus.OK);
    }

    @GetMapping("/orders/{Id}")
    public ResponseEntity<PurchaseOrder> getPurchaseOrderId(@PathVariable int Id){
        return new ResponseEntity<PurchaseOrder>(service.getPurchaseOrderById(Id), HttpStatus.OK);
    }

    @PostMapping("/orders")
    @ResponseStatus(HttpStatus.CREATED)
    public PurchaseOrder createPurchaseOrder(@RequestBody PurchaseOrder order) throws SQLException{
        return service.createPurchaseOrder(order);
    }
    
    @DeleteMapping("/orders/{Id}")
    public ResponseEntity deletePurchaseOrderById(@PathVariable int Id){
        ResponseEntity response = new ResponseEntity(HttpStatus.NOT_FOUND);
        if(service.deletePurchaseOrderById(Id)){
            response = new ResponseEntity(HttpStatus.OK);
        }
        return response;
    }
    
    @PutMapping("/orders/{shirtId}")
    public ResponseEntity<PurchaseOrder> updatePurchaseOrderById(@PathVariable int orderId, @RequestBody PurchaseOrder order){
        ResponseEntity<PurchaseOrder> response = new ResponseEntity(HttpStatus.NOT_FOUND);
        if(orderId != order.getId()){
            response = new ResponseEntity<PurchaseOrder>(HttpStatus.UNPROCESSABLE_ENTITY);
        } else {
            return new ResponseEntity<PurchaseOrder>(service.updatePurchaseOrderById(order), HttpStatus.OK);
        }
        return response;
    }
}
