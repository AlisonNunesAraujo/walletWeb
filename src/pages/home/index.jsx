import "./style.css";

import { doc, getDocs, where, query, deleteDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../services/firebase";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context";
import Cards from "../../components/cards";
import Menu from "../../components/menu";

export default function Home() {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [gastos, setGastos] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    async function fetchReceita() {
      const uid = user.user.uid;
      const ref = collection(db, "receita");
      const receitaQuery = query(ref, where("uid", "==", uid));
      const snapshot = await getDocs(receitaQuery);
      let lista = [];
      snapshot.forEach((doc) => lista.push({ id: doc.id, valor: doc.data().valor }));
      return lista;
    }

    async function fetchGastos() {
      const uid = user.user.uid;
      const ref = collection(db, "gastos");
      const gastosQuery = query(ref, where("uid", "==", uid));
      const snapshot = await getDocs(gastosQuery);
      let lista = [];
      snapshot.forEach((doc) => lista.push({ id: doc.id, valor: doc.data().valor }));
      return lista;
    }

    setLoadingData(true);
    Promise.all([fetchReceita(), fetchGastos()]).then(([receitas, gastosList]) => {
      setData(receitas);
      setGastos(gastosList);
      setLoadingData(false);
    });
  }, [refresh]);

  async function Deletar(id) {
    const ref = doc(db, "receita", id);
    await deleteDoc(ref)
      .then(() => { toast.success("Excluído com sucesso!"); setRefresh((r) => r + 1); })
      .catch(() => toast.error("Algo deu errado!"));
  }

  async function DeletarGastos(id) {
    const ref = doc(db, "gastos", id);
    await deleteDoc(ref)
      .then(() => { toast.success("Excluído com sucesso!"); setRefresh((r) => r + 1); })
      .catch(() => toast.error("Algo deu errado!"));
  }

  return (
    <div className="conteiner">
      <div className="globo">
        <Menu />
        <Cards data={data} gastos={gastos} loadingData={loadingData} />
      </div>
    </div>
  );
}