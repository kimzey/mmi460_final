// NavBar.js
import { Link } from 'react-router-dom';
import './NavBar.css'; // สไตล์เฉพาะสำหรับ Nav Bar

const NavBar = () => {
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/game1">Game 1 </Link>
                </li>
                <li>
                    <Link to="/game2">Game 2 </Link>
                </li>
                {/* เพิ่มลิงก์สำหรับหน้าที่คุณต้องการ */}
            </ul>
        </nav>
    );
}

export default NavBar;
