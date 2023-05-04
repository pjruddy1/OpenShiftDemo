
import { TextCard } from "components/TextCard/TextCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "store/cart/cart-slice";
import s from "./style.module.css";

export function ProductList({ productList }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartSlice.cartList); // Get the current cart from the Redux store

  async function addProduct_(product) {
    if (window.confirm("Add Product to Cart ?")) {
      console.log(product);
      console.log(cart);
      dispatch(addToCart(product));
    }
  }

  return (
    <div className={`row justify-content-center ${s.cards_container}`}>
      {productList.map((product) => (
        <div key={product.shirtId} className={s.card_container}>
          <TextCard
            title={product.shirtName}
            shirtPrice={product.shirtPrice}
            content={product.details}
            color={product.color}
            inventory={product.inventory}
            onClickCart={() => addProduct_(product)}
            onClick={() => navigate("product/" + product.shirtId)}
          />
        </div>
      ))}
    </div>
  );
}
