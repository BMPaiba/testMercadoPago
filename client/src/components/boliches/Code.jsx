const exchangeAuthorizationCodeForToken = (code) => {
    const clientId = "TU_CLIENT_ID"; // Reemplaza con tu ID de cliente de MercadoPago
    const clientSecret = "TU_CLIENT_SECRET"; // Reemplaza con tu secreto de cliente de MercadoPago
    const redirectUri = "https://testmp-ro6r.onrender.com/mercadopago-authorization/success"; // Reemplaza con tu URL de redirección
  
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
        // Utiliza el token de acceso para realizar solicitudes a la API de MercadoPago
      })
      .catch(error => {
        console.error("Error al intercambiar el código de autorización por un token de acceso:", error.response.data);
      });
  };
  
  const authorization = () => {
    const redirectUri = "https://testmp-ro6r.onrender.com/mercadopago-authorization/success";
    const clientId = "203586994908608";
    const state = uuidv4();
    const authorizationUrl = `https://auth.mercadopago.com/authorization?client_id=${clientId}&response_type=code&platform_id=mp&state=${state}&redirect_uri=${redirectUri}`;
  
    console.log(authorizationUrl);
  
    // Abre la URL de autorización en una nueva pestaña
    window.open(authorizationUrl, '_blank');
  };
  
  // Esta función se llama cuando se completa la autorización y se redirige a la URL de redirección
  const handleAuthorizationSuccess = () => {
    // Extraer el código de autorización de la URL de redirección
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
  
    // Intercambiar el código de autorización por un token de acceso
    exchangeAuthorizationCodeForToken(code);
  };
  