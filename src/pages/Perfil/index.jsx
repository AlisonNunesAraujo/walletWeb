import { useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../services/firebase";
import { FiHome, FiLogOut, FiMail, FiUser } from "react-icons/fi";

export default function Perfil() {
  const navigation = useNavigate();
  const { user, LogOut } = useContext(AuthContext);
  const [names, setName] = useState([]);

  useEffect(() => {
    async function getName() {
      try {
        const colRef = collection(db, "users");
        const ref = query(colRef, where("uid", "==", user.user.uid));
        getDocs(ref).then((snapshot) => {
          let list = [];
          snapshot.forEach((doc) => {
            list.push({ id: doc.id, name: doc.data().name });
            setName(list);
          });
        });
      } catch {
        console.log("Erro ao buscar nome do usuário");
      }
    }
    getName();
  }, []);

  const initial = names[0]?.name?.charAt(0).toUpperCase() || user.user.email?.charAt(0).toUpperCase();

  return (
    <div className="perfil">
      <div className="perfil-wrapper">
        <div className="perfil-card">
          <div className="perfil-avatar">{initial}</div>

          <div className="perfil-info">
            {names.map((item, index) => (
              <p key={index} className="perfil-name">{item.name}</p>
            ))}
            <div className="perfil-field">
              <FiMail size={14} />
              <span>{user.user.email}</span>
            </div>
          </div>

          <div className="perfil-actions">
            <button className="btn-home" onClick={() => navigation("/home")}>
              <FiHome size={17} />
              Voltar para home
            </button>
            <button className="btn-logout" onClick={() => LogOut()}>
              <FiLogOut size={17} />
              Sair da conta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
