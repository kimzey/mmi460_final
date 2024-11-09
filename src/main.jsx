import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameHome from './component/game';
import GameTest1 from './component/gameTest1';
import GameTest2 from "./component/gameTest2"
import NavBar from './component/navbar'; // นำเข้า NavBar
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <NavBar /> {/* แสดง NavBar ที่นี่ */}
    <Routes>
      <Route path="/" element={<GameHome />} />
      <Route path="/game1" element={<GameTest1 />} />
      <Route path="/game2" element={<GameTest2 />} />

      {/* <Route path="/page-two" element={<PageTwo />} /> */}
    </Routes>
  </Router>
);
