import React from "react";
import categoryPoster from "../../assets/categoryPoster.json";
import Header from "../../header/Header";
import ItemCardList from "../ItemListCategory/ItemListCategory";

export default function ItemContentCategory() {
  return (
    <>
      <Header />
      <div className="containerCenter">
        <div className="container_enlaces">
          <ul>
            <li>MUY PRONTO</li>
            <li>TENDENCIA</li>
            <li>MÁS EN STAR+</li>
          </ul>
        </div>
        <div className="containerCategory">
          {categoryPoster.map((item) => (
            <ItemCardList key={item.id} category={item} />
          ))}
        </div>
      </div>
    </>
  );
}
