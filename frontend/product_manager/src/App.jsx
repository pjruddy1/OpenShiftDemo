import { ProductAPI } from "api/product";
import { PurchaseOrderAPI } from "api/purchaseOrder";
import { Header } from "components/Header/Header";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { clearCart } from "store/cart/cartReducer";
import { setProductList } from "store/product/productsReducer";
import { setPurchaseOrderList } from "store/purchaseOrder/purchaseOrderReducer";
import { useCallback } from 'react';

export function App() {
  const dispatch = useDispatch();

  const fetchProducts = useCallback(async () => {
    const productList = await ProductAPI.fetchAll();
    dispatch(setProductList(productList));
    console.log(productList);
  }, [dispatch]);

  const setCart = useCallback(async () => {
    dispatch(clearCart());
  }, [dispatch]);

  const fetchPurchaseOrders = useCallback(async () => {
    const purchaseOrderList = await PurchaseOrderAPI.fetchAll();
    dispatch(setPurchaseOrderList(purchaseOrderList));
    console.log(purchaseOrderList);
  }, [dispatch]);

  useEffect(() => {
    fetchProducts();
    fetchPurchaseOrders();
    setCart();
  }, [fetchProducts, fetchPurchaseOrders, setCart]);

  return (
    <div>
      <Header />
      <div style={{ padding: 50 }}>
        <Outlet />
      </div>
    </div>
  );
}