import React from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';


export default function AuthMP() {

  const navigate = useNavigate();

  const redirectUri ="https://testmp-ro6r.onrender.com/mercadopago-authorization/success"; // Reemplaza con tu URL de redirección


  const clientId = "203586994908608"; // Reemplaza con tu ID de cliente de MercadoPago

  const authorizationUrl = `https://auth.mercadopago.com/authorization?client_id=${clientId}&response_type=code&platform_id=mp&state=${state}&redirect_uri=${redirectUri}`;

  const authorization = (clientId, redirectUri) => {
    const state = uuidv4();
    const authorizationUrl = `https://auth.mercadopago.com/authorization?client_id=${clientId}&response_type=code&platform_id=mp&state=${state}&redirect_uri=${redirectUri}`;
    navigate(authorizationUrl);
    // return authorizationUrl;
  };

  return (
    <div>
      <button onClick={authorization}>authMP</button>
    </div>
  );
}

// function authorization(clientId, redirectUri) {
//   // Genera un ID único para el estado
//   const state = uuidv4();

//   const authorizationUrl = `https://auth.mercadopago.com/authorization?client_id=${clientId}&response_type=code&platform_id=mp&state=${state}&redirect_uri=${redirectUri}`;

//   return authorizationUrl;
// }

// // Ejemplo de uso
// const clientId = "TU_CLIENT_ID"; // Reemplaza con tu ID de cliente de MercadoPago
// const redirectUri =
//   "https://testmp-ro6r.onrender.com/mercadopago-authorization/success"; // Reemplaza con tu URL de redirección

// const authorizationUrl = generateAuthorizationUrl(clientId, redirectUri);
// console.log("URL de autorización de MercadoPago:", authorizationUrl);
