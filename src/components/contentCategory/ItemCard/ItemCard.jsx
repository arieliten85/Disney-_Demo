import React from "react";
import { Link } from "react-router-dom";

export default function ItemListContainer({ content }) {
  return (
    <Link to={`${content.id}`}>
      <div className="container_item_category">
        <img
          className="card_img_category"
          src={content.img}
          alt="Placeholder"
        />
      </div>
      <h1>{content.title.substring(0, 17)}</h1>
    </Link>
  );
}
