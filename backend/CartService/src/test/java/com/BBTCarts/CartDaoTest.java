package com.BBTCarts;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.sql.SQLException;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.BBTCarts.data.CartDao;
import com.BBTCarts.models.Cart;

@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = CartTestConfig.class)
public class CartDaoTest {

	@Autowired
	CartDao testDao;

	@BeforeAll
	public static void setUpClass() {

	}

	@AfterAll
	public static void tearDownClass() {

	}

	@BeforeEach
	public void setUp() {

	}

	@AfterEach
	public void tearDown() {

	}

	@Test
	public void testAddToCart() {
		int cartId = 2;
		int shirtId = 2;
		try {
			assertEquals(true, testDao.addToCart(cartId, shirtId));
			assertEquals(true, testDao.deleteFromCart(cartId, shirtId));
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	@Test
	public void testGetCartById() throws SQLException {
		Cart cart = testDao.getCartById(1);
		assertEquals(1, cart.getCartId());
	}

	@Test
	public void testAddCart() {
		Cart cart = new Cart();
		try {
			cart = testDao.addCart();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		assertEquals(testDao.deleteCartById(cart.getCartId()), true);

	}

	@Test
	public void testDeleteCartById() {
		Cart cart = new Cart();
		try {
			cart = testDao.addCart();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		assertEquals(testDao.deleteCartById(cart.getCartId()), true);

	}

	@Test
	public void testDeleteFromCart() {
		int cartId = 2;
		int shirtId = 2;
		try {
			assertEquals(true, testDao.addToCart(cartId, shirtId));
			assertEquals(true, testDao.deleteFromCart(cartId, shirtId));
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
