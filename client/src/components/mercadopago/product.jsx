import { useEffect, useState } from "react";
import axios from "axios";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useLocation } from "react-router-dom";

export const Product = () => {
  const { pathname } = useLocation();

  console.log(pathname);

  const [preferenceId, setPreferenceId] = useState(null);

  initMercadoPago("APP_USR-6304f6f0-f1a0-4913-a265-979e7380070a", {
    locale: "es-AR",
  });

  const createProference = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/create_preference",
        {
          title: "BANANITA DOLCA",
          quantity: 1,
          price: 10,
        }
      );

      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleBuy = async () => {
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
      <div>
        <div>
          <img src="" alt="" />
          <h3>BANANITA DOLCA</h3>
          <p>300 $</p>
          <button onClick={handleBuy}>Comprar</button>
          <div></div>
          {preferenceId && (
            <Wallet initialization={{ preferenceId: preferenceId }} />
          )}
          {/* {preferenceId && (
            <p>Redirigiendo a Mercado Pago...</p>
          )} */}
        </div>
      </div>
    </div>
  );
};



// https://www.mercadopago.com.ar/checkout/v1/payment/redirect/${8cccba06-68d7-45ed-be60-583fbe57c7ef}/payment-option-form/?preference-id=${preference}&correlation_id=${fe7e5d31-5e2d-4f71-9592-a591fd551af4}&sniffing-rollout=sniffing-api&router-request-id=${88ca1aaa-f591-4d10-9087-a16c8222d9aa}&p=72f5bc1d72d0bae0385b00c3c93b69f7#/


// https://www.mercadopago.com.ar/checkout/v1/payment/redirect/b4cf9314-c2d6-44a3-8deb-83c83e20dc93/payment-option-form/?preference-id=1674411644-6d4c2b30-655e-4d88-8384-43b5308764f1&correlation_id=6773d609-2ceb-4b9f-a45e-8da3c8efa416&sniffing-rollout=sniffing-api&router-request-id=b2d2ee1e-2742-4163-a1e1-7b1b23c0ed27&p=72f5bc1d72d0bae0385b00c3c93b69f7

