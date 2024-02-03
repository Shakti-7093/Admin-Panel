import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Products from './Components/Products';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </>
  )
}

export default App
