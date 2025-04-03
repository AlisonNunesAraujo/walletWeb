import './style.css'
import React from "react";
import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../../context";

export default function Perfil() {
  const navigation = useNavigate();
  const { user, LogOut } = useContext(AuthContext);

  return (
    <div className='perfil'>
      <div>
        <h1>Seu Perfil</h1>
        <input type="text" value={user.user.email} enabled />
        <button onClick={() => navigation("/home")}>
          <p>Voltar para a home</p>
        </button>
        <button onClick={() => LogOut()}>
          <p>Sair da conta!</p>
        </button>
      </div>
    </div>
  );
}
