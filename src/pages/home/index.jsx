import "./style.css";

import { useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { addDoc, doc, getDocs, where, query } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../services/firebase";
import { useEffect, useState } from "react";
import { deleteDoc } from "firebase/firestore";
import { AuthContext } from "../../context";
import { useContext } from "react";


export default function Home() {
  const { user, LogOut } = useContext(AuthContext);
  const navigation = useNavigate();
  const [data, setData] = useState([]);
  const [gastos, setGastos] = useState([]);

  useEffect(() => {
    async function Push() {
      console.log("Starting Push function");
      const uid = user.user.uid;
      const ref = collection(db, "receita");

      const receitaQuery = query(ref, where("uid", "==", uid));

      getDocs(receitaQuery).then((snapshot) => {
        let lista = [];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            valor: doc.data().valor,
          });
        });

        setData(lista);
        const response = lista.reduce((acc, item) => acc + item.valor, 0);
        setSaldo([response]);
        console.log("Finished Push function");
      });
    }

    Push();

    async function Gastos() {
      console.log("Starting Gastos function");
      const uid = user.user.uid;
      const ref = collection(db, "gastos");
      const gastosQuery = query(ref, where("uid", "==", uid));

      getDocs(gastosQuery).then((snapshot) => {
        let lista = [];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            valor: doc.data().valor,
          });
        });

        setGastos(lista);
        console.log("Finished Gastos function");
      });
    }

    Gastos();
  }, [Deletar, DeletarGastos]);

  async function Deletar(id) {
    console.log("Starting Deletar function");
    const ref = doc(db, "receita", id);

    await deleteDoc(ref)
      .then(() => {
        toast.success("Excluido com sucesso!");
        console.log("Finished Deletar function");
      })
      .catch((err) => {
        toast.error("Algo deu errado!");
        console.log("Error in Deletar function", err);
      });
  }

  async function DeletarGastos(id) {
    const data = doc(db, "gastos", id);

    await deleteDoc(data)
      .then(() => {
        toast.success("Excluido com sucesso!");
      })
      .catch((err) => {
        console.log("Finished DeletarGastos function");
        toast.error("Algo deu errado!");
      });
  }

  return (
    <div className="conteiner">
      <div className="globo">
        <div className="menu">
          <h2 className="title">Olá, Bem vindo!</h2>

          <button onClick={() => navigation("/Perfil")} className="bntPerfil">
            <FiUser size={25} color="black" />
          </button>
        </div>

        <div className="dashboard">
          <div className="textTitle">
            <h2>Dasboard</h2>
          </div>
          <div className="areaBnts">
            <button onClick={() => navigation("/CreateRegister")}>
              <p>Adicionar Receita/Gstos</p>
            </button>
            <button onClick={() => navigation("/ViewRegister")}>
              <p>Ver registros</p>
            </button>
            <button onClick={() => navigation("/AccountFixed")}>
              <p>Adicionar Conta Fixa, exp: Conta de luz!</p>
            </button>
            <button onClick={() => navigation("/ViewAccountFixed")}>
              <p>Ver suas conta fixas</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

