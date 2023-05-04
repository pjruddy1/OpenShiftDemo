package com.BBTCarts.data;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.BBTCarts.models.Cart;

@Repository
public class CartDaoImpl implements CartDao {
	private JdbcTemplate jdbcTemplate;
	private static final Logger log = LoggerFactory.getLogger(CartDaoImpl.class);

	@Autowired
	public CartDaoImpl(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	private void handleError(Exception e, String message) {
		System.out.println(message);
		log.error(e.getMessage());
	}

	private static final class CartMapper implements RowMapper<Cart> {
		@Override
		public Cart mapRow(ResultSet rs, int index) throws SQLException {

			Cart c = new Cart();
			c.setCartId(rs.getInt("cartId"));
			c.setTotalPrice(rs.getDouble("totalPrice"));
			return c;
		}
	}

	private Cart mapRowToCart(SqlRowSet rowSet) {
		Cart cart = new Cart();
		cart.setCartId(rowSet.getInt("cartId"));
		cart.setTotalPrice(rowSet.getDouble("totalPrice"));

		return cart;
	}

	@Override
	@Transactional
	public boolean addToCart(int shirtId, int cartId) throws SQLException {
	    String sql = "INSERT INTO shirtsCart (shirtId, cartId) VALUES (?, ?)";
	    int rowsAffected = jdbcTemplate.update(new PreparedStatementCreator() {
	        @Override
	        public PreparedStatement createPreparedStatement(Connection con) throws SQLException {
	            PreparedStatement ps = con.prepareStatement(sql);
	            ps.setInt(1, shirtId);
	            ps.setInt(2, cartId);
	            return ps;
	        }
	    });

	    return rowsAffected > 0;
	}

	@Override
	@Transactional
	public Cart getCartById(int cartId) throws SQLException {
		try {
			String sql = "SELECT * from cart WHERE cartId = ?";
			SqlRowSet results = jdbcTemplate.queryForRowSet(sql, cartId);
			if (results.next()) {
				return mapRowToCart(results);
			} else {
				throw new SQLException();
			}
		} catch (SQLException se) {
			this.handleError(se, "Error fetching cart");
			return null;
		} catch (Exception e) {
			this.handleError(e, "Error fetching cart");
			return null;
		}
	}

	@Override
	@Transactional
	public Cart addCart() throws SQLException {
		String sql = "INSERT INTO cart (totalPrice) VALUE(0.0)";
		GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
		jdbcTemplate.update(new PreparedStatementCreator() {
			@Override
			public PreparedStatement createPreparedStatement(Connection con) throws SQLException {
				PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
				return ps;
			}
		}, keyHolder);
		int id = keyHolder.getKey().intValue();
		return getCartById(id);
	}

	@Override
	@Transactional
	public boolean deleteCartById(int cartId) {
		String sql = "DELETE FROM cart WHERE cartId = ?";
		try {
			int rowsAffected = jdbcTemplate.update(sql, cartId);
			if (rowsAffected > 0) {
				return true;
			} else {
				throw new SQLException();
			}
		} catch (SQLException se) {
			this.handleError(se, "Error deleting cart");
			return false;
		} catch (Exception e) {
			this.handleError(e, "Error deleting cart");
			return false;
		}
	}

	@Override
	@Transactional
	public boolean deleteFromCart(int shirtId, int cartId) {
		String sql = "DELETE FROM shirtsCart WHERE shirtId = ? AND cartId = ?";
		try {
			int rowsAffected = jdbcTemplate.update(new PreparedStatementCreator() {
		        @Override
		        public PreparedStatement createPreparedStatement(Connection con) throws SQLException {
		            PreparedStatement ps = con.prepareStatement(sql);
		            ps.setInt(1, shirtId);
		            ps.setInt(2, cartId);
		            return ps;
		        }
		    });
			
			return rowsAffected > 0;

		} catch (Exception e) {
			this.handleError(e, "Error deleting items from cart");
			return false;
		}
	}
	
	public List<Integer> getAllShirtIds(int cartId) {
        String sql = "SELECT shirtId FROM shirtsCart WHERE cartId = ?";
        return jdbcTemplate.query(sql, new Object[]{cartId}, new RowMapper<Integer>() {
            @Override
            public Integer mapRow(ResultSet rs, int rowNum) throws SQLException {
                return rs.getInt("shirtId");
            }
        });
    }

}
