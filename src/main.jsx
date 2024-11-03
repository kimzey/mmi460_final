import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameHome from './component/game';
import GameTest1 from './component/gameTest1';
// import PageTwo from './PageTwo';
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<GameHome />} />
      <Route path="/GameTest1" element={<GameTest1 />} />
      {/* <Route path="/page-two" element={<PageTwo />} /> */}
    </Routes>
  </Router>
);
