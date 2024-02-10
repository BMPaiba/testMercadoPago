import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Home() {
  const {pathname} = useLocation();
  const navigate = useNavigate()
  const [path, setPath] = useState(null)

  console.log(pathname);
  const tuturraca = 'tuturraca'
  const narcoboli = 'narcoboli'
  const addClient = 'addclient'

    const goCheckout = (e) => {
      const { value } = e.target
      navigate(`${value}`)
    }

  return <div>
    <h1>Home</h1>
    <button  value={narcoboli} onClick={goCheckout}>{narcoboli}</button>
    <button value={tuturraca} onClick={goCheckout}>{tuturraca}</button>
    <button value={addClient} onClick={goCheckout}>{addClient}</button>
  </div>;
}
