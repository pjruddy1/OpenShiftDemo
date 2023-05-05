package com.BBT.models;

import java.io.Serializable;
import java.util.Objects;

public class PurchaseOrder implements Serializable{
	private int id;
	private String userAddress;
	private String userName;
	private Double total;
	private int cartId;

	public PurchaseOrder() {
		super();
		// TODO Auto-generated constructor stub
	}

	public PurchaseOrder(String userAddress, String userName, Double total, int cartId) {
		super();
		this.userAddress = userAddress;
		this.userName = userName;
		this.total = total;
		this.cartId = cartId;
	}
	
	public PurchaseOrder(int id, String userAddress, String userName, Double total, int cartId) {
		super();
		this.id = id;
		this.userAddress = userAddress;
		this.userName = userName;
		this.total = total;
		this.cartId = cartId;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUserAddress() {
		return userAddress;
	}

	public void setUserAddress(String userAddress) {
		this.userAddress = userAddress;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public Double getTotal() {
		return total;
	}

	public void setTotal(Double total) {
		this.total = total;
	}

	public int getCartId() {
		return cartId;
	}

	public void setCartId(int id) {
		this.cartId = id;
	}

	@Override
	public String toString() {
		return "PurchaseOrder [id=" + id + ", userAddress=" + userAddress + ", userName=" + userName + ", total="
				+ total + ", cart=" + cartId + "]";
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		PurchaseOrder other = (PurchaseOrder) obj;
		return id == other.id;
	}

}
