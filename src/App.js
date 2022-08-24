import * as React from "react";
import "./styles/scss/app.scss";
//import { Route, Routes } from "react-router";
import Navbar from "./components/navbar/Navbar";
//import Home from "./components/navbar/Home";
import { Route, Routes } from "react-router";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import UserContext from "./components/context/UserContext";

import ContenCategory from "./components/contentCategory/ItemContentCard/ItemContentCard";
import CategoryContext from "./components/context/CategoryContext";
import ContentDetail from "./components/ContentDetail/ContentDetail";
import ItemContentCategory from "./components/contentCategory/ItemContentCategory/ItemContentCategory";

function App() {
  return (
    <>
      <CategoryContext>
        <UserContext>
          <Navbar />
          <Routes>
            <Route path="/" element={<ItemContentCategory />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="category/:categoria" element={<ContenCategory />} />
            <Route path="category/:categoria/:id" element={<ContentDetail />} />
          </Routes>
        </UserContext>
      </CategoryContext>
    </>
  );
}

export default App;
