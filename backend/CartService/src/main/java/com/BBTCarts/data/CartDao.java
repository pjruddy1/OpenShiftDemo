package com.BBTCarts.data;

import java.sql.SQLException;
import java.util.List;

import com.BBTCarts.models.Cart;

public interface CartDao {
	public boolean addToCart(int shirtId, int cartId) throws SQLException;

	public Cart getCartById(int cartId) throws SQLException;

	public Cart addCart() throws SQLException;

	public boolean deleteCartById(int cartId);

	public boolean deleteFromCart(int shirtId, int cartId);
	public List<Integer> getAllShirtIds(int cartId);
}
