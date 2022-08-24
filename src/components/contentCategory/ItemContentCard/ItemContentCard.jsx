import React, { useContext } from "react";
import { useParams } from "react-router";
import { CategoryContext } from "../../context/CategoryContext";
import ItemListContainer from "../ItemCard/ItemCard";

export default function ContenCategory() {
  const { category } = useContext(CategoryContext);
  const { categoria } = useParams();
  const categoryFilter = category.filter((item) => item.category === categoria);
  return (
    <>
      <div className="containerCenter">
        <div className="containerCards">
          {categoryFilter.map((item) => (
            <ItemListContainer key={item.id} content={item} />
          ))}
        </div>
      </div>
    </>
  );
}
