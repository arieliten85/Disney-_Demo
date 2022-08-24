import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
export default function ItemCardList({ category }) {
  const { user } = useContext(UserContext);

  return (
    <>
      {user ? 
        <div className="card_category">
          <Link to={`category/${category.category}`}>
            <img
              src={`https://images.unsplash.com/photo-${category.poster_category}`}
              alt="Placeholder"
              className="cardCategory"
            />
          </Link>
        </div>
       : 
        <div className="card_category">
          <img
            src={`https://images.unsplash.com/photo-${category.poster_category}`}
            alt="Placeholder"
            className="cardCategory"
          />
        </div>
      } 
    </>
  );
}
