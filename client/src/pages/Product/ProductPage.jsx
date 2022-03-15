import React, {useEffect, useState} from 'react';
import {Row, Col, ListGroup, Image, Button, Card, Form} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import Review from "../../components/Review";
import './productpage.css'
import { listProductDetails } from '../../redux/actions/productActions.js'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { useNavigate } from "react-router-dom";

const ProductPage = (history) => {
    const selectedId = useParams().id

    const [qty, setQTY] = useState(1)

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails
    const selectedProduct = product

    useEffect( () => {
        dispatch(listProductDetails(selectedId))
    }, [dispatch, selectedId])

    const navigate = useNavigate()

    const addToCartHandler = () =>{
        navigate('/cart/' + selectedId + "?qty=" + qty)
    }

    return (
        <div>
            <Link history={history} to={'/'} className={'btn btn-light my-3'}>Go Back</Link>
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : 
                <Row>

                        <Col md={6}>
                            <Image src={selectedProduct.image} alt={selectedProduct.name} fluid/>
                        </Col>
        
                        <Col md={3}>
                            <ListGroup variant={'flush'}>
                                <ListGroup.Item>
                                    <h3>{selectedProduct.name}</h3>
                                </ListGroup.Item>
        
                                <ListGroup.Item>
                                    <Review rating={selectedProduct.rating} text={" from " + selectedProduct.numReviews + " reviews"}/>
                                </ListGroup.Item>
        
                                <ListGroup.Item>
                                    Price: ${selectedProduct.price}
                                </ListGroup.Item>
        
                                <ListGroup.Item>
                                    {selectedProduct.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
        
                        <Col md={3}>
                            <Card>
                                <ListGroup variant={'flush'}>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col><strong>${selectedProduct.price}</strong></Col>
                                        </Row>
                                    </ListGroup.Item>
        
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>
                                                <strong>{selectedProduct.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Quantity:</Col>
                                                <Col>
                                                    <Form.Control as='select' value={qty} onChange={(e) => setQTY(e.target.value)}>
                                                        {[...Array(product.countInStock).keys()].map(x => (
                                                            <option key={x + 1}>{x + 1}</option>
                                                        ))}
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}

                                    <ListGroup.Item>
                                        <Row>
                                            <Button onClick={addToCartHandler} className={'btn-block'} disabled={selectedProduct.countInStock === 0} type={'button'}>Add To Cart</Button>
                                        </Row>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
        
                </Row>
            }


        </div>
    )
}

export default ProductPage;
