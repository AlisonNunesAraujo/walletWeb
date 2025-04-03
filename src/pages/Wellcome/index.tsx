import React from "react";
import './style.css'
import { useNavigate } from "react-router-dom";
export default function Wellcome() {
  const navigation = useNavigate()
  return (
    <div className="wellcome">
      <div className="areaWellcome">
        <h2>Bem Vindo!</h2>
        <p>Controle seus gastos em um so lugar!</p>
      </div>
      <div className="areaIrLogin">
        <h3>Faça login ou crie sua conta!</h3>
        <button onClick={() => navigation('/Login')}>Entre na sua conta!</button>
      </div>
    </div>
  );
}