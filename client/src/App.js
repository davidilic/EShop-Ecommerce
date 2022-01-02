import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';
import Home from "./pages/Home/Home";
import ProductPage from "./pages/ProductPage/ProductPage";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <Router>
        <Header/>
        <Container>
            <Routes>
                <Route path="/" element={<Home/>} exact />
                <Route path="/product/:id" element={<ProductPage/>} exact />
            </Routes>
        </Container>
        <Footer/>
    </Router>
  );
}

export default App;
