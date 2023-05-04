import { ProductAPI } from "api/product";
import { TextCard } from "components/TextCard/TextCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "store/product/productsReducer";
import s from "./style.module.css";

export function ProductList({ productList }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function deleteProduct_(product) {
    if (window.confirm("Delete Product ?")) {
      ProductAPI.deleteById(product.shirtId);
      dispatch(deleteProduct(product));
      navigate("/");
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
            onClickTrash={() => deleteProduct_(product)}
            onClick={() => navigate("product/" + product.shirtId)}
          />
        </div>
      ))}
    </div>
  );
}
