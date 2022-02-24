import React, {useEffect, useState} from 'react';
import {Row, Col, ListGroup, Image, Button, Card} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import Review from "../../components/Review";
import './productpage.css'
import axios from "axios";

const ProductPage = () => {
    const selectedId = useParams().id;
    const [selectedProduct, setSelectedProduct] = useState({});

    useEffect( () => {
        const fetchProduct = async () => {
            const {data} = await axios.get("/api/products/" + selectedId)
            setSelectedProduct(data)
        }
        fetchProduct()
    }, [])

    return (
        <div>
            <Link to={'/'} className={'btn btn-light my-3'}>Go Back</Link>

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

                            <ListGroup.Item>
                                <Row>
                                    <Button className={'btn-block'} disabled={selectedProduct.countInStock === 0} type={'button'}>Add To Cart</Button>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>

            </Row>

        </div>
    )
}

export default ProductPage;
