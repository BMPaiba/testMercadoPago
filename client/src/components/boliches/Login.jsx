import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import style from "./Login.module.css";

export default function Login() {
  const navigate = useNavigate();
  const statuslogin = useSelector((state) => state.status_login);

  // console.log(pathname);
  const admins = ["tuturraca", "narcoboli", "africa"];

  const goCheckout = (e) => {
    const { value } = e.target;
    navigate(`${value}/dashboard`);
  };

  return (
    <div className={style.container}>
      <div className={style.container_login}>
        <h1>Home</h1>
        <div className={style.container_login_buttons}>
          {admins.map((admin) => (
            <button className={style.button} key={admin} value={admin} onClick={goCheckout}>
              {admin}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
