import "./index.css";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import { StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProductBrowse } from "pages/ProductBrowse/ProductBrowse";
import { Product } from "pages/Product/Product";
import { PageNotFound } from "pages/PageNotFound/PageNotFound";
import { Cart } from "pages/cart/cart"
import { App } from "App";
import Demo from "pages/demo/demo"
import { BillingShipping } from "components/Address/BillingShipping";
import { Confirmation } from "components/Confirmation/Confirmation";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<ProductBrowse />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/cart/cart" element={<Cart />} />
            <Route path="/billingShipping" element={<BillingShipping />} />
            <Route path="demo/demo" element={<Demo />} />
            <Route path="/confirmation" element={<Confirmation />} />
		
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
