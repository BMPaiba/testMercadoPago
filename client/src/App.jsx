import Narcoboli from "./components/boliches/narcoboli";
import Tuturraca from "./components/boliches/tuturraca";
import Init from "./components/init/Init";
import { Product } from "./components/mercadopago/product";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Init/>} />
        <Route path="/:client/mercadopago" element={<Product />} />
        <Route path="/narcoboli" element={<Narcoboli />} />
        <Route path="/tuturraca" element={<Tuturraca />} />
      </Routes>
    </>
  );
}

export default App;
