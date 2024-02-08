import { useState } from "react";
import axios from "axios";
import "./Product.css";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

export const Product = () => {
  const [preferenceId, setPreferenceId] = useState(null);

  initMercadoPago("TEST-497b93a7-7896-4e29-941d-02f98dd3c5ca", {
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
    } catch (error) {}
  };

  const handleBuy = async () => {
    const preferenceId = await createProference();
    if (preferenceId) {
      setPreferenceId(preferenceId);
    }
    console.log(preferenceId);
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
