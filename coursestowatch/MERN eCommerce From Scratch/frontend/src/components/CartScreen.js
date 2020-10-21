import React, { useEffect } from "react";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../store";

const CartScreen = ({ match, location, history }) => {
  const prodId = match.params.id;
  const qty = location.search ? +location.search.split("=")[1] : 1;
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  useEffect(() => {
    if (prodId) {
      dispatch(addToCart(prodId, qty));
    }
  }, [dispatch, prodId, qty]);
  const removeFormCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () => {
    history.push("/login/redirect=shipping");
  };
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {!cartItems.length ? (
          <>
            <h1>Your cart is empty</h1>
            <Link className="btn btn-light" to="/">
              Go Back
            </Link>{" "}
          </>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((c) => (
              <ListGroupItem key={c.product}>
                <Row>
                  <Col md={2}>
                    <Image src={c.image} alt={c.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${c.product}`}>{c.name}</Link>
                  </Col>
                  <Col md={2}>${c.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={c.qty}
                      onChange={(e) =>
                        dispatch(addToCart(c.product, +e.target.value))
                      }
                    >
                      {[...Array(c.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFormCartHandler(c.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2>
                Sub Total ({cartItems.reduce((a, b) => a + b.qty, 0)}) items
              </h2>
              ${cartItems.reduce((a, b) => a + b.qty * b.price, 0)}
            </ListGroupItem>
            <ListGroupItem>
              <Button
                type="button"
                className="btn btn-block btn-dark"
                disabled={!cartItems.length}
                onClick={checkoutHandler}
              >
                Checkout
              </Button>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
