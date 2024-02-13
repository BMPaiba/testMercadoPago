import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  
    console.log(pathToSend);

  const keyData = async () => {
    try {
      const { data } = await axios.post(key, { pathToSend });
      console.log(data);
      setapiKey(data);
    } catch (error) {
      console.error("Error al enviar la solicitud al servidor:", error);
    }
  };
  initMercadoPago(apiKey, {
    locale: "es-AR",
  });


  const path = () => {
    return new Promise((resolve, reject) => {
        // Tu lógica para la función path aquí, incluido el dispatch
        dispatch(pathActionCreator(pathToSend)); // Suponiendo que tengas un action creator llamado pathActionCreator
        // Puedes agregar más lógica aquí si es necesario
        resolve(); // Resuelve la promesa para indicar que la función path ha terminado
    });
};

const clic = async () => {
  try {
      await path(); // Espera a que la función path termine
      authorization(); // Llama a la función authorization después de que path haya terminado
  } catch (error) {
      console.error('Error en la función path:', error);
      // Maneja cualquier error que pueda ocurrir durante la ejecución de la función path
  }
};

  const authorization = () => {
    localStorage.setItem('pathname', pathToSend);
    const redirectUri ="https://mercadopago-7p1q.onrender.com/mercadopago-authorization/success";
    const clientId = "7378685924902197";
    const state = uuidv4();
    const authorizationUrl = `https://auth.mercadopago.com/authorization?client_id=${clientId}&response_type=code&platform_id=mp&state=${state}&redirect_uri=${redirectUri}`;
    window.open(authorizationUrl) ;
  };

  const createProference = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/create_preference",
        {
          title: "BANANITA DOLCA",
          quantity: 1,
          price: 10,
          path: pathToSend,
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
      const { data } = await axios.post(url, { pathToSend });
      console.log(data);
      setData(data);
    } catch (error) {
      console.error("Error al enviar la solicitud al servidor:", error);
    }
  };

  const goCheckout = async () => {
    await keyData();
    await fetchData();
    const preferenceId = await createProference();

    if (preferenceId) {
      setPreferenceId(preferenceId);
    }
    console.log("preference id : ", preferenceId);
    // const urlMercadoPago = `https://www.mercadopago.com.ar/checkout/v1/payment/redirect/${8cccba06-68d7-45ed-be60-583fbe57c7ef}/payment-option-form/?preference-id=${preferenceId}&correlation_id=${fe7e5d31-5e2d-4f71-9592-a591fd551af4}&sniffing-rollout=sniffing-api&router-request-id=${88ca1aaa-f591-4d10-9087-a16c8222d9aa}&p=72f5bc1d72d0bae0385b00c3c93b69f7#/`;
    // window.location.href = urlMercadoPago; // hay mas datos que no estoy viendo. como por ejemplo el MONTO TOTAL y tal vez el detalle de los productos
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
      <button onClick={clic}>autorizar ya!</button>
    </div>
  );
}
