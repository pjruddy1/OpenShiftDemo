import { useState } from "react";
import { Cart, CartPlusFill } from "react-bootstrap-icons";
import s from "./style.module.css";

export function TextCard({ title, shirtPrice, content, color,  shirtName, onClick, onClickCart, inventory }) {
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isCartHovered, setIsCartHovered] = useState(false);

  function onClickCart_(e) {
    onClickCart();
    e.stopPropagation();
  }
  return (
    <div
      onClick={onClick}
      className={`card ${s.container}`}
      style={{ borderColor: isCardHovered ? "#0d6efd" : "transparent" }}
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
    >
      <div className="card-body">
        <div className={s.title_row}>
          <h5 className="card-title">{title}</h5>
          <CartPlusFill
            size={20}
            onMouseEnter={() => setIsCartHovered(true)}
            onMouseLeave={() => setIsCartHovered(false)}
            style={{ color: isCartHovered ? "#FF7373" : "#b8b8b8" }}
            onClick={onClickCart_}
          />
        </div>
        <h6>{shirtPrice}</h6>
        <h6>{shirtName}</h6>
        <p>{content}</p>
        <p>{color}</p>
        <p>{inventory}</p>
      </div>
    </div>
  );
}
