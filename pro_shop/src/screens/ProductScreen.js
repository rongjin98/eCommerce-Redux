import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productActions'
import { addToCart } from '../actions/cartActions'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Form, Alert } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProductScreen = () => {
    const [qty, setQty] = useState(1)
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails

    const [showAlert, setShowAlert] = useState(false)

    let {id} = useParams()
    // let navigate = useNavigate()

    useEffect(() => {
        dispatch(listProductDetails(id))}, [dispatch, id])
    
    
    
    
    const addToCartHandler = () => {
        // navigate(`/cart/${id}?qty=${qty}`)
        dispatch(addToCart(id, qty, "ADD"))
        setShowAlert(true)
    }


  return (
    <>
        <Alert variant='success' show={showAlert} dismissible onClose={() => setShowAlert(false)}>Added to cart</Alert>
        <Link className='btn btn-dark my-3' to="/">
            Go Back
        </Link>

        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>:
        <Row>
            <Col md={6}>
                <Image src={product.image} alt={product.name} fluid></Image>
            </Col>
            <Col md={3}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h3>{product.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Rating value={product.rating} text={`${product.numReviews} reviews`}></Rating>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Price: ${product.price}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Description: {product.description}
                    </ListGroup.Item>
                </ListGroup>
            </Col>

            <Col md={3}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <Row>
                                <Col>Price:</Col>
                                <Col>
                                    <strong>${product.price}</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Status:</Col>
                                <Col>
                                    {product.countInStock > 0 ? "In stock" : "Out of Stock"}
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        {product.countInStock > 0 && (
                            <ListGroupItem>
                                <Row>
                                    <Col>Qty</Col>
                                    <Col>
                                        {/* This part is not effective, change it to counter */}
                                        <Form.Control as='select' value={qty} onChange= {
                                            (e) => setQty(e.target.value)}>
                                        {[...Array(product.countInStock).keys()].map((x) => (
                                        <option key={x + 1} value={x + 1}>
                                            {x + 1}
                                        </option>
                                        ))}
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                        )}

                        <ListGroup.Item>
                            <Button
                                onClick={addToCartHandler} 
                                className='btn-block' 
                                type='button' 
                                disabled={product.countInStock === 0}>
                                Add to Cart
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
        }
    </>
    
  )
}

export default ProductScreen