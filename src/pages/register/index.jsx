import { Link } from "react-router-dom";
import "./style.css";

import { useRef } from "react";
import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../../context";

export default function Register() {
  const { RegisterUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function Hendle(e) {
    e.preventDefault();
    if( email === '' | senha ===''){
        alert('campo obrigatorio')
        return;
    }
    RegisterUser(email, senha);
  }

  return (
    <div className="conteiner">
      <form className="form">
        <h1 className="TitleRegister">Faça seu registro</h1>
        <input
          placeholder="E-Mail"
          className="inputs"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Senha"
          className="inputs"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <button className="bnt" onClick={(e) => Hendle(e)}>
          Criar
        </button>
        <Link to="/" className="bntVoltar">
          Voltar
        </Link>
      </form>
    </div>
  );
}
