import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate()
 
  const goCheckout = () => {
    navigate('/admin')
  }

  return <div>
    <h1>Home</h1>
    <button  onClick={goCheckout}>ingresar a boliche</button>
   
  </div>;
}
