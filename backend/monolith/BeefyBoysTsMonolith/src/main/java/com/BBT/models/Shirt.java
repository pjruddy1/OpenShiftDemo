package com.BBT.models;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name="shirt")
public class Shirt implements Serializable {

    @Id
    @Column(name="shirtId")
    private int shirtId;
    private String shirtName;
    private double shirtPrice;
    private String details;
    private String color;
    private String size;
    private int inventory;

    public Shirt() {
    }

    public Shirt(int shirtId, String shirtName, double shirtPrice, String details, String color, String size, int inventory) {
        this.shirtId = shirtId;
        this.shirtName = shirtName;
        this.shirtPrice = shirtPrice;
        this.details = details;
        this.color = color;
        this.size = size;
        this.inventory = inventory;
    }

    public int getShirtId() {
        return shirtId;
    }

    public void setShirtId(int shirtId) {
        this.shirtId = shirtId;
    }

    public String getShirtName() {
        return shirtName;
    }

    public void setShirtName(String shirtName) {
        this.shirtName = shirtName;
    }

    public double getShirtPrice() {
        return shirtPrice;
    }

    public void setShirtPrice(double shirtPrice) {
        this.shirtPrice = shirtPrice;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public int getInventory() {
        return inventory;
    }

    public void setInventory(int inventory) {
        this.inventory = inventory;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Shirt shirt = (Shirt) o;
        return shirtId == shirt.shirtId && Double.compare(shirt.shirtPrice, shirtPrice) == 0 && inventory == shirt.inventory && shirtName.equals(shirt.shirtName) && details.equals(shirt.details) && color.equals(shirt.color) && size.equals(shirt.size);
    }

    @Override
    public int hashCode() {
        return Objects.hash(shirtId, shirtName, shirtPrice, details, color, size, inventory);
    }

    @Override
    public String toString() {
        return "Shirt{" +
                "shirtId=" + shirtId +
                ", shirtName='" + shirtName + '\'' +
                ", shirtPrice=" + shirtPrice +
                ", details='" + details + '\'' +
                ", color='" + color + '\'' +
                ", size='" + size + '\'' +
                ", inventory=" + inventory +
                '}';
    }
}
