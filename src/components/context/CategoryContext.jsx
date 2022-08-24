import axios from "axios";
import React, { useEffect } from "react";
import { createContext, useState } from "react";

export const CategoryContext = createContext();

const CategoryContextProvider = ({ children }) => {
  const [category, setCategory] = useState([]);
  const [contentSelec, setContentSelec] = useState([]);

  useEffect(() => {
    axios
      .get("https://630404fb761a3bce77e2380a.mockapi.io/contents")
      .then((resp) => {
        setCategory(resp.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        category,
        setContentSelec,
        contentSelec,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContextProvider;
