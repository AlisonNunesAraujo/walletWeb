import "./style.css";

import { addDoc, doc, getDocs } from "firebase/firestore";

import { collection } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../services/firebase";
import { useEffect, useState } from "react";
import { deleteDoc } from "firebase/firestore";
import { AuthContext } from "../../context";
import { useContext } from "react";

import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const { user, LogOut } = useContext(AuthContext);

  const [dados, setDados] = useState("");
  const [data, setData] = useState([]);
  const [gastos, setGastos] = useState([]);

  async function AddReceita(e) {
    e.preventDefault();
    if (dados === "") {
      toast.error("O campo deve ser preenchido!");
      return;
    }

    try {
      const response = await addDoc(collection(db, "receita"), {
        valor: dados,
      });
      setDados("");
      toast.success("Adicionado com sucesso!");
    } catch (e) {
      alert(err);
    }
  }

  async function AddGastos(e) {
    e.preventDefault();
    if (dados === "") {
      toast.error("O campo deve ser preenchido!");
      return;
    }

    try {
      const response = await addDoc(collection(db, "gastos"), {
        valor: dados,
      });
      setDados("");
      toast.success("Adicionado com sucesso!");
    } catch (e) {
      toast.error("Algo deu errado!");
    }
  }

  useEffect(() => {
    async function Push() {
      const ref = collection(db, "receita");

      getDocs(ref).then((snapshot) => {
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
      const ref = collection(db, "gastos");

      getDocs(ref).then((snapshot) => {
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
  }, []);



  







  async function Sair() {
    LogOut();
  }

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
    <div className="conteiener">
      <div className="area">
        <div className="areaEmail">
          <h2 className="title">Gerencie suas movimentações de valores!</h2>
          <div className="areaBntSair">
            <h3 className="textEmail">E-mail: {user.user.email}</h3>
            <button className="bntSair" onClick={Sair}>
              Sair
            </button>
          </div>
        </div>
        <div className="areaInput">
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
            <div>
              <p className="textValor">R$ {item.valor}</p>
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
