import React from 'react';
import {Card} from 'react-bootstrap';
import Review from './Review';
import {Link} from "react-router-dom";

const ProductCard = ({ product }) => (
    <Card className="my-3">
        <Link to={"/product/" + product._id}>
            <Card.Img src={product.image}/>
        </Link>

        <Card.Body>
            <Link className="home--title" to={"/product/" + product._id}>
                <Card.Title as="div">
                    <strong>{product.name}</strong>
                </Card.Title>
            </Link>

            <Card.Text as="div">
                <div className="my-3">
                    <Review rating={product.rating} text={" from " + product.numReviews + " reviews"} />
                </div>
            </Card.Text>

            <Card.Text as="h3" className="product--price">
                ${product.price}
            </Card.Text>
        </Card.Body>
    </Card>
)


export default ProductCard;
