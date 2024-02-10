import { useEffect, useState } from "react";
import axios from "axios";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useLocation } from "react-router-dom";

export const Product = () => {

  const {pathname} = useLocation();



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
    
    console.log('preference id : ',preferenceId);

    const urlMercadoPago = `https://www.mercadopago.com.ar/checkout/v1/payment/redirect/8cccba06-68d7-45ed-be60-583fbe57c7ef/payment-option-form/?preference-id=${preferenceId}&correlation_id=fe7e5d31-5e2d-4f71-9592-a591fd551af4&sniffing-rollout=sniffing-api&router-request-id=88ca1aaa-f591-4d10-9087-a16c8222d9aa&p=72f5bc1d72d0bae0385b00c3c93b69f7#/`
    window.location.href = urlMercadoPago// hay mas datos que no estoy viendo. como por ejemplo el MONTO TOTAL y tal vez el detalle de los productos
  };

  return (
    <div >
      <div>
        <div >
          <img src="" alt="" />
          <h3 >BANANITA DOLCA</h3>
          <p >300 $</p>
          <button  onClick={handleBuy}>Comprar</button>
          <div ></div>
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

// const preferenceId = await createProference();

// const preference = '1674411644-ab3ad86b-3bf4-4e5a-8387-540b03d51d71'



// 1674411644-ab3ad86b-3bf4-4e5a-8387-540b03d51d71



// https://www.mercadopago.com.ar/checkout/v1/payment/redirect/8cccba06-68d7-45ed-be60-583fbe57c7ef/payment-option-form/?preference-id=${preference}&correlation_id=fe7e5d31-5e2d-4f71-9592-a591fd551af4&sniffing-rollout=sniffing-api&router-request-id=88ca1aaa-f591-4d10-9087-a16c8222d9aa&p=72f5bc1d72d0bae0385b00c3c93b69f7#/

// 1674411644-41c80a17-3005-4695-813a-8c23f75d94cb


// https://www.mercadopago.com.ar/checkout/v1/payment/redirect/7ea95246-996b-4fe7-8ca4-87febed737a3/payment-option-form/?preference-id=1674411644-41c80a17-3005-4695-813a-8c23f75d94cb&correlation_id=8c30d6a8-3135-4723-bb3c-0751fcf1a4ec&sniffing-rollout=sniffing-api&router-request-id=36f53a10-3b20-4d46-bdd9-f8a0298cf69e&p=72f5bc1d72d0bae0385b00c3c93b69f7#/

// 1674411644-26b2044b-c578-4207-b5af-3c2d303e3ba1

// https://www.mercadopago.com.ar/checkout/v1/payment/redirect/6b6b1927-90c4-4897-92fc-85cdcdd489a4/review/?preference-id=1674411644-26b2044b-c578-4207-b5af-3c2d303e3ba1&correlation_id=f68e501c-2b3f-4f83-9cfc-7d2628180559&sniffing-rollout=sniffing-api&router-request-id=9eb89f04-cab3-442b-84f3-ae1f5f031942&p=72f5bc1d72d0bae0385b00c3c93b69f7