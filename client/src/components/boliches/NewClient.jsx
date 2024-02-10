import axios from "axios";
import React, { useState } from "react";

export default function NewClient() {
  const urlCreateUser = "http://localhost:3000/administrator";

  const [body, setBody] = useState({
    name: "",
    key: "",
    token: "",
  });

  const [dataUser, setDataUser] = useState({});

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
    </div>
  );
}
