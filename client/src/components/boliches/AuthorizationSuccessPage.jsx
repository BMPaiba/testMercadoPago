import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthorizationSuccessPage = ({ location }) => {


  const path = localStorage.getItem("pathname");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");
    console.log("aqui es un log actualizado", code);
    exchangeAuthorizationCodeForToken(code);
  }, [location.search]);


  const exchangeAuthorizationCodeForToken = async (code) => {
    try {
      console.log('entrando');
      const {data} = await axios.post(
        "http://localhost:3000/mercadopago-authorization/success",
        { code , path }
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
      <h2>Esta Redireccion pertenece a {path}</h2>
    </div>
  );
};

export default AuthorizationSuccessPage;
