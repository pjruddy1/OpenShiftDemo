
import { useDispatch, useSelector } from "react-redux";
import {  useParams } from "react-router-dom";
import s from "./style.module.css";

export function PurchaseOrder() {
  const { id } = useParams();

const purchaseOrder = useSelector((store) =>
store.purchaseOrderSlice.purchaseOrderList.find((purchaseOrder) => purchaseOrder.id === id)
);
console.log("Purchase Order from Redux store:", purchaseOrder);

const cart = useSelector((store) => store.cartSlice);
console.log("Cart from Redux store:", cart);
 
  // const submit = async (formValues) => {
  //   const updatedPurchaseOrder = await PurchaseOrderAPI.updateById(purchaseOrder.id, formValues);
  //   dispatch(updatePurchaseOrder(updatedPurchaseOrder));
  //   alert("The purchase order has been updated");
  //   navigate("/");
  // };

  return (
    <div className={s.purchaseorderwrapper}>
      <h2>Purchase Order Details</h2>
      <div className={s.purchaseordersection}>
        <h3>Shipping Information</h3>
        <p>Name: {purchaseOrder?.userName}</p>
        <p>Address: {purchaseOrder?.userAddress}</p>
        <p>Total: {purchaseOrder?.total}</p>
      </div>
      <div className={s.purchaseordersection}>
        <h3>Ordered Items</h3>
        <table className={`table ${s.table}`}>
          <thead>
            <tr>
              <th>Shirt Name</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {cart?.cartList.map((item) => (
              <tr key={item.id}>
                <td>{item.shirtName}</td>
                <td>{item.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}