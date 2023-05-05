package com.BBT.data;


import java.sql.SQLException;
import java.util.List;

import com.BBT.models.Shirt;

public interface ShirtDao {

    List<Shirt> getAllShirts();

    public Shirt getShirtById(int shirtId);

    public Shirt createShirt(Shirt shirt);

    public Shirt updateShirtById(Shirt shirt) throws SQLException;

    public boolean deleteShirtById(int shirtId);
}
