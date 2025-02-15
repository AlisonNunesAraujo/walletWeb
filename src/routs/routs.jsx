import { Route, Routes } from "react-router-dom";

import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import Private from "./private";
import Dolar from "../pages/areaDolar";
import PageNotFaund from "../pages/PageNotFaund";

export function Routs() {
  return (
    <Routes>
      <Route
        path="/Home"
        element={
          <Private>
            <Home />
          </Private>
        }
      />

      <Route
        path="/Dolar"
        element={
          <Private>
            <Dolar />
          </Private>
        }
      />

      <Route path="/" element={<Login />} />
      <Route path="/Register" element={<Register />} />

      <Route path="*" element={<PageNotFaund />} />
    </Routes>
  );
}
