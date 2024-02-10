import Compras from "./components/boliches/Compras";
import Home from "./components/boliches/Home";
import { Route, Routes } from "react-router-dom";
import NewClient from "./components/boliches/NewClient";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />{" "}
        <Route path="/:cliente" element={<Compras />} />
        <Route path="/addclient" element={<NewClient />} />
      </Routes>
    </>
  );
}

export default App;
