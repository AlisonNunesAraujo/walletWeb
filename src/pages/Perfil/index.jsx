import './style.css'
import { useNavigate } from "react-router-dom";
import { addDoc, collection, } from 'firebase/firestore';
import { useContext, useState } from "react";
import { AuthContext } from "../../context";
import { toast } from 'react-toastify';
import { db } from '../../services/firebase';
export default function Perfil() {
  const navigation = useNavigate();
  const { user, LogOut } = useContext(AuthContext);



  return (
    <div className='perfil'>
      <div>
        <h1>Seu Perfil</h1>

        <h3>Email:</h3>
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
