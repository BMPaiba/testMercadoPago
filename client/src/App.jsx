import Compras from "./components/boliches/Compras";
import Home from "./components/boliches/Home";
import { Route, Routes } from "react-router-dom";
import NewClient from "./components/boliches/NewClient";
import AuthorizationSuccessPage from "./components/boliches/AuthorizationSuccessPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />{" "}
        <Route path="/mercadopago-authorization/success" element={<AuthorizationSuccessPage location={window.location} />} />
        <Route path="/:cliente" element={<Compras />} />
        <Route path="/addclient" element={<NewClient />} />
      </Routes>
    </>
  );
}

export default App;
