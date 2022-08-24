import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import { AiFillHome } from "react-icons/ai";

import { BiSearchAlt2 } from "react-icons/bi";
import { GoDiffAdded } from "react-icons/go";
import { RiMovie2Line } from "react-icons/ri";
import { RiComputerLine } from "react-icons/ri";

import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

export default function Navbar() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const { setIsLoogedId, isAuthenticated } = useContext(UserContext);

  const navigate = useNavigate();

  window.addEventListener("scroll", menuChange);

  function menuChange() {
    let navegacion = document.querySelector("#navi");
    let suscribite = document.querySelector("#suscribite");
    let logo = document.querySelector("#logotipo");

    if (navegacion != null)
      navegacion.classList.toggle("fixed", window.scrollY > 200);
    if (suscribite != null)
      suscribite.classList.toggle("showSuscribite", window.scrollY > 200);
    if (logo != null) logo.classList.toggle("showLogo", window.scrollY > 200);
  }

  // window.addEventListener("scroll", logowach);

  // function logowach() {
  //   let logo = document.querySelector("#logotipo");

  //   logo.classList.toggle("showLogo", window.scrollY > 200);
  // }

  const handleClickLogOut = async () => {
    axios.post("http://localhost:4000/api/users/logout");
    localStorage.clear();

    setIsLoogedId({});
    navigate("/");
  };

  return (
    <nav className="nav_menu">
      <div id="navi" className={click ? "nav-menu active" : "nav-menu"}>
        <Link to={"/"}>
          <div className="container_logo">
            <div
              id={!isAuthenticated ? "logotipo" : ""}
              className={!isAuthenticated ? "logoNav" : "logoNavStatic"}
            ></div>
          </div>
        </Link>

        {isAuthenticated ? (
          <div className="container_enlaces_nav">
            <Link to={"/"}>
              <div className="item_Link">
                <AiFillHome />
                <li>HOME</li>
              </div>
            </Link>
            <div className="item_Link">
              <BiSearchAlt2 />
              <li>SEARCH</li>
            </div>

            <div className="item_Link">
              <GoDiffAdded />
              <li>WATCHLIST</li>
            </div>

            <div className="item_Link">
              <RiMovie2Line />
              <li>MOVIES</li>
            </div>
            <div className="item_Link">
              <RiComputerLine />
              <li>SERIES</li>
            </div>
          </div>
        ) : (
          ""
        )}

        {!isAuthenticated ? (
          <>
            <div className="container_button_sucri_log">
              <Link to={"/register"}>
                <p id="suscribite" className="button_suscribite">
                  SUSCRIBITE AHORA
                </p>
              </Link>
              <Link to={"/login"}>
                <p className="button_login">INICIAR SESIÓN</p>
              </Link>
            </div>
          </>
        ) : (
          <div className="container_logout">
            <button className="button_logOut" onClick={handleClickLogOut}>
              Logout
            </button>
          </div>
        )}
      </div>

      <div className="nav-icon" onClick={handleClick}>
        {click ? (
          <AiOutlineClose className="icon" />
        ) : (
          <FaBars className="icon" />
        )}
      </div>
    </nav>
  );
}
