import React from 'react';
import products from "../../products";
import ProductCard from "../../components/ProductCard"
import {Col, Row} from "react-bootstrap";
import './home.css'

const Home = () => (
    <Row>
        {
        products.map(product => (
            <Col key={product._id} xs={12} md={8} lg={4} xl={3}>
                <ProductCard product={product}/>
            </Col>
        ))
        }
    </Row>
)

export default Home;
