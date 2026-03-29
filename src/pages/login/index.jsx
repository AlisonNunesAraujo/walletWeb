import { Link } from "react-router-dom";
import "./style.css";
import { useContext } from "react";
import { AuthContext } from "../../context";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().nonempty("Informe seu e-mail").email("E-mail inválido"),
  senha: z
    .string()
    .nonempty("Informe sua senha")
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
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
    <div className="auth-global">
      <div className="auth-card">
        <div className="auth-brand">
          <h1 className="auth-brand-name">Finanças</h1>
          <p className="auth-brand-sub">Controle seus gastos com simplicidade</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit(Hendle)}>
          <h2 className="auth-title">Entrar na conta</h2>

          <div className="auth-field">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="seu@email.com"
              className={errors.email ? "input-error" : ""}
              {...register("email")}
            />
            {errors.email && <span className="field-error">{errors.email.message}</span>}
          </div>

          <div className="auth-field">
            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              placeholder="••••••"
              className={errors.senha ? "input-error" : ""}
              {...register("senha")}
            />
            {errors.senha && <span className="field-error">{errors.senha.message}</span>}
          </div>

          <button type="submit" className="auth-btn-primary" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <p className="auth-switch">
            Não tem conta? <Link to="/Register">Criar conta</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
