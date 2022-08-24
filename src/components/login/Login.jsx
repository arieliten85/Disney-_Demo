import axios from "axios";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import useInput from "../../utils/customHook";
import { UserContext } from "../context/UserContext";
import Swal from "sweetalert2";

export default function Login() {
  const { toggleAuth, mostrarAlerta, msg } = useContext(UserContext);
  const navigate = useNavigate();
  const password = useInput();
  const email = useInput();

  const inputs = document.querySelectorAll("#formulario input");
  const expresiones = {
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    contraseña: /^[a-zA-Z0-9!@#$%^&*]{4,16}$/, // 4 a 12 digitos.
  };

  const validarFormulario = (e) => {
    switch (e.target.id) {
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

  const Alerta = (mensaje, stado, subMensaje) => {
    Swal.fire({
      icon: stado,
      title: mensaje,
      text: subMensaje,
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

  const handleLogin = (e) => {
    e.preventDefault();

    if ([email.value, password.value].includes("")) {
      mostrarAlerta({
        msg: "All fields are required",
        error: true,
      });
      return;
    }
    showLoading();
    axios
      .post("http://localhost:4000/api/users/login", {
        email: email.value,
        password: password.value,
      })
      .then((resp) => {
        toggleAuth(resp.data);
        Alerta("Successful operation", "success", "It's nice to have you back");

        setTimeout(() => {
          navigate("/");
        }, 4000);
      })

      .catch((err) => {
        Alerta("Error starting section, Please check your data", "error");
        document.getElementById("correo").classList.remove("ok");
        document.getElementById("contraseña").classList.remove("ok");
        mostrarAlerta({
          msg: "Please check the data entered",
          error: true,
        });
      });
  };

  return (
    <div className="containerCenter">
      <div className="Login_Container">
        <form id="formulario" onSubmit={handleLogin}>
          <Link to={"/"}>
            <div className="container_logo">
              <div className="logo"></div>
            </div>
          </Link>

          <div>
            <h1>Iniciar sesión con tu correo</h1>
          </div>
          <div className="container_info">
            <input id="correo" type="email" placeholder="E-mail" {...email} />
            <input
              id="contraseña"
              type="password"
              placeholder="Password"
              {...password}
            />
            {!msg ? "" : <p className="error">{msg}</p>}
            <input className="button" type="submit" value="CONTINUAR" />
          </div>
          <p>
            ¿Primera vez en Disney+?{" "}
            <Link to={"/register"}>
              <span>Suscribite</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
