import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";

const Product = ({
  product: { image, _id, name, rating, numReviews, price },
}) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${_id}`}>
        <Card.Img src={image} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${_id}`}>
          <Card.Title as="div">
            <strong>{name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating rating={rating} numReviews={numReviews} />
        </Card.Text>
        <Card.Text as="div">
          <br />
          <h4>{price}$</h4>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
