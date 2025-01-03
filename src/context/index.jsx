import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext({});

import { auth } from "../services/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc } from "firebase/firestore";
import {data, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setDoc } from "firebase/firestore";
import { db } from "../services/firebase";
export function Context({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [loading,setLoading] = useState(false)
  
  

  async function RegisterUser(email, senha) {
    setLoading(true)
    try {
      const data = await createUserWithEmailAndPassword(auth, email, senha);

      toast.success("Conta craida com sucesso!");
      navigate("/Home");

      setLoading(false)
      // await LoadUser(data.user);
    } catch (err) {
      setLoading(false)
      toast.error("Tente Novamente");
    }
  }



  async function LogarUser(email, senha) {
    setLoading(true)
    try {
      const data = await signInWithEmailAndPassword(auth, email, senha);
      toast.success("Bem Vindo!");
      setUser(data);
      console.log(data)
      setLoading(false)
      navigate("/Home");
    } catch (err) {
      toast.error("Tente novamente!");
      setLoading(false)
    }
  }

  async function LogOut() {
    signOut(auth)
      .then(() => {
        toast.success("Você saiu da conta!");
        setUser(null);
      })
      .catch((e) => {
        alert("deu algum erro", e);
      });
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, RegisterUser, LogarUser, LogOut,loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
