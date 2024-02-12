import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { statusLogin } from "../../redux/actions";

export default function Login() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [path, setPath] = useState(null);
  const dispatch = useDispatch();
  const statuslogin = useSelector((state) => state.status_login);

  console.log(pathname);
  const tuturraca = "tuturraca";
  const narcoboli = "narcoboli";

  const goCheckout = (e) => {
    console.log(statuslogin);
    dispatch(statusLogin());
    console.log(statuslogin);
    const { value } = e.target;
    navigate(`${value}/dashboard`);
  };

  return (
    <div>
      <h1>Home</h1>
      <button value={narcoboli} onClick={goCheckout}>
        {narcoboli}
      </button>
      <button value={tuturraca} onClick={goCheckout}>
        {tuturraca}
      </button>
    </div>
  );
}