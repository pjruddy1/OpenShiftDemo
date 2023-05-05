package com.BBT.services;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.BBT.data.PurchaseOrderDao;
import com.BBT.models.PurchaseOrder;


@Service
public class PurchaseOrderServiceImpl implements PurchaseOrderService {
	private PurchaseOrderDao dao;
	
	
	@Autowired
	public PurchaseOrderServiceImpl(PurchaseOrderDao dao) {
		super();
		this.dao = dao;
	}

	@Override
	public List<PurchaseOrder> getAllPurchaseOrders() {
		List<PurchaseOrder> orders = dao.getAllPurchaseOrders();
		return orders;
	}

	@Override
	public PurchaseOrder getPurchaseOrderById(int id) {
		PurchaseOrder order = dao.getPurchaseOrderById(id);
		return order;
	}

	@Override
	public PurchaseOrder createPurchaseOrder(PurchaseOrder purchaseOrder) throws SQLException {
		PurchaseOrder order = dao.createPurchaseOrder(purchaseOrder);
		return order;
	}

	@Override
	public PurchaseOrder updatePurchaseOrderById(PurchaseOrder purchaseOrder) {
		PurchaseOrder order = updatePurchaseOrderById(purchaseOrder);
		return order;
	}

	@Override
	public boolean deletePurchaseOrderById(int id) {
		boolean deleted = deletePurchaseOrderById(id);
		return deleted;
	}

}
