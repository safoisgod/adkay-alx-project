import './css/navbar.css';
import { Link } from "react-router-dom";

function Navbar(){
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/catalog">
                        Catalog
                    </Link>
                </li>
                <li>
                    <Link to="/submit">
                        Submit
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar