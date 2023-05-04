import { ProductAPI } from "api/product";
import { ProductForm } from "components/ProductForm/ProductForm";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProduct } from "store/product/productsReducer";

export function ProductCreate(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async (formValues) => {
    const createdProduct = await ProductAPI.create({
      ...formValues
    });
    dispatch(addProduct(createdProduct));
    alert("The product has been created");
    navigate("/");
  };
  return (
    <>
      <ProductForm title="New Product" onSubmit={submit} />
    </>
  );
}
