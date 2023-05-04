import { useState } from "react";
import { Trash3Fill } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromCart } from "store/cart/cart-slice";
import s from "./style.module.css";

export function CartList() {
  const cart = useSelector((state) => state.cartSlice); // Get the current cart from the Redux store
  const [cardHoveredStates, setCardHoveredStates] = useState(
    cart.cartList.map(() => false)
  );
  const [trashHoveredStates, setTrashHoveredStates] = useState(
    cart.cartList.map(() => false)
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(`Cartlist in cartlist comp  : ${cart.cartList}`);

  async function deleteProduct_(product) {
    if (window.confirm("Delete Product ?")) {
      dispatch(removeFromCart(product));
    }
  }

  return (
    <div className={s.wrapper}>
    <div className={s.titleContainer}>
      <h2 className={s.title}>Here are your items</h2>
    </div>
          <div className={`card ${s.container}`}>
            <table className={`table ${s.container}`}>
          <thead>
            <tr>
              <th>Shirt Name</th>
              <th>Price</th>
              <th>Details</th>
              <th>Color</th>
              <th>Quantity</th>
              <th>Remove Item</th>
            </tr>
          </thead>
          <tbody>
            {cart.cartList.map((product, index) => (
              <tr
                key={product.id}
                className={s.row}
                style={{
                  borderColor: cardHoveredStates[index] ? "#0d6efd" : "transparent",
                }}
                onMouseEnter={() =>
                  setCardHoveredStates((prevState) =>
                    prevState.map((_, i) => i === index)
                  )
                }
                onMouseLeave={() =>
                  setCardHoveredStates((prevState) =>
                    prevState.map(() => false)
                  )
                }
              >
                <td>{product.shirtName}</td>
                <td>{product.shirtPrice}</td>
                <td>{product.details}</td>
                <td>{product.color}</td>
                <td>{product.count}</td>
                <td>
                  <Trash3Fill
                    size={30}
                    onMouseEnter={() =>
                      setTrashHoveredStates((prevState) =>
                        prevState.map((_, i) => i === index)
                      )
                    }
                    onMouseLeave={() =>
                      setTrashHoveredStates((prevState) =>
                        prevState.map(() => false)
                      )
                    }
                    style={{
                      color: trashHoveredStates[index] ? "#FF7373" : "#b8b8b8",
                    }}
                    onClick={() => deleteProduct_(product)}
                  />
                </td>
              </tr>
            ))}
             <tr className={s.totalRow}>
              <td colSpan="4"></td>
              <td>Total:</td>
              <td>{cart.total.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
            <button
              className={`btn btn-primary ${s.payButton}`}
              onClick={() => navigate('/billingShipping')}
            >
              Pay Here
      </button>
      </div>
    </div>
  );
}