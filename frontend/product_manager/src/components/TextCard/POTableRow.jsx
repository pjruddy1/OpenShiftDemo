import { useState } from "react";


export function POTableRow({ userName, userAddress, total, cartId, onClick }) {
  const [isRowHovered, setIsRowHovered] = useState(false);

  // function onClickEdit_(e) {
  //   if (window.confirm("Edit Purchase Order ?")) {
  //     // PurchaseOrderAPI.updateById(purchaseOrder.purchaseOrderId);
  //     // dispatch(updatePurchaseOrder(purchaseOrder));
  //     // navigate("/");
  //   }
  // }

  return (
    <tr
      onClick={onClick}
      style={{ cursor: 'pointer', backgroundColor: isRowHovered ? '#f8f9fa' : 'transparent' }}
      onMouseEnter={() => setIsRowHovered(true)}
      onMouseLeave={() => setIsRowHovered(false)}
    >
      <td>{userName}</td>
      <td>{userAddress}</td>
      <td>{total}</td>
      <td>{cartId}</td>
    </tr>
  );
}