import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthorizationSuccessPage = ({ location }) => {
  const pathname = useSelector((state) => state.pathname);

  console.log(pathname);
  //declarar location aqui se puede ?

  useEffect(() => {
    // Extraer el código de autorización de la URL
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");
    console.log("aqui es un log actualizado", code);
    // Intercambiar el código de autorización por un token de acceso
    exchangeAuthorizationCodeForToken(code);
  }, [location.search]);

  const exchangeAuthorizationCodeForToken = async (code) => {
    try {
      const data = await axios.post(
        "http://localhost:3000/mercadopago-authorization/success",
        { code }
      );
      console.log("respuesta del back: ", data);
    } catch (error) {
      console.error("Error:", error.request);
    }

    // axios
    //   .post("http://localhost:3000/mercadopago-authorization/success", { code })
    //   .then((response) => {
    //     const { data } = response;
    //     console.log("respuesta del back: ", data);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error.request);
    //   });
  };

  return (
    <div>
      <h1>¡Bien ahi!</h1>
      <h2>Esta Redireccion pertenece a {pathname}</h2>
    </div>
  );
};

export default AuthorizationSuccessPage;
