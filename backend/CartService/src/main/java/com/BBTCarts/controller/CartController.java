package com.BBTCarts.controller;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.BBTCarts.models.Cart;
import com.BBTCarts.service.CartService;

@RestController
@RequestMapping
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"}, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class CartController {
	@Autowired
	private CartService service;

	@GetMapping("/carts/{Id}")
	public ResponseEntity<Cart> getCartbyId(@PathVariable int Id) {
		try {
			return new ResponseEntity<Cart>(service.getCartById(Id), HttpStatus.OK);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}

	@PostMapping("/carts")
	@ResponseStatus(HttpStatus.CREATED)
	public Cart createCart() throws SQLException {
		return service.addCart();
	}

	@DeleteMapping("/carts/{Id}")
	public ResponseEntity deletePurchaseOrderById(@PathVariable int Id) {
		ResponseEntity response = new ResponseEntity(HttpStatus.NOT_FOUND);
		if (service.deleteCartById(Id)) {
			response = new ResponseEntity(HttpStatus.OK);
		}
		return response;
	}

	@DeleteMapping("/removeShirtFromCart/{shirtId}/{cartId}")
	public ResponseEntity deleteShirtFromCart(@PathVariable int shirtId, @PathVariable int cartId) {
		ResponseEntity response = new ResponseEntity(HttpStatus.NOT_FOUND);
		if (service.deleteFromCart(shirtId, cartId)) {
			response = new ResponseEntity(HttpStatus.OK);
		}
		return response;
	}

	@PostMapping("/addShirtToCart/{shirtId}/{cartId}")
	public ResponseEntity<?> addShirtToCart(@PathVariable int shirtId, @PathVariable int cartId) {
	    try {
	        boolean result = service.addToCart(shirtId, cartId);
	        if (result) {
	            return ResponseEntity.status(HttpStatus.CREATED).body("Product added to cart.");
	        } else {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add product to cart.");
	        }
	    } catch (SQLException e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred: " + e.getMessage());
	    }
	}
	
	@GetMapping("/getAllShirtIds/{cartId}")
	public List<Integer> getAllShirtIds(@PathVariable int cartId){
		return service.getAllShirtIds(cartId);
	}

//    @PutMapping("/carts/{shirtId}")
//    public ResponseEntity<Cart> updatePurchaseOrderById(@PathVariable int cartId, @RequestBody Cart cart){
//        ResponseEntity<Cart> response = new ResponseEntity(HttpStatus.NOT_FOUND);
//        if(cartId != cart.getId()){
//            response = new ResponseEntity<Cart>(HttpStatus.UNPROCESSABLE_ENTITY);
//        } else {
//            return new ResponseEntity<Cart>(service.update(cart), HttpStatus.OK);
//        }
//        return response;
//    }
}