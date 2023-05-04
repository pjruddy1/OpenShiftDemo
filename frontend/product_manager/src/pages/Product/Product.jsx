import { ProductAPI } from "api/product";
import { ProductForm } from "components/ProductForm/ProductForm";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteProduct, updateProduct } from "store/product/productsReducer";

export function Product(props) {
  const { productId } = useParams();
  const product = useSelector((store) =>
    store.productSlice.productList.find((product) => product.id === productId)
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isEditable, setIsEditable] = useState(false);

  const submit = async (formValues) => {
    const updatedProduct = await ProductAPI.updateById(product.id, formValues);
    dispatch(updateProduct(updatedProduct));
    alert("The product has been updated");
    navigate("/");
  };

  async function deleteProduct_() {
    if (window.confirm("Delete Product ?")) {
      ProductAPI.deleteById(product.id);
      dispatch(deleteProduct(product));
      navigate("/");
    }
  }
  return (
    <>
      {product && (
        <ProductForm
          isEditable={isEditable}
          shirtName={product.shirtName}
          shirtPrice={product.shirtPrice}
          size={ product.size}
          color={ product.color}
          detials={ product.detials}
          inventory={ product.inventory}
          product={product}
          onClickDelete={deleteProduct_}
          onClickEdit={() => setIsEditable(!isEditable)}
          onSubmit={isEditable && submit}
        />
      )}
    </>
  );
}
