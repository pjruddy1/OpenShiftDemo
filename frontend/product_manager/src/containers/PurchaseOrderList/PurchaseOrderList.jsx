import { POTableRow } from "components/TextCard/POTableRow";
import { useNavigate } from "react-router-dom";
import { CartAPI } from "api/cart";
import { useSelector } from "react-redux";
import { addToCart, setCartId } from "store/cart/cartReducer";
import { useDispatch } from "react-redux";

import s from "./style.module.css";

export function PurchaseOrderList({ purchaseOrderList }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productList = useSelector((store) => store.productSlice.productList);
  console.log("Product List from Redux store:", productList);

  async function handleOnClick(purchaseOrder) {
    const shirtIds = await CartAPI.getAllShirtIds(purchaseOrder.cartId);
    console.log("Shirt IDs from Cart API:", shirtIds);

    const cartItems = shirtIds.map((shirtId) => {
      const product = productList.find((product) => product.shirtId === shirtId);
      if (product) {
        return product;
      }
      return null;
    }).filter(item => item !== null);

    dispatch(setCartId(purchaseOrder.cartId));
    cartItems.forEach(item => {
      dispatch(addToCart(item));
    });

    navigate('purchaseOrder/' + purchaseOrder.id);
  }

  return (
    <div className={s.table_container}>
      <table className={`table ${s.table}`}>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col">Total</th>
            <th scope="col">Cart ID</th>
          </tr>
        </thead>
        <tbody>
          {purchaseOrderList.map((purchaseOrder) => (
            <POTableRow
              key={purchaseOrder.id}
              userName={purchaseOrder.userName}
              userAddress={purchaseOrder.userAddress}
              total={purchaseOrder.total}
              cartId={purchaseOrder.cartId}
              onClick={() => handleOnClick(purchaseOrder)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}