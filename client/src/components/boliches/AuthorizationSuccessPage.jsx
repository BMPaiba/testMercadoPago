import React, { useEffect, useState } from "react";
import axios from "axios";

const AuthorizationSuccessPage = ({ location }) => {
  //declarar location aqui se puede ?
  const [code, setCode] = useState(null);

  useEffect(() => {
    // Extraer el código de autorización de la URL
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");
    console.log("aqui es un log", code);
    // Intercambiar el código de autorización por un token de acceso
    exchangeAuthorizationCodeForToken(code);
  }, [location.search]);

  const exchangeAuthorizationCodeForToken = async (code) => {
    const clientId = "203586994908608"; // Reemplaza con tu ID de cliente de MercadoPago
    const clientSecret = "vjylCFehLLuAxqZDzTJf5zPoQRHDHEhO"; // Reemplaza con tu secreto de cliente de MercadoPago
    const redirectUri =
      "https://mercadopago-7p1q.onrender.com/mercadopago-authorization/success"; // Reemplaza con tu URL de redirección

    const data = {
      grant_type: "authorization_code",
      client_id: clientId,
      client_secret: clientSecret,
      code: code,
      redirect_uri: redirectUri,
    };

    try {
      const response = await axios.post(
        "https://api.mercadopago.com/oauth/token",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const accessToken = response.data.access_token;
      console.log("Token de acceso:", accessToken);
    } catch (error) {
        console.log(error);
    //   if (error.response) {
    //     console.error(
    //       "Error en la respuesta del servidor:",
    //       error.response.data
    //     );
    //   } else if (error.request) {
    //     console.error("Error en la solicitud:", error.request);
    //   } else {
    //     console.error("Error general:", error.message);
    //   }
    }
  };

  return (
    <div>
      <h1>¡Autorización exitosa!</h1>
      {/* Puedes agregar cualquier contenido adicional que desees mostrar en esta página */}
    </div>
  );
};

export default AuthorizationSuccessPage;

// const axios = require('axios');

// const exchangeAuthorizationCodeForToken = async (clientId, clientSecret, code) => {
//   const data = {
//     client_id: clientId,
//     client_secret: clientSecret,
//     code: code,
//     grant_type: 'authorization_code'
//   };

//   try {
//     const response = await axios.post('https://api.mercadopago.com/oauth/token', data, {
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });

//     const accessToken = response.data.access_token;
//     console.log("Token de acceso:", accessToken);
//     // Realizar cualquier acción necesaria con el token de acceso
//   } catch (error) {
//     if (error.response) {
//       console.error("Error en la respuesta del servidor:", error.response.data);
//     } else if (error.request) {
//       console.error("Error en la solicitud:", error.request);
//     } else {
//       console.error("Error general:", error.message);
//     }
//   }
// };

// // Usar la función con los parámetros adecuados
// const clientId = "TU_CLIENT_ID";
// const clientSecret = "TU_CLIENT_SECRET";
// const code = "TG-XXXXXXXX-241983636"; // Reemplaza con el código de autorización real

// exchangeAuthorizationCodeForToken(clientId, clientSecret, code);
