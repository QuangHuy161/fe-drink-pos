import './App.css';
import './App.scss';
import Main from './FE/main/Main';
import Supplies from './FE/main/Supplies/Supplies';
import 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
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
          <Route path="/" element={<Main/>}>
            <Route path="/banhang" component={<Supplies/>} />
            {/* <Route path="/nhanvien" component={Contact} /> */}
            {/* <Route path="/vattu" component={Contact} /> */}
            {/* <Route component={NotFound}/> */}
          </Route>
        </Routes>
      </div>
     
    </Router>
  );
}

export default App;
