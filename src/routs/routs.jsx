import { Route, Routes } from "react-router-dom";

import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import Private from "./private";
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



      <Route path="/" element={<Login />} />
      <Route path="/Register" element={<Register />} />

      <Route path="*" element={<PageNotFaund />} />
    </Routes>
  );
}
