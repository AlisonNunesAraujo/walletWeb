import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext({});

import { auth } from "../services/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function Context({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();



  async function RegisterUser(email, senha) {
    try {
      const data = await createUserWithEmailAndPassword(auth, email, senha);

      toast.success("Conta craida com sucesso!");
      navigate("/Home");

      // await LoadUser(data.user);
    } catch (err) {
      console;
      toast.error("Tente Novamente");
    }
  }

  async function LogarUser(email, senha) {
    try {
      const data = await signInWithEmailAndPassword(auth, email, senha);
      toast.success("Bem Vindo!");
      setUser(data);
     
      navigate("/Home");
    } catch (err) {
      toast.error("Tente novamente!");
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
      value={{ signed: !!user, user, RegisterUser, LogarUser, LogOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
