import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { path } from "../../redux/actions";
import styles from "./Compras.module.css";

export default function Compras() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const url = "http://localhost:3000/url";
  const key = "http://localhost:3000/key";
  const { cliente } = useParams();
 
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({ title: '', quantity: 0, unit_price: 0 });

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

  localStorage.setItem("pathname", cliente);

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
    localStorage.setItem("pathname", cliente);
    const redirectUri =
      "https://mercadopago-7p1q.onrender.com/mercadopago-authorization/success";
    const clientId = "7378685924902197";
    const state = uuidv4();
    const authorizationUrl = `https://auth.mercadopago.com/authorization?client_id=${clientId}&response_type=code&platform_id=mp&state=${state}&redirect_uri=${redirectUri}`;
    window.open(authorizationUrl);
  };

  const createProference = async () => {
    try {
      console.log("post purchase");
      const response = await axios.post(
        "http://localhost:3000/create_preference",
        {
          products : products,
          path : cliente
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


  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  
  const addProduct = (e) => {
    e.preventDefault();
    const parsedProduct = {
      title: product.title,
      quantity: parseInt(product.quantity),
      unit_price: parseFloat(product.unit_price)
    };
    setProducts([...products, parsedProduct]);
    setProduct({ title: '', quantity: '0', unit_price: '0' });
  };

  // console.log(products);

  const total = products.reduce((acc, curr) => acc + (parseFloat(curr.unit_price) * parseInt(curr.quantity)), 0);



  return (
    <div className={styles.container}>
      <div>
        <h1>Bienvenidos al Dashboard de {cliente}</h1>
      </div>
      <div className={styles.container_form}>
      <div className={styles.container_form_ing}>
        <label htmlFor="title">Producto</label>
        <input
          className={styles.input}
          type="text"
          name="title"
          value={product.title}
          onChange={handleChange}
        />
        <label htmlFor="quantity">Cantidad</label>
        <input
          className={styles.input}
          type="number"
          name="quantity"
          value={product.quantity}
          onChange={handleChange}
        />
        <label htmlFor="unit_price">Precio</label>
        <input
          className={styles.input}
          type="number"
          name="unit_price"
          value={product.unit_price}
          onChange={handleChange}
        />
        <button className={styles.button} onClick={addProduct}>
          Agregar Producto
        </button>
      </div>
      <div className={styles.card_container}>
        {products.map((product, index) => (
          <div className={styles.card} key={index}>
            <p>producto: {product.title}</p>
            <p>cantidad: {product.quantity}</p>
            <p>precio: ${product.unit_price}</p>
          </div>
        ))}
        </div>
      </div>
      <div>
          <h1>Total: ${total}</h1>
        <button className={styles.button} onClick={goCheckout}>
          Comprar
        </button>
        <div></div>
        {preferenceId && (
          <Wallet className={styles.button} initialization={{ preferenceId: preferenceId }} />
        )}
        <button className={styles.button} onClick={authorization}>
          autorizar ya!
        </button>
      </div>
      <button className={styles.button} value={home} onClick={goHome}>
        Home
      </button>
    </div>
  );
}
