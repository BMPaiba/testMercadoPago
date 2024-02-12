import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function Client() {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/admin");
  };

  // Obtener la URL actual
  const currentUrl = window.location.href;

  const authorization = () => {
    const redirectUri = currentUrl
      // "https://mercadopago-7p1q.onrender.com/mercadopago-authorization/success";
    const clientId = "7378685924902197";
    const state = uuidv4();
    const authorizationUrl = `https://auth.mercadopago.com/authorization?client_id=${clientId}&response_type=code&platform_id=mp&state=${state}&redirect_uri=${redirectUri}`;
    window.open(authorizationUrl);
  };

  return (
    <div>
      <button onClick={authorization}>autorizar</button>
      <button onClick={goHome}>Home</button>
    </div>
  );
}
