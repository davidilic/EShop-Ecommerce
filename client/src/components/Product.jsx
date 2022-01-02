import React from 'react';
import {Card} from 'react-bootstrap';
import Review from './Review';

const Product = ({ product }) => {
    return (
        <Card className="my-3">
            <a href={"/product/" + product._id}>
                <Card.Img src={product.image}/>
            </a>

            <Card.Body>
                <a href={"/product/" + product._id}>
                    <Card.Title as="div">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </a>

                <Card.Text>
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

}

export default Product;
