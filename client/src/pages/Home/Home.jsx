import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {listProducts} from "../../redux/actions/productActions"
import ProductCard from "../../components/ProductCard"
import {Col, Row} from "react-bootstrap";
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import Paginate from '../../components/Paginate';
import './home.css'
import ProductCarousel from '../../components/ProductCarousel';

const Home = () => {
    const dispatch = useDispatch()

    const {loading, error, products, page, pages } = useSelector(state => state.productList)
    const { keyword, pageNumber: pageNumberStr } = useParams()

    const pageNumber = parseInt(pageNumberStr) || 1

    useEffect( () => {
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

    return (
        <>
            {!keyword ? <><br/><br/><ProductCarousel/><br/></> : null}

            <h1> Latest Products </h1>

            {loading ? <Loader/> : error ? <Message variant={'danger'}></Message> : 
            <>
                <Row>
                    {
                    products.map(product => (
                        <Col key={product._id} xs={12} md={8} lg={4} xl={3}>
                            <ProductCard product={product}/>
                        </Col>
                    ))
                    }
                </Row>
                <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}></Paginate>
            </>
            }   
        </>
    )}

export default Home;
