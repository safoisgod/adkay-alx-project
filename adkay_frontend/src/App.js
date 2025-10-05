import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./components/Home.js";
import Submit from "./components/Submit.js";
import Catalog from "./components/Catalog.js";


function App() {
  return (
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/catalog' element={<Catalog />}/>
        <Route path='/submit' element={<Submit />}/>
      </Routes>
  );
}

export default App;
