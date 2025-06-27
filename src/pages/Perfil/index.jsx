import { useEffect, useState } from 'react';
import './style.css'
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../../services/firebase';

export default function Perfil() {
  const navigation = useNavigate();
  const { user, LogOut } = useContext(AuthContext);
  const [names, setName] = useState([]);

  useEffect(() => {
    async function getName() {
      try {
        const data = collection(db, "users");
        const ref = query(data, where("uid", "==", user.user.uid));
        getDocs(ref).then((snapshot) => {
          let list = [];
          snapshot.forEach((doc) => {
            list.push({
              id: doc.id,
              name: doc.data().name,
            });
            setName(list);
          });



        });
      } catch {
        alert("occoreu um erro ao buscar seu nome!");
      }
    }
    getName();
  }, []);


  return (
    <div className='perfil'>
      <div>
        <h1>Seu Perfil</h1>



        <h3 className='titleNome'>Email:</h3>
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
