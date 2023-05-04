import { SearchBar } from "components/SearchBar/SearchBar";
import { PurchaseOrderList } from "containers/PurchaseOrderList/PurchaseOrderList";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export function PurchaseOrderBrowse(props) {
  const purchaseOrderList = useSelector((store) => store.purchaseOrderSlice.purchaseOrderList);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredPurchaseOrderList = purchaseOrderList.filter((purchaseOrder) => {
    const containsName = purchaseOrder.userName
      .trim()
      .toUpperCase()
      .includes(searchTerm.trim().toUpperCase());
    const containsAddress = purchaseOrder.userAddress
      .trim()
      .toUpperCase()
      .includes(searchTerm.trim().toUpperCase());
    const containsTotal = purchaseOrder.total.toString()
      .trim()
      .toUpperCase()
      .includes(searchTerm.trim().toUpperCase());
    const containsId = purchaseOrder.id.toString()
      .trim()
      .toUpperCase()
      .includes(searchTerm.trim().toUpperCase());
      const containsCartId = purchaseOrder.cartId.toString()
      .trim()
      .toUpperCase()
      .includes(searchTerm.trim().toUpperCase());
    return containsAddress || containsTotal || containsId || containsName || containsCartId;
  });
  return (
    <>
      <div className="row justify-content-center mb-5">
        <div className="col-sm-12 col-md-4">
          <SearchBar
            onTextChange={setSearchTerm}
            placeholder="Search PurchaseOrders..."
          />
        </div>
      </div>
      {purchaseOrderList?.length === 0 && (
        <div className="d-flex justify-content-center">
          <span>
             The are currently no orders, you should try and sell more :\ !
          </span>
        </div>
      )}
      <PurchaseOrderList purchaseOrderList={filteredPurchaseOrderList} />
    </>
  );
}