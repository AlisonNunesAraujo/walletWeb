import { Link } from "react-router-dom";
import "./style.css";

import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context";
import { toast } from "react-toastify";

import { useForm } from "react-hook-form";

export default function Login() {
  const { LogarUser, loading } = useContext(AuthContext);

  // const [email, setEmail] = useState("");
  // const [senha, setSenha] = useState("");

  const { register, handleSubmit } = useForm();

  function Hendle(data) {
    // if (data.email === "") | (data.senha === "") {
    //   toast.error("O campo é obrigatório");
    //   return;
    // }

    LogarUser(data.email, data.senha);
    console.log(data);
  }

  return (
    <div className="grupo">
      <form className="form" onSubmit={handleSubmit(Hendle)}>
        <h1 className="Title">Entrar</h1>
        <input
          placeholder="E-Mail"
          className="inputs"
          type="email"
          {...register("email")}
          id="email"
        />
        <input
          placeholder="Senha"
          className="inputs"
          type="password"
          {...register("senha")}
          id="senha"
        />

        {loading ? (
          <button className="bnt">Carregando...</button>
        ) : (
          <button className="bnt" type="submit">
            Entrar
          </button>
        )}

        <Link to="/Register" className="bntCriar">
          Criar conta!
        </Link>
      </form>
    </div>
  );
}
