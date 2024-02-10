import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Narcoboli() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const url = "http://localhost:3000/url";
  const url2 = 'http://localhost:3000/create_preference'

  const pathToSend = pathname.startsWith("/") ? pathname.substring(1) : pathname;

  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.post(url, { pathToSend });
    } catch (error) {
      console.error("Error al enviar la solicitud al servidor:", error);
    }
  };

  const goCheckout = async () => {
    await fetchData(); // Llama a la función fetchData antes de navegar a la nueva página
    console.log('hizo clic');
    navigate(`${pathname}/mercadopago`);
  };


  return (
    <div>
      <h1>Narcoboli</h1>
      <button onClick={goCheckout}>Comprar</button>
    </div>
  );
} 
