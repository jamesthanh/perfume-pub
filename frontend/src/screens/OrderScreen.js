import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails } from '../actions/orderActions';

const OrderScreen = ({ match }) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  if (!loading) {
    // const addDecimals = (num) => {
    //   return (Math.round(num * 100) / 100).toFixed(2);
    // };

    // Cal prices
    order.itemsPrice = order.orderItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
  }

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1>Hóa đơn {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Chuyển hàng</h2>
              <p>
                <strong>Tên khách hàng:</strong> {order.user.name}
              </p>
              <p>
                <strong>Số điện thoại:</strong> 0
                {order.shippingAddress.phoneNumber}
              </p>
              <p>
                <strong>Email:</strong>{' '}
                <a href={`mailto:{order.user.email}`}>{order.user.email}</a>
              </p>

              <p>
                <strong>Địa chỉ:</strong> {order.shippingAddress.address},{' '}
                {order.shippingAddress.city} {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Đã nhận hàng vào {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Chưa nhận hàng</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Phương thức thanh toán</h2>
              <p>
                <strong>Trả qua: </strong>
                {order.paymentMethod}{' '}
              </p>
              {order.isPaid ? (
                <Message variant='success'>
                  Đã thanh toán vào {order.paidAt}
                </Message>
              ) : (
                <Message variant='danger'>Chưa thanh thoán</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Sẩn phẩm</h2>
              {order.orderItems.length === 0 ? (
                <Message>Đơn hàng trống</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x {item.price}₫ = {item.qty * item.price}₫
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Đơn đặt hàng</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Sản phẩm</Col>
                  <Col>{order.itemsPrice}₫</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Phí vận chuyển</Col>
                  <Col>{order.shippingPrice}₫</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Thuế</Col>
                  <Col>{order.taxPrice}₫</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tổng cộng</Col>
                  <Col>{order.totalPrice}₫</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item></ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
