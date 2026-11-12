import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import ProductList from './components/ProductList';
import Header from './components/Header';
import ProductDetails from './components/ProductDetails';
import ProtectedRoutes from './components/ProtectedRoutes';

import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

import Cart from './components/Cart';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="products/:id" element={<ProductDetails />} />
            <Route
              path="/cart"
              element={
                <ProtectedRoutes>
                  <Cart />
                </ProtectedRoutes>
              }
            />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
export default App;
