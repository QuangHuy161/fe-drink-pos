import './App.css';
import './App.scss';
import Main from './FE/main/Main';
import Supplies from './FE/main/Supplies/Supplies';
import Order from './FE/main/Order/Order';
import Staff from './FE/main/Staff/staff';
import Login from './FE/main/Login/Login';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login/>}>

          </Route>
          <Route path="/admin" element={<Main/>} />
          <Route path="/banhang" element={<Order/>} />
          <Route path="/auth" element={<Login/>} />
        </Routes>
        
      </div>
      </Router>
  );
}

export default App;
