package com.BBT.services;


import java.sql.SQLException;
import java.util.List;

import com.BBT.models.Shirt;

public interface ShirtService {
    List<Shirt> getAllShirts();

    public Shirt getShirtById(int shirtId);

    public Shirt createShirt(Shirt shirt) throws SQLException;

    public Shirt updateShirtById(Shirt shirt) throws SQLException;

    public boolean deleteShirtById(int shirtId);
}
