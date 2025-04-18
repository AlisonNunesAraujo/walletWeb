import { Route, Routes } from "react-router-dom";

import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import Private from "./private";
import PageNotFaund from "../pages/PageNotFaund";
import Wellcome from "../pages/Wellcome";
import Perfil from "../pages/Perfil";
import CreateRegister from "../pages/CreateRegister";
import ViewRegister from "../pages/ViewRegister";
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
        path="/Perfil"
        element={
          <Private>
            <Perfil />
          </Private>
        }
      />
      <Route
        path="/ViewRegister"
        element={
          <Private>
            <ViewRegister />
          </Private>
        }
      />

      <Route
        path="/CreateRegister"
        element={
          <Private>
            <CreateRegister />
          </Private>
        }
      />
      <Route path="/" element={<Wellcome />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />

      <Route path="*" element={<PageNotFaund />} />
    </Routes>
  );
}
