import React, { useEffect } from 'react';
import axios from 'axios';

const AuthorizationSuccessPage = ({ location }) => {
  useEffect(() => {
    // Extraer el código de autorización de la URL
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');
    console.log(code);
    // Intercambiar el código de autorización por un token de acceso
    exchangeAuthorizationCodeForToken(code);
  }, [location.search]);

  const exchangeAuthorizationCodeForToken = (code) => {
    const clientId = "203586994908608"; // Reemplaza con tu ID de cliente de MercadoPago
    const clientSecret = "vjylCFehLLuAxqZDzTJf5zPoQRHDHEhO"; // Reemplaza con tu secreto de cliente de MercadoPago
    const redirectUri = "https://mercadopago-7p1q.onrender.com/mercadopago-authorization/success"; // Reemplaza con tu URL de redirección

    const data = {
      grant_type: 'authorization_code',
      client_id: clientId,
      client_secret: clientSecret,
      code: code,
      redirect_uri: redirectUri
    };

    axios.post('https://api.mercadopago.com/oauth/token', data)
      .then(response => {
        const accessToken = response.data.access_token;
        console.log("Token de acceso:", accessToken);
        // Realizar cualquier acción necesaria con el token de acceso
      })
      .catch(error => {
        console.error("Error al intercambiar el código de autorización por un token de acceso:", error.response.data);
      });
  };

  return (
    <div>
      <h1>¡Autorización exitosa!</h1>
      {/* Puedes agregar cualquier contenido adicional que desees mostrar en esta página */}
    </div>
  );
};

export default AuthorizationSuccessPage;
