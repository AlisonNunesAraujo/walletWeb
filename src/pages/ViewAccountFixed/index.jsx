import { useEffect, useState } from "react";
import {
    collection,
    getDocs,
    where,
    query,
    deleteDoc,
    doc,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import { useContext } from "react";
import { AuthContext } from "../../context";
import Header from "../../components/header";
import { toast } from "react-toastify";
import "./style.css";

export default function ViewAccountFixed() {
    const [conta, setConta] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        async function Contas() {
            const uid = user.user.uid;
            const ref = collection(db, "Account");

            const contaQuery = query(ref, where("uid", "==", uid));

            getDocs(contaQuery).then((snapshot) => {
                let lista = [];

                snapshot.forEach((doc) => {
                    lista.push({
                        id: doc.id,
                        nameAccount: doc.data().nameAccount,
                        valor: doc.data().valor,
                        vencimento: doc.data().vencimento,
                    });
                });
                setConta(lista);
            });
        }

        Contas();
    }, [Del]);

    async function Del(id) {
        const ref = doc(db, "Account", id);

        await deleteDoc(ref)
            .then(() => {
                toast.success("Excluido com sucesso!");
            })
            .catch((err) => {
                toast.error("Algo deu errado!");
            });
    }

    return (
        <div className="AccountFixed">
            <Header />
            <div className="title">
                <h1>Seus registros de contas fixas mensais!</h1>
            </div>
            <div className="renderAccount">
                {conta.length > 0 ? (
                    conta.map((item) => (
                        <div className="areaRender" key={item.id}>
                            <p>Conta: {item.nameAccount}</p>
                            <p>Valor: {item.valor}</p>
                            <p>Vencimento: {item.vencimento}</p>
                            <button onClick={() => Del(item.id)}>
                                Excluir
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="textInfo">Nenhuma conta cadastrada!</p>
                )
                }
            </div>
        </div>
    );
}
