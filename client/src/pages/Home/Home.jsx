import React from 'react';
import products from "../../products";
import Product from "../../components/Product"
import {Col, Row} from "react-bootstrap";
import './home.css'

const Home = () => (
    <Row>
        {
        products.map(product => (
            <Col key={product._id} xs={12} md={8} lg={4} xl={3}>
                <Product product={product}/>
            </Col>
        ))
        }
    </Row>
)

export default Home;
