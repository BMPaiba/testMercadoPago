import Compras from "./components/boliches/Compras";
import Home from "./components/boliches/Home";
import { Route, Routes } from "react-router-dom";
import NewClient from "./components/boliches/NewClient";
import AuthorizationSuccessPage from "./components/boliches/AuthorizationSuccessPage";
import Login from "./components/boliches/Login";
import Client from "./components/boliches/Client";

function App() {
  return (
    <>
      <Routes>

        <Route path="/" element={<Home />} />{" "}
        <Route path="/admin" element={<Login />} />{" "} { /* LOGIN */ }
        <Route path="/admin/:cliente/dashboard" element={<Compras />} />{" "} { /* LOGIN */ }
        <Route path="/admin/:cliente" element={<Compras />} />
        <Route path="/admin/:cliente/addclient" element={<NewClient />} />
        <Route path="/mercadopago-authorization/success" element={<AuthorizationSuccessPage location={window.location} />} />
      </Routes>
    </>
  ); 
}

export default App;
