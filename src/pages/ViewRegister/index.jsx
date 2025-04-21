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
import Header from "../../components/header";
export default function ViewRegister() {
    const { user, LogOut } = useContext(AuthContext);
    const navigation = useNavigate();
    const [data, setData] = useState([]);
    const [gastos, setGastos] = useState([]);

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
                        date: doc.data().date,
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
                        date: doc.data().date,
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
        <div className="viewRegister">
            <Header />
            <div className="areaRenderDados">
                <div className="areaRenderReceita">
                    <h2 className="textTipo">Receita</h2>
                    {data.map((item) => (
                        <div key={item} className="areadados">
                            <p className="textValor"> {item.valor}</p>

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
                            <p className="textValor">{item.valor}</p>

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
