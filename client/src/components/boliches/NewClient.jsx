import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewClient() {
  const urlCreateUser = "http://localhost:3000/administrator";

  const [body, setBody] = useState({
    name: "",
    key: "",
    token: "",
  });

  const [dataUser, setDataUser] = useState({});

  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  const createUser = (e) => {
    setBody({
      ...body,
      [e.target.name]: e.target.value,
    });
    console.log(body);
  };

  const createUserAxios = async () => {
    try {
      const { data } = await axios.post(urlCreateUser, body);
      setDataUser(data);
      console.log(data);
      console.log(dataUser);
    } catch (error) {
      console.error("Error al enviar la solicitud al servidor:", error);
    }
  };

  const addUser = async () => {
    await createUserAxios();
  };

  const actual = () => {
    console.log(body);
  };

  
  const authorization = () => {
    const redirectUri =
      "https://testmp-ro6r.onrender.com/mercadopago-authorization/success"; // Reemplaza con tu URL de redirección
  
    const clientId = "203586994908608"; // Reemplaza con tu ID de cliente de MercadoPago

    const state = uuidv4();

    const authorizationUrl = `https://auth.mercadopago.com/authorization?client_id=${clientId}&response_type=code&platform_id=mp&state=${state}&redirect_uri=${redirectUri}`;

    console.log(authorizationUrl);

    navigate(authorizationUrl);
    // return authorizationUrl;
  };

  return (
    <div>
      <label htmlFor="">name </label>
      <input
        value={body.name}
        onChange={createUser}
        placeholder="name"
        type="text"
        name="name"
        id=""
      />{" "}
      <br />
      <label htmlFor="">Key </label>
      <input
        value={body.key}
        onChange={createUser}
        placeholder="key"
        type="text"
        name="key"
        id=""
      />{" "}
      <br />
      <label htmlFor="">Token </label>
      <input
        value={body.token}
        onChange={createUser}
        placeholder="token"
        type="text"
        name="token"
        id=""
      />
      <button onClick={actual}>Actualizar log</button>
      <button onClick={addUser}>Create User</button>
      <button onClick={authorization}>autorizar</button>
      <button onClick={goHome}>Home</button>
    </div>
  );
}
