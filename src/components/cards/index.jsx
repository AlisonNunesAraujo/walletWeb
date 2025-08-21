import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { AuthContext } from "../../context";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../services/firebase";


export default function Cards() {
    
    const { user } = useContext(AuthContext);
    const [names, setName] = useState([]);
    const navigation = useNavigate();

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
        <div className="dashboard">
            <div className="areaTitle">
                <h2>Dashboard</h2>
                <div className="areaEmail">
                    {names.map((item, index) => (
                        <p>Olá {item.name}</p>
                    ))}
                    <p>email: {user.user.email}</p>
                </div>
            </div>
            <div className="areaBnts">
                <button onClick={() => navigation("/CreateRegister")}>
                    <p>Adicionar Receita/Gastos</p>
                </button>
                <button onClick={() => navigation("/ViewRegister")}>
                    <p>Ver registros</p>
                </button>
                <button onClick={() => navigation("/AccountFixed")}>
                    <p>Adicionar Conta Fixa!</p>
                </button>
                <button onClick={() => navigation("/ViewAccountFixed")}>
                    <p>Ver suas conta fixas</p>
                </button>
            </div>
        </div>
    );
}
