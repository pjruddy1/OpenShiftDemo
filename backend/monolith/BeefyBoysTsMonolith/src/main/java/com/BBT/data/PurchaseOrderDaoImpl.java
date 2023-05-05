package com.BBT.data;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import com.BBT.models.PurchaseOrder;

import java.sql.*;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Repository
public class PurchaseOrderDaoImpl implements PurchaseOrderDao {

    private final JdbcTemplate jdbcTemplate;
	private static final Logger log = LoggerFactory.getLogger(PurchaseOrderDaoImpl.class);
 
	@Autowired
	public PurchaseOrderDaoImpl(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	private void handleError(Exception e, String message) {
		System.out.println(message);
		log.error(e.getMessage());
	}


	private static final class PurchaseOrderMapper implements RowMapper<PurchaseOrder> {
		@Override
		public PurchaseOrder mapRow(ResultSet rs, int index) throws SQLException {
            PurchaseOrder order = new PurchaseOrder();
            order.setId(rs.getInt("purchaseOrderId"));
            order.setUserAddress(rs.getString("userAddress"));
            order.setUserName(rs.getString("userName"));
            order.setTotal(rs.getDouble("total"));
            order.setCartId(rs.getInt("cartId"));
			return order;
		}
	}

	private PurchaseOrder mapRowToPurchaseOrder(SqlRowSet rowSet) {
		PurchaseOrder order = new PurchaseOrder();
		order.setId(rowSet.getInt("purchaseOrderId"));
		order.setUserAddress(rowSet.getString("userAddress"));
		order.setUserName(rowSet.getString("userName"));
		order.setTotal(rowSet.getDouble("total"));
		order.setCartId(rowSet.getInt("cartId"));


		return order;
	}

	@Override
	public List<PurchaseOrder> getAllPurchaseOrders() {
		try {
			final String sql = "SELECT * FROM purchase_order";
			Stream<PurchaseOrder> stream = jdbcTemplate.queryForStream(sql,
					(rs, rowNum) -> new PurchaseOrder(rs.getInt("purchaseOrderId"), rs.getString("userAddress"),
							rs.getString("userName"), rs.getDouble("total"), rs.getInt("cartId")));
			List<PurchaseOrder> orders = stream.collect(Collectors.toList());
			if (orders.size() == 0) {
				throw new SQLException();
			}
			return orders;
		}

		catch (SQLException se) {
			this.handleError(se, "Error fetching Purchase Orders");
			return null;
		} catch (Exception e) {
			this.handleError(e, "Error fetching Purchase Orders");
			return null;
		}
	}

	@Override
	public PurchaseOrder getPurchaseOrderById(int orderId) {
		try {

			PurchaseOrder order = null;
			String sql = "SELECT * from purchase_order WHERE purchaseOrderId = ?";
			SqlRowSet results = jdbcTemplate.queryForRowSet(sql, orderId);

			if (results.next()) {
				return mapRowToPurchaseOrder(results);
			} else {
				throw new SQLException();
			}

		}

		catch (SQLException se) {
			this.handleError(se, "Error fetching Purchase Order");
			return null;
		} catch (Exception e) {
			this.handleError(e, "Error fetching Purchase Order");
			return null;
		}
	}

	@Override
	public PurchaseOrder createPurchaseOrder(PurchaseOrder order) throws SQLException {
		final String sql = "INSERT INTO purchase_order (userAddress, userName, total, cartId)"
				+ " Values(?,?,?,?)";
		GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();

		try {
			if (order.getUserAddress() == "" || order.getUserName() == ""
					|| order.getTotal() < 0) {
				throw new SQLException();
			}
			jdbcTemplate.update((Connection conn) -> {
				PreparedStatement statement = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);

				statement.setString(1, order.getUserAddress());
				statement.setString(2, order.getUserName());
				statement.setDouble(3, order.getTotal());
				statement.setInt(4, order.getCartId());
				return statement;

			}, keyHolder);
			order.setId((keyHolder.getKey().intValue()));
		} catch (SQLException e) {
			this.handleError(e, "One of the fields is missing a value or is incorrect");
			return null;
		}

		return order;
	}

	@Override
	public PurchaseOrder updatePurchaseOrderById(PurchaseOrder order) {
		try {
			String sql = "UPDATE purchase_order SET userAddress = ?, userName = ?, total = ?, cartId = ? WHERE purchaseOrderId = ?";

            if (order.getUserAddress() == "" || order.getUserName() == ""
                    || order.getTotal() < 0) {
                throw new SQLException();
            }

			int rowsAffected = jdbcTemplate.update(sql, order.getUserAddress(), order.getUserName(), order.getTotal(),
					order.getCartId());

			if (rowsAffected > 0) {
				return getPurchaseOrderById(order.getId());
			} else {
				throw new SQLException();
			}
		}

		catch (SQLException se) {
			this.handleError(se, "Error updating Purchase Order");
			return null;
		} catch (Exception e) {
			this.handleError(e, "Error updating Purchase Order");
			return null;
		}

	}

	@Override
	public boolean deletePurchaseOrderById(int orderId) {
		String sql = "DELETE FROM purchase_order WHERE orderId = ?";
		try {
			int rowsAffected = jdbcTemplate.update(sql, orderId);
			if (rowsAffected > 0) {
				return true;
			} else {
				throw new SQLException();
			}

		}

		catch (SQLException se) {
			this.handleError(se, "Error deleting Purchase Order");
			return (Boolean) null;
		} catch (Exception e) {
			this.handleError(e, "Error deleting Purchase Order");
			return (Boolean) null;
		}

	}




}
