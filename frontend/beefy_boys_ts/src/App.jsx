
import { ProductAPI } from "api/product";
import { CartAPI } from "api/cart";
import { Header } from "components/Header/Header";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { setProductList } from "store/product/product-slice";
import { setCartId } from "store/cart/cart-slice";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51MxsIbLtt6L2H0ODLmjE93ny0JgMyDqLD72lN6LJsgBHPH6TmbkWNaAKZ90nP6fHOe8S7BfNrCF1A3tDDocQ6nx700anQ6f0Lu");

export function App() {
  const dispatch = useDispatch();

  async function fetchProducts() {
    const productList = await ProductAPI.fetchAll();
    dispatch(setProductList(productList));

    console.log("productList inside App Comp:  " + JSON.stringify(productList));
  }

  async function fetchCart() {
    const cart = await CartAPI.createCart();
    dispatch(setCartId(cart));

    console.log("Cart ID of cartslice  " + JSON.stringify(cart.cartId));
  }

  useEffect(() => {
    fetchProducts();   
  }, []);

  useEffect(() => {
    fetchCart();    
  }, []);

  return (
    <Elements stripe={stripePromise}>
    <div>
      <Header />
      <div className="p-sm-5">
        <Outlet />
      </div>
    </div>
    </Elements>    
  );
}

