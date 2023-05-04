import { Logo } from "components/Logo/Logo";
import s from "./style.module.css";
import logoSrc from "assets/images/logo.png";
import { ButtonPrimary } from "components/ButtonPrimary/ButtonPrimary";
import { useNavigate } from "react-router-dom";

export function Header(props) {
  const navigate = useNavigate();
  return (
    <div className={`row ${s.container}`}>
      <div className="col-xs-12 col-sm-4">
        <Logo
          onClick={() => navigate("/")}
          title="Beefy Boys Tz"
          subtitle={"Best Tz around"}
          image={logoSrc}
        />
      </div>
      <div className="col-xs-12 col-sm-4 text-end">
        <ButtonPrimary onClick={() => navigate("/product/new")}>
          Add Product +
        </ButtonPrimary>
      </div>
      <div className="col-xs-12 col-sm-4 text-end">
        <ButtonPrimary onClick={() => navigate("/purchaseOrders")}>
          Purchase Orders
        </ButtonPrimary>
      </div>
    </div>
  );
}
