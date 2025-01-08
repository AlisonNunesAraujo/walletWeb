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

  const [loading,setLoading] = useState(false)

  useEffect(()=>{
  async function VerUser(){
    try{
      const user =  localStorage.getItem('@user')
      if(user){
        setUser(JSON.parse('@user'))
      }
      return;
     }
     catch{
      setUser(null)
     }
   }
   VerUser();
    
    
  },[])
  
  async function LoadUser(user) {
     localStorage.setItem('@user', JSON.stringify(user))
  }
  

  async function RegisterUser(email, senha) {
    setLoading(true)
    try {
      const data = await createUserWithEmailAndPassword(auth, email, senha);

      toast.success("Conta craida com sucesso!");
      navigate("/Home");

      setLoading(false)
      await LoadUser(data.user);
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
      await LoadUser(data.user);
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
