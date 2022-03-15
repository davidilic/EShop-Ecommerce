import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {listProducts} from "../../redux/actions/productActions"
import ProductCard from "../../components/ProductCard"
import {Col, Row} from "react-bootstrap";
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import './home.css'

const Home = () => {
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const {loading, error, products } = productList

    useEffect( () => {
        dispatch(listProducts())
    }, [dispatch])

    return (
        <>
        <h1> Latest Products </h1>

        {loading ? <Loader/> : error ? <Message variant={'danger'}></Message> : 

        <Row>
            {
            products.map(product => (
                <Col key={product._id} xs={12} md={8} lg={4} xl={3}>
                    <ProductCard product={product}/>
                </Col>
            ))
            }
        </Row>
        }
    </>
)}

export default Home;
