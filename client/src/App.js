import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';
import Home from "./pages/Home/Home";
import ProductPage from "./pages/Product/ProductPage";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Cart from "../src/pages/Cart/Cart"
import Login from "../src/pages/Login/Login"
import Register from "../src/pages/Register/Register"
import Profile from "../src/pages/Profile/Profile"
import Shipping from "../src/pages/Shipping/Shipping"

function App() {
  return (
    <Router>
        <Header/>
        <Container>
            <Routes>
              <Route path="/" element={<Home/>} exact />
              <Route path="/login" element={<Login/>} exact />
              <Route path="/shipping" element={<Shipping/>} exact />
              <Route path="/register" element={<Register/>} exact />
              <Route path="/profile" element={<Profile/>} exact />
              <Route path="/search/:keyword" element={<Home/>} exact />
              <Route path="/product/:id" element={<ProductPage/>} exact />
              <Route path="/cart" element={<Cart/>} >
                <Route path="/cart/:id" element={<Cart/>} />
              </Route>
            </Routes>
        </Container>
        <Footer/>
    </Router>
  );
}

export default App;
