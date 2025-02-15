import "./style.css";

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

  const [dados, setDados] = useState("");
  const [data, setData] = useState([]);
  const [gastos, setGastos] = useState([]);
  const [isActive, setIsActive] = useState(false);

  async function AddReceita(e) {
    e.preventDefault();
    if (dados === "") {
      toast.error("O campo deve ser preenchido!");
      return;
    }

    try {
      const response = await addDoc(collection(db, "receita"), {
        valor: dados,
        uid: user.user.uid,
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

        uid: user.user.uid,
      });
      setDados("");
      setDesc("");
      toast.success("Adicionado com sucesso!");
    } catch (e) {
      toast.error("Algo deu errado!");
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
    <div className="conteiner">
      <div className="area">
        <h2 className="title">Bem Vindo!</h2>
        <div className="areaEmail">
          <h3 className="textEmail">E-Mail: {user.user.email}</h3>

          <button className="bntSair" onClick={Sair}>
            Sair da Conta!
          </button>
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

        {isActive ? (

          <button
            onClick={() => setIsActive(!isActive)}
            className="bntMostrarList"
          >
            Ocultar lista!
          </button>
        ) : (
          <button
            onClick={() => setIsActive(!isActive)}
            className="bntMostrarList"
          >
            Mostrar lista!
          </button>
        )}
      </div>


      {isActive ? (
        <div className="areaRenderDados">
          <div className="areaRenderReceita">
            <h2 className="textTipo">Receita</h2>
            {data.map((item) => (
              <div key={item} className="areadados">
                <p className="textValor">R${item.valor}</p>

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
      ) : (
        <div></div>
      )}
    </div>
  );
}
