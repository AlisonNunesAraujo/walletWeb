import { Link } from "react-router-dom";
import "./style.css";

import { useRef } from "react";
import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../../context";
import { toast } from "react-toastify";

export default function Register() {
  const { RegisterUser,loading } = useContext(AuthContext);

  
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function Hendle(e) {
    e.preventDefault();
    if ((email === "") | (senha === "")) {
      toast.error("O campo é obrigatório");
      return;
    }
    RegisterUser(email, senha,);
  }

  return (
    <div className="cont">
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
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        
        { loading ? (
          <button className="bnt" onClick={(e) => Hendle(e)}>
          Criando...
        </button>
        ) : (
          <button className="bnt" onClick={(e) => Hendle(e)}>
          Criar
        </button>
        ) }


        <Link to="/" className="bntVoltar">
          Voltar
        </Link>
      </form>
    </div>
  );
}
