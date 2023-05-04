import { useState } from "react";
import { Trash } from "react-bootstrap-icons";
import s from "./style.module.css";

export function TextCard({ title, shirtPrice, content, color,  shirtName, onClick, onClickTrash, inventory }) {
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isTrashHovered, setIsTrashHovered] = useState(false);

  function onClickTrash_(e) {
    onClickTrash();
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
          <Trash
            size={20}
            onMouseEnter={() => setIsTrashHovered(true)}
            onMouseLeave={() => setIsTrashHovered(false)}
            style={{ color: isTrashHovered ? "#FF7373" : "#b8b8b8" }}
            onClick={onClickTrash_}
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
