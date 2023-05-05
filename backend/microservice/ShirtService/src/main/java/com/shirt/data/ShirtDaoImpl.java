package com.shirt.data;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import com.shirt.models.Shirt;

import java.sql.*;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Repository
public class ShirtDaoImpl implements ShirtDao{
    private final JdbcTemplate jdbcTemplate;
    private static final Logger log = LoggerFactory.getLogger(ShirtDaoImpl.class);

    @Autowired
    public ShirtDaoImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private void handleError(Exception e, String message) {
        System.out.println(message);
        log.error(e.getMessage());
    }

    private static final class ShirtMapper implements RowMapper<Shirt> {
        @Override
        public Shirt mapRow(ResultSet rs, int index) throws SQLException {
            Shirt s = new Shirt();
            s.setShirtId(rs.getInt("shirtId"));
            s.setShirtName(rs.getString("shirtName"));
            s.setShirtPrice(rs.getDouble("shirtPrice"));
            s.setDetails(rs.getString("details"));
            s.setColor(rs.getString("color"));
            s.setSize(rs.getString("size"));
            s.setInventory(rs.getInt("inventory"));
            return s;
        }
    }

    private Shirt mapRowToShirt(SqlRowSet rowSet) {
        Shirt shirt = new Shirt();
        shirt.setShirtId(rowSet.getInt("shirtId"));
        shirt.setShirtName(rowSet.getString("shirtName"));
        shirt.setShirtPrice(rowSet.getDouble("shirtPrice"));
        shirt.setDetails(rowSet.getString("details"));
        shirt.setColor(rowSet.getString("color"));
        shirt.setSize(rowSet.getString("size"));
        shirt.setInventory(rowSet.getInt("inventory"));

        return shirt;
    }

    @Override
    public List<Shirt> getAllShirts() {
        try {
            final String sql = "SELECT * FROM shirt;";
            Stream<Shirt> stream = jdbcTemplate.queryForStream(sql,
                    (rs, rowNum) -> new Shirt(rs.getInt("shirtId"), rs.getString("shirtName"),
                            rs.getDouble("shirtPrice"), rs.getString("details"), rs.getString("color"),
                            rs.getString("size"), rs.getInt("inventory")));
            List<Shirt> shirts = stream.collect(Collectors.toList());
            if (shirts.size() == 0) {
                throw new SQLException();
            }
            return shirts;
        }

        catch (SQLException se) {
            this.handleError(se, "Error fetching shirts");
            return null;
        } catch (Exception e) {
            this.handleError(e, "Error fetching shirts");
            return null;
        }
    }

    @Override
    public Shirt getShirtById(int shirtId) {
        try {

            Shirt shirt = null;
            String sql = "SELECT * from shirt WHERE shirtId = ?";
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, shirtId);

            if (results.next()) {
                return mapRowToShirt(results);
            } else {
                throw new SQLException();
            }

        }

        catch (SQLException se) {
            this.handleError(se, "Error fetching shirt");
            return null;
        } catch (Exception e) {
            this.handleError(e, "Error fetching shirt");
            return null;
        }
    }

    @Override
    public Shirt createShirt(Shirt shirt){
        final String sql = "INSERT INTO shirt (shirtName, shirtPrice, details, color, size, inventory)"
                + " Values(?,?,?,?,?,?)";
        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();

        try {
            jdbcTemplate.update((Connection conn) -> {
                PreparedStatement statement = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);

                statement.setString(1, shirt.getShirtName());
                statement.setDouble(2, shirt.getShirtPrice());
                statement.setString(3, shirt.getDetails());
                statement.setString(4, shirt.getColor());
                statement.setString(5, shirt.getSize());
                statement.setInt(6, shirt.getInventory());
                return statement;

            }, keyHolder);
            shirt.setShirtId((keyHolder.getKey().intValue()));
        }
        catch (Exception e) {
            System.out.println("One of the fields is missing a value or is incorrect");
            return null;
        }
        return shirt;
    }

    @Override
    public Shirt updateShirtById(Shirt shirt) throws SQLException {
        try {
            String sql = "UPDATE shirt SET shirtName = ?, shirtPrice = ?, details = ?, color = ?, size = ?, inventory = ? WHERE shirtId = ?";

            int rowsAffected = jdbcTemplate.update(sql, shirt.getShirtName(), shirt.getShirtPrice(), shirt.getDetails(),
                    shirt.getColor(), shirt.getSize(), shirt.getInventory(), shirt.getShirtId());

            if (rowsAffected > 0) {
                return getShirtById(shirt.getShirtId());
            } else {
                throw new SQLException();
            }
        } catch(SQLException se){
            System.out.println("Error Updating shirt");
            se.printStackTrace();
            return null;
        }catch(Exception e){
            System.out.println("Error Updating shirt");
            e.printStackTrace();
            return null;
        }

    }

    @Override
    public boolean deleteShirtById(int shirtId) {
        String sql = "DELETE FROM shirt WHERE shirtId = ?";
        try {
            int rowsAffected = jdbcTemplate.update(sql, shirtId);
            if (rowsAffected > 0) {
                return true;
            } else {
                throw new SQLException();
            }
        } catch (SQLException se) {
            this.handleError(se, "Error deleting shirts");
            return false;
        } catch (Exception e) {
            this.handleError(e, "Error deleting shirts");
            return false;
        }
    }
}
