import { Link } from "react-router-dom";
import "./style.css";

import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context";
import { toast } from "react-toastify";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().nonempty("O campo é obrigatório").email(),
  senha: z
    .string()
    .nonempty("O campo é obrigatório")
    .min(3, "A senha deve ter ao menos 3 numeros ou 3 letras"),
});

export default function Login() {
  const { LogarUser, loading } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  function Hendle(data) {
    LogarUser(data);
  }

  return (
    <div className="grupo">
      <form className="form" onSubmit={handleSubmit(Hendle)}>
        <h1 className="Title">Entre na sua conta!</h1>
        <input
          placeholder="E-Mail"
          className="inputs"
          type="email"
          {...register("email")}
          id="email"
        />
        <p>{errors.email?.message}</p>
        <input
          placeholder="Senha"
          className="inputs"
          type="password"
          {...register("senha")}
          id="senha"
        />
        <p>{errors.senha?.message}</p>

        {loading ? (
          <button className="bnt" type="submit">
            Carregando...
          </button>
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
