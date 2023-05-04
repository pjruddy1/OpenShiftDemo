import "./index.css";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import { StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProductBrowse } from "pages/ProductBrowse/ProductBrowse";
import { ProductCreate } from "pages/ProductCreate/ProductCreate";
import { PurchaseOrderBrowse } from "pages/PurchaseOrderBrowse/PurchaseOrderBrowse";
import { Product } from "pages/Product/Product";
import { PurchaseOrder } from "pages/PurchaseOrder/PurchaseOrder";
import { PageNotFound } from "pages/PageNotFound/PageNotFound";
import { App } from "App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/purchaseOrders" element={<PurchaseOrderBrowse />} />
            <Route path="purchaseOrders/purchaseOrder/:id" element={<PurchaseOrder />} />
            <Route path="/" element={<ProductBrowse />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/product/new" element={<ProductCreate />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
