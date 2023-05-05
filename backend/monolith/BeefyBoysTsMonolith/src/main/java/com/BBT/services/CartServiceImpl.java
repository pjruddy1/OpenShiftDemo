package com.BBT.services;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.BBT.data.CartDao;
import com.BBT.models.Cart;


@Service
public class CartServiceImpl implements CartService {
	private CartDao dao;

	@Autowired
	public CartServiceImpl(CartDao dao) {
		super();
		this.dao = dao;
	}

	@Override
	public boolean addToCart(int shirtId, int cartId) throws SQLException {
		return dao.addToCart(shirtId, cartId);
	}

	@Override
	public Cart getCartById(int cartId) throws SQLException {
		return dao.getCartById(cartId);
	}

	@Override
	public Cart addCart() throws SQLException {
		return dao.addCart();
	}

	@Override
	public boolean deleteCartById(int cartId) {
		return dao.deleteCartById(cartId);
	}

	@Override
	public boolean deleteFromCart(int shirtId, int cartId) {
		return dao.deleteFromCart(cartId, shirtId);
	}
	@Override
	public List<Integer> getAllShirtIds(int cartId){
		return dao.getAllShirtIds(cartId);
	}
}
