import "./style.css";
import { Link } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../../context";

import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  nome: z.string().nonempty("O campo é obrigatório"),
  email: z.string().nonempty("O campo é obrigatório"),
  senha: z
    .string()
    .nonempty("O campo é obrigatório")
    .min(3, "A senha deve ter ao menos 3 numeros ou 3 letras"),
});

export default function Register() {
  const { RegisterUser, loading } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  function Register(data) {
    RegisterUser(data);
  }

  return (
    <div className="global">
      <div className="login">
        <form className="formLogin" onClick={handleSubmit(Register)}>
          <h1 className="Title">Faça seu registro</h1>

          <input placeholder="Nome" {...register("name")} id="name" />
          <p>{errors.nome?.message}</p>
          <input placeholder="E-Mail" {...register("email")} id="email" />
          <p>{errors.email?.message}</p>
          <input
            placeholder="Senha"
            type="password"
            {...register("senha")}
            id="senha"
          />
          <p>{errors.senha?.message}</p>

          {loading ? (
            <button className="bntLogin" type="submit">
              Criando...
            </button>
          ) : (
            <button className="bntLogin" type="submit">
              Criar conta
            </button>
          )}

          <Link to="/" className="bntVoltar">
            Voltar
          </Link>
        </form>
        <div className="apresentacao">
          <img
            src="https://img.freepik.com/vetores-gratis/ilustracao-do-conceito-de-login-movel_114360-83.jpg?semt=ais_hybrid&w=740"
            className="img"
          />
        </div>
      </div>
    </div>
  );
}
