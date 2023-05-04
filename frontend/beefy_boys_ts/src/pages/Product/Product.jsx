import { CartPlusFill } from "react-bootstrap-icons"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart } from "store/cart/cart-slice";
import { removeFromCart } from "store/cart/cart-slice";
import s from "./style.module.css";

export function Product(props) {
  const { productId } = useParams();
  const product = useSelector((store) =>
    store.productSlice.productList.find((product) => product.id === productId)
    );
  const cart = useSelector((state) => state.cartSlice.cartList); // Get the current cart from the Redux store
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function removeProduct_(product) {
    if(window.confirm("Remove product from cart?")){
      
      dispatch(removeFromCart(product));
    }
  }

  async function addProduct_(product) {
    if (window.confirm("Add Product to Cart ?")) {
      dispatch(addToCart(product));
      if (window.confirm("Product added to cart, is this ok?")){
        navigate("/");

      } else {
        removeProduct_(product);
      }
    }
  }

  const actionIcons = (
    <>
      <div className="col-1">
        <CartPlusFill onClick={() => addProduct_(product)} className={s.icon} />
      </div>
    </>
  );

  return (
    <div className={s.container}>
      <div className="row justify-content-space-between">
        <div className="col-10">
          <h2 className="mb-3">{product.shirtName}</h2>
        </div>
        {actionIcons}
      </div>
      <div className="mb-2">
        {<pre>{product.shirtPrice}</pre>}
      </div>
      <div className="mb-3">
        {<pre>{product.details}</pre>}
      </div>
      <div className="mb-2">
        {<pre>{product.color}</pre>}
      </div>
      <div className="mb-3">
        {<pre>{product.size}</pre>}
      </div>
      <div className="mb-2">
        {<pre>{product.inventory}</pre>}
      </div>
    </div>
  );
}