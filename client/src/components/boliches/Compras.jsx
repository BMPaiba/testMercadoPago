import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { path } from "../../redux/actions";

export default function Compras() {
  const { pathname } = useLocation();
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const url = "http://localhost:3000/url";
  const key = "http://localhost:3000/key";
  const { cliente } = useParams();


  const home = "/admin";

  const goHome = (e) => {
    const { value } = e.target;
    navigate(`${value}`);
  };

  const [preferenceId, setPreferenceId] = useState(null);
  const [apiKey, setapiKey] = useState(null);

  const pathToSend = pathname.startsWith("/")
    ? pathname.substring(1)
    : pathname;
  
    // console.log(pathToSend);
    
      localStorage.setItem('pathname', cliente);

  const keyData = async () => {
    try {
      const { data } = await axios.post(key, { cliente });
      setapiKey(data);
    } catch (error) {
      console.error("Error al enviar la solicitud al servidor:", error);
    }
  };
  initMercadoPago(apiKey, {
    locale: "es-AR",
  });


  const authorization = () => {
    localStorage.setItem('pathname', cliente);
    const redirectUri ="https://mercadopago-7p1q.onrender.com/mercadopago-authorization/success";
    const clientId = "7378685924902197";
    const state = uuidv4();
    const authorizationUrl = `https://auth.mercadopago.com/authorization?client_id=${clientId}&response_type=code&platform_id=mp&state=${state}&redirect_uri=${redirectUri}`;
    window.open(authorizationUrl) ;
  };

  const createProference = async () => {
    try {
      console.log('post purchase');
      const response = await axios.post(
        "http://localhost:3000/create_preference",
        {
          title: "BANANITA DOLCA",
          quantity: 1,
          price: 10,
          path: cliente,
        }
      );

      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error.message);
    }
  };

  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const { data } = await axios.post(url, { cliente });
      console.log(data);
      setData(data);
    } catch (error) {
      console.error("Error al enviar la solicitud al servidor:", error);
    }
  };

  const goCheckout = async () => {
    await keyData();
    // await fetchData();
    const preferenceId = await createProference();

    if (preferenceId) {
      setPreferenceId(preferenceId);
    }
    console.log("preference id : ", preferenceId);
  };

  return (
    <div>
      <h1>{pathToSend}</h1>
      <img src="" alt="" />
      <h3>BANANITA DOLCA</h3>
      <p>300 $</p>
      <button onClick={goCheckout}>Comprar</button>
      <div></div>
      {preferenceId && (
        <Wallet initialization={{ preferenceId: preferenceId }} />
      )}
      <button value={home} onClick={goHome}>
        Home
      </button>
      <button onClick={authorization}>autorizar ya!</button>
    </div>
  );
}
