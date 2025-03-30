import "./style.css";


import { useNavigate } from "react-router-dom";

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
  const [dados, setDados] = useState("");
  const [data, setData] = useState([]);
  const [gastos, setGastos] = useState([]);
  const [isActive, setIsActive] = useState(false);

  async function AddReceita(e) {
    e.preventDefault();

    if (!dados) {
      toast.error("O valor da receita é obrigatório!");
      return;
    }

    try {
      const response = await addDoc(collection(db, "receita"), {
        valor: dados,
        uid: user.user.uid,
      }).then(() => {
        toast.success("Receita adicionada com sucesso!");
        setDados("");
      });
      return;
    } catch (error) {
      console.error("Erro ao adicionar receita:", error);
    }
  }
  async function AddGastos(e) {
    e.preventDefault();

    if (!dados) {
      toast.error("O valor do gasto é obrigatório!");
      return;
    }

    try {
      const response = await addDoc(collection(db, "gastos"), {
        valor: dados,
        uid: user.user.uid,
      });
      setDados("");
      toast.success("Gasto adicionado com sucesso!");
      return;
    } catch (err) {
      toast.error("Ocorreu um erro: ");
    }
  }

  useEffect(() => {
    async function Push() {
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
      });
    }

    Push();

    async function Gastos() {
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
      });
    }

    Gastos();
  }, [Deletar, DeletarGastos]);


  async function Deletar(id) {
    const ref = doc(db, "receita", id);

    await deleteDoc(ref)
      .then(() => {
        toast.success("Excluido com sucesso!");
      })
      .catch((err) => {
        toast.error("Algo deu errado!");
      });
  }

  async function DeletarGastos(id) {
    const data = doc(db, "gastos", id);

    await deleteDoc(data)
      .then(() => {
        toast.success("Excluido com sucesso!");
      })
      .catch((err) => {
        toast.error("Algo deu errado!");
      });
  }

  return (
    <div className="conteiner">
      <div className="area">
        <h2 className="title">Olá, Bem vindo!</h2>
        

        <button onClick={()=> navigation('/Perfil')} className="bntPerfil">
          <p>Perfil</p>
        </button>
        
        <div className="areaInput">
          <p className="textAdd">Adicionar Receita e Gastos!</p>
          <input
            className="input"
            placeholder="Gastos/Entradas"
            type="number"
            value={dados}
            onChange={(e) => setDados(e.target.value)}
          />

          <div className="areaBnts">
            <button className="bntAdd" onClick={(e) => AddReceita(e)}>
              Entrada
            </button>
            <button className="bntGastos" onClick={(e) => AddGastos(e)}>
              Gastos
            </button>
          </div>
        </div>

        
      </div>

      <div className="areaRenderDados">
        <div className="areaRenderReceita">
          <h2 className="textTipo">Receita</h2>
          {data.map((item) => (
            <div key={item} className="areadados">
              <p className="textValor">R$ {item.valor}</p>

              <button className="bntExcluir" onClick={() => Deletar(item.id)}>
                Excluir
              </button>
            </div>
          ))}
        </div>

        <div className="areaRenderGastos">
          <h2 className="textTipo">Gastos</h2>
          {gastos.map((item) => (
            <div className="areadados">
              <p className="textValor">R${item.valor}</p>
              <p>{item.descricao}</p>

              <button
                className="bntExcluir"
                onClick={() => DeletarGastos(item.id)}
              >
                Excluir
              </button>
            </div>
          ))}
        </div>
      </div>

      
    </div>
  );
}
