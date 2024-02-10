import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Narcoboli() {
  const {pathname} = useLocation();
  const navigate = useNavigate()

  console.log(pathname);

    const goCheckout = () => {
      navigate(`${pathname}/mercadopago`)
    }

  return <div>
    <h1>Tuturraca</h1>
    <button onClick={goCheckout}>Comprar</button>
  </div>;
}
