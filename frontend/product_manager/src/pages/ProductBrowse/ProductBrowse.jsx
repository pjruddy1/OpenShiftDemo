import { SearchBar } from "components/SearchBar/SearchBar";
import { ProductList } from "containers/ProductList/ProductList";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export function ProductBrowse(props) {
  const productList = useSelector((store) => store.productSlice.productList);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredProductList = productList.filter((product) => {
    const containsName = product.shirtName.toString()
      .trim()
      .toUpperCase()
      .includes(searchTerm.trim().toUpperCase());
    const containsTitle = product.shirtId.toString()
      .trim()
      .toUpperCase()
      .includes(searchTerm.trim().toUpperCase());
    const containsDetails = product.details.toString()
      .trim()
      .toUpperCase()
      .includes(searchTerm.trim().toUpperCase());
    const containsColor = product.color
      .trim()
      .toUpperCase()
      .includes(searchTerm.trim().toUpperCase());
      const containsSize = product.size
      .trim()
      .toUpperCase()
      .includes(searchTerm.trim().toUpperCase());
    return containsTitle || containsColor || containsSize || containsName || containsDetails;
  });
  return (
    <>
      <div className="row justify-content-center mb-5">
        <div className="col-sm-12 col-md-4">
          <SearchBar
            onTextChange={setSearchTerm}
            placeholder="Search Products..."
          />
        </div>
      </div>
      {productList?.length === 0 && (
        <div className="d-flex justify-content-center">
          <span>
            You don't have any products, do you want to{" "}
            <Link to="/product/new">create one</Link>
          </span>
        </div>
      )}
      <ProductList productList={filteredProductList} />
    </>
  );
}
