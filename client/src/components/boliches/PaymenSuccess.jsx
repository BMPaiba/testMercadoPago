import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

export default function PaymenSuccess() {
  const path = localStorage.getItem("pathname");
  console.log(path);
  const location = useLocation();
  const urlParams = new URLSearchParams(window.location.search);
  const paymentId = urlParams.get("payment_id");

 
  useEffect(() => {
    // Aquí puedes realizar alguna acción con el dato de la URL
    console.log('Dato de la URL:', datoDeUrl);
  }, [datoDeUrl]); // Se ejecutará cada vez que datoDeUrl cambie

  return (
    <div>
      <h2>Componente que obtiene datos de la URL</h2>
      <p>Dato de la URL: {datoDeUrl}</p>
    </div>
  );
}