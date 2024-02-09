import { useState } from "react";
import axios from "axios";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

export const Product = () => {
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
          price: 300,
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
        </div>
      </div>
    </div>
  );
};
