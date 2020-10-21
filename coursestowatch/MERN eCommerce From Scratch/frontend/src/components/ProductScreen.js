import React, { useEffect, useState } from "react";
import {
  Col,
  Card,
  Image,
  ListGroup,
  Row,
  ListGroupItem,
  Button,
  Form,
} from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import Rating from "../Rating";
import { useDispatch, useSelector } from "react-redux";
import { productDetail } from "../store/index";
const ProductScreen = (props) => {
  const { match, history } = props;

  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  const { productLoading, productDetailError, product } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(productDetail(match.params.id));
  }, [match, dispatch]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  return (
    <>
      {productLoading ? (
        <h1>Loading</h1>
      ) : productDetailError ? (
        <h1>{productDetailError}</h1>
      ) : (
        <>
          <Link className="btn btn-light my-3" to="/">
            Go Back
          </Link>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h2>{product.name}</h2>
                </ListGroupItem>
                <ListGroupItem>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  />
                </ListGroupItem>
                <ListGroupItem>Price ${product.price}</ListGroupItem>
                <ListGroupItem>Description {product.description}</ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroupItem>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                      </Col>
                    </Row>
                  </ListGroupItem>
                  {product.countInStock > 0 && (
                    <ListGroupItem>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  )}
                  <ListGroupItem>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add To Cart
                    </Button>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default withRouter(ProductScreen);
