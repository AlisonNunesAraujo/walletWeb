import { Navigate } from "react-router-dom";
import { AuthContext } from "../context"

import { useContext } from "react";

export default function Private({ children }) {
    const { signed } = useContext(AuthContext)

    if (!signed) {
        return <Navigate to='/' />
    }


    return children;
}

