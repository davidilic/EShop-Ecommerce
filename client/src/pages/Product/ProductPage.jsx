import React, {useEffect, useState} from 'react';
import {Row, Col, ListGroup, Image, Button, Card, Form} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import Review from "../../components/Review";
import './productpage.css'
import { listProductDetails, createProductReview } from '../../redux/actions/productActions.js'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { useNavigate } from "react-router-dom";

const ProductPage = (history) => {
    const selectedId = useParams().id

    const [qty, setQTY] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const {loading, error, product} = useSelector(state => state.productDetails)
    const {error: errorProductReview, success: successProductReview} = useSelector(state => state.productReviewCreate)
    const { userInfo } = useSelector(state => state.userLogin)

    const selectedProduct = product

    useEffect( () => {
        if(successProductReview){
            alert('Review submitted successfully')
            setRating(0)
            setComment('')
            dispatch({type: 'PRODUCT_REVIEW_CREATE_RESET'})
        }

        dispatch(listProductDetails(selectedId))
    }, [dispatch, selectedId, successProductReview])

    const navigate = useNavigate()

    const addToCartHandler = () =>{
        navigate('/cart/' + selectedId + "?qty=" + qty)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(selectedId, {rating, comment}))
    } 

    return ( 
        <div>
            <Link history={history} to={'/'} className={'btn btn-light my-3'}>Go Back</Link>
            {loading || selectedId !== product._id ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : 
                <>
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

                    <br/>

                    <Row>
                        <Col md={6}>
                            <h2>Reviews</h2>
                            {product.reviews.length === 0 && <Message>No Reviews</Message>}
                            <ListGroup>
                                {product.reviews.map(review => (
                                    <ListGroup.Item key={review._id}>
                                        <strong>{review.name}</strong>
                                        <Review rating={review.rating} text={review.review}/>
                                        <p>{review.createdAt.substring(0, 10)}</p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}

                                <ListGroup.Item>
                                    <h2>Write a Review</h2>
                                    {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                                    {userInfo ? (
                                        <Form onSubmit={submitHandler}>

                                            <Form.Group controlId='rating'>
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
                                                    <option value=''>Select...</option>
                                                    <option value='1'>1 - Poor</option>
                                                    <option value='2'>2 - Fair</option>
                                                    <option value='3'>3 - Good</option>
                                                    <option value='4'>4 - Very Good</option>
                                                    <option value='5'>5 - Excellent</option>
                                                </Form.Control>
                                            </Form.Group>

                                            <br/>

                                            <Form.Group controlId='comment'>
                                                <Form.Label>Comment</Form.Label>
                                                <Form.Control as='textarea' rows='3' value={comment} onChange={(e) => setComment(e.target.value)}/>
                                            </Form.Group>
                                            
                                            <br/>

                                            <Button type='submit' variant='primary' disabled={rating === '' || comment === ''}>Submit</Button>
                                        
                                        </Form>
                                    ) : <Message variant='danger'> Please <Link to='/login'>sign in</Link> to write a review </Message> }
                                </ListGroup.Item>

                            </ListGroup>
                            
                        </Col>
                    </Row>
                </>
            }


        </div>
    )
}

export default ProductPage;
