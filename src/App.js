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
  Route,
} from "react-router-dom";

import NotFound from './FE/main/Notfound/Notfound';
import RequireAuth from './FE/main/Login/RequireAuth';
import Create from './FE/main/Supplies/Create';




function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login/>}>
          </Route>
          <Route 
              element={<RequireAuth allowedRoles="admin"/> }
            >
                <Route path="/admin" element={<Main/>}>
                </Route>
                
            </Route>
          <Route 
              element= {<RequireAuth allowedRoles="staff"/>  }
            >
              <Route path="/banhang" element={<Order/>} />
            </Route>
          <Route path="/create" element={<Create/>}/>
          <Route path="/*" element={<NotFound/>} />
        </Routes>
        
      </div>
      </Router>
  );
}

export default App;
