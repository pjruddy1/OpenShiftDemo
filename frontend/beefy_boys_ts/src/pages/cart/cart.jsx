import { CartList } from "containers/CartList/CartList";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";

export function Cart(props) {
  const cartList = useSelector((store) => store.cartSlice.setCartList);  
  console.log(`top cartlist inside cart Comp:  ${cartList}`);
  
  const [searchTerm, setSearchTerm] = useState("");
  const filteredCartList = cartList;

  console.log("cartlist inside cart Comp:  " + cartList);
  console.log("cartlist inside cart Comp:  " + filteredCartList);
  
  return (
    <>
      
      {cartList?.length === 0 && (
        <div className="d-flex justify-content-center">
          <span>
            You don't have any products, do you want to{" "}
            <Link to="/">browswe products</Link>
          </span>
        </div>
      )}
      <CartList cartList={filteredCartList} />
    </>
  );
}
