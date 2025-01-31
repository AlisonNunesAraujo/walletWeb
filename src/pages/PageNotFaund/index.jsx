import './style.css'
import { Link } from "react-router-dom";

export default function PageNotFaund() {
    return (
        <div className='PageNotFaund'>
            <h3>Obs: Essa pagina não existe!</h3>
            <Link to={'/'} className='link'>Login</Link>
        </div>
    );
}