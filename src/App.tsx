import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Products from './Components/Products';
import Client from './Components/Client';
import Login from './Components/Login';
import EntryPage from './Components/EntryPage';
import UserProfile from './Components/UserProfile';
import Settings from './Components/Settings';
import ProductDetails from './Components/ProductDetails';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<EntryPage />} />
        <Route path="/" element={<Login />}>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path='/client' element={<Client />} />
          <Route path='/profile' element={<UserProfile />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/product-details' element={<ProductDetails />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
