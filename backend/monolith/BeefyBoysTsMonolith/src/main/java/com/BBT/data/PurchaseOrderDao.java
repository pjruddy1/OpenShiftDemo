package com.BBT.data;

import java.sql.SQLException;
import java.util.List;

import com.BBT.models.PurchaseOrder;


public interface PurchaseOrderDao {

    public List<PurchaseOrder> getAllPurchaseOrders();

    public PurchaseOrder getPurchaseOrderById(int orderId);

    public PurchaseOrder createPurchaseOrder(PurchaseOrder order) throws SQLException;
    
    public PurchaseOrder updatePurchaseOrderById(PurchaseOrder order);
    
    public boolean deletePurchaseOrderById(int orderId);

}
