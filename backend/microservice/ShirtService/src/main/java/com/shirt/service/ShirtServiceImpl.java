package com.shirt.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shirt.data.ShirtDao;
import com.shirt.models.Shirt;

import java.sql.SQLException;
import java.util.List;

@Service
public class ShirtServiceImpl implements ShirtService{

    private ShirtDao dao;

    @Autowired
    ShirtServiceImpl(ShirtDao dao){
        this.dao = dao;
    }

    @Override
    public List<Shirt> getAllShirts() {
        return dao.getAllShirts();
    }

    @Override
    public Shirt getShirtById(int shirtId) {
        return dao.getShirtById(shirtId);
    }

    @Override
    public Shirt createShirt(Shirt shirt) throws SQLException{
        if (shirt.getShirtPrice() <= 0 || shirt.getInventory() <= -1 || shirt.getShirtName() == ""
                || shirt.getColor() == "" || shirt.getSize() == "") {
            throw new SQLException("Please input correct values for each field.");
        }else {
            return dao.createShirt(shirt);
        }
    }

    @Override
    public boolean deleteShirtById(int shirtId) {
        return dao.deleteShirtById(shirtId);
    }

    @Override
    public Shirt updateShirtById(Shirt shirt) throws SQLException{
        if (shirt.getShirtPrice() <= 0 || shirt.getInventory() <= -1 || shirt.getShirtName() == ""
                || shirt.getColor() == "" || shirt.getSize() == "") {
            throw new SQLException("Please input correct values for each field.");
        }else {
            return dao.updateShirtById(shirt);
        }
    }
}
