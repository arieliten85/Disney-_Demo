import axios from "axios";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import useInput from "../../utils/customHook";
import Swal from "sweetalert2";

export default function Register() {
  const { mostrarAlerta, msg } = useContext(UserContext);
  const name = useInput();
  const password = useInput();
  const email = useInput();
  const navigate = useNavigate();

  const inputs = document.querySelectorAll("#formulario input");

  const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{3,40}$/,

    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    contraseña: /^[a-zA-Z0-9!@#$%^&*]{4,16}$/,
  };

  const validarFormulario = (e) => {
    switch (e.target.id) {
      case "nombre":
        if (!expresiones.nombre.test(e.target.value)) {
          document.getElementById("nombre").classList.remove("ok");
          document.getElementById("nombre").classList.add("err");
        } else {
          document.getElementById("nombre").classList.add("ok");
        }

        break;

      case "correo":
        if (!expresiones.correo.test(e.target.value)) {
          document.getElementById("correo").classList.remove("ok");
          document.getElementById("correo").classList.add("err");
        } else {
          document.getElementById("correo").classList.add("ok");
        }

        break;

      case "contraseña":
        if (!expresiones.contraseña.test(e.target.value)) {
          document.getElementById("contraseña").classList.remove("ok");
          document.getElementById("contraseña").classList.add("err");
        } else {
          document.getElementById("contraseña").classList.add("ok");
        }

        break;
    }
  };

  inputs.forEach((input) => {
    input.addEventListener("keyup", validarFormulario);
    input.addEventListener("blur", validarFormulario);
  });

  const handleRegister = (e) => {
    e.preventDefault();

    if ([name.value, email.value, password.value].includes("")) {
      mostrarAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    showLoading();

    axios
      .post("http://localhost:4000/api/users/register", {
        name: name.value,
        email: email.value,
        password: password.value,
      })
      .then(() => {
        Alerta("Successfully Registered User", "success");

        setTimeout(() => {
          navigate("/login");
        }, 4000);
      })
      .catch(() => {
        Alerta("Error Registered User", "error");
      });
  };

  const Alerta = (mensaje, stado) => {
    Swal.fire({
      icon: stado,
      title: mensaje,
      showConfirmButton: false,
      timer: 3500,
    });
  };

  const showLoading = () => {
    Swal.fire({
      title: "Loading...",
      allowOutsideClick: false,
      showConfirmButton: false,
      timer: 3500,
      willOpen: () => {
        Swal.showLoading();
      },
    });
  };

  return (
    <div className="containerCenter">
      <div className="register_Container">
        <form id="formulario" onSubmit={handleRegister}>
          <Link to={"/"}>
            <div className="container_logo">
              <div className="logo"></div>
            </div>
          </Link>

          <h1>Register Account</h1>

          <div className="container_info">
            <input
              id="nombre"
              name="name"
              type="text"
              placeholder="Name"
              {...name}
            />
            <input
              id="correo"
              name="email"
              type="email"
              placeholder="E-mail"
              {...email}
            />
            <input
              id="contraseña"
              name="password"
              type="password"
              placeholder="Password"
              {...password}
            />
            {!msg ? "" : <p className="error">{msg}</p>}
            <input
              className="button"
              type="submit"
              value="Register"
              onClick={() => {}}
            />
          </div>

          <p>
            If you have an account? click<Link to={"/Login"}> here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
