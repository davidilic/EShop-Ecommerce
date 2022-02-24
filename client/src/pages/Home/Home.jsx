import React, {useEffect, useState} from 'react';
import ProductCard from "../../components/ProductCard"
import {Col, Row} from "react-bootstrap";
import './home.css'
import axios from 'axios'

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect( () => {
        const fetchProducts = async () => {
            const {data} = await axios.get("/api/products")
            setProducts(data)
        }
        fetchProducts()
    }, [])

    return (
    <Row>
        {
        products.map(product => (
            <Col key={product._id} xs={12} md={8} lg={4} xl={3}>
                <ProductCard product={product}/>
            </Col>
        ))
        }
    </Row>
)}

export default Home;
