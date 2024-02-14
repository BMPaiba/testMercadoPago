import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import style from "./Home.module.css";

export default function Home() {
  const navigate = useNavigate();

  const goCheckout = () => {
    navigate("/admin");
  };

  return (
    <div className={style.container}>
      <h1>Home</h1>
      <button className={style.button} onClick={goCheckout}>ingresar a boliche</button>
    </div>
  );
}
