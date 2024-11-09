import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameHome from './component/game';
import GameTest1 from './component/gameTest1';
import GameTest2 from './component/gameTest2';
import FormGame1 from "./component/formGame1"
import FormGame2 from "./component/formGame2"

import NavBar from './component/navbar'; // นำเข้า NavBar
import { UserGameProvider } from './dataUser'; // นำเข้า UserGameProvider
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserGameProvider> {/* ห่อหุ้มแอปด้วย UserGameProvider */}
    <Router>
      <NavBar /> {/* แสดง NavBar ที่นี่ */}
      <Routes>
        <Route path="/" element={<GameHome />} />
        <Route path="/game1" element={<GameTest1 />} />
        <Route path="/game2" element={<GameTest2 />} />
        <Route path="/form1" element={<FormGame1 />} />
        <Route path="/form2" element={<FormGame2 />} />
      </Routes>
    </Router>
  </UserGameProvider>
);
