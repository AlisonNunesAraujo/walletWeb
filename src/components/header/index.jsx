
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
export default function Header() {

    const navigation = useNavigate();
    return (

        <div className="header">
            <FaArrowLeft
                size={24}
                color="white"
                className="icon"
                onClick={() => navigation("/home")}
            />
            <p>Voltar</p>
        </div>

    );
}