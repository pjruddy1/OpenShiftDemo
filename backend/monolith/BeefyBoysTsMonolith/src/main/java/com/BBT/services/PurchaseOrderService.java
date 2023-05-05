package com.BBT.services;

import java.sql.SQLException;
import java.util.List;

import com.BBT.models.PurchaseOrder;


public interface PurchaseOrderService {
	List<PurchaseOrder> getAllPurchaseOrders();

    public PurchaseOrder getPurchaseOrderById(int id);

    public PurchaseOrder createPurchaseOrder(PurchaseOrder purchaseOrder) throws SQLException;
    
    public PurchaseOrder updatePurchaseOrderById(PurchaseOrder purchaseOrder);
    
    public boolean deletePurchaseOrderById(int id);
}
