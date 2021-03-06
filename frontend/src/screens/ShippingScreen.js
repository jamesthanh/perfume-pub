import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormController from '../components/FormController';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../actions/cartActions';

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [phoneNumber, setPhoneNumber] = useState(shippingAddress.phoneNumber);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ address, phoneNumber, city, postalCode, country })
    );

    history.push('/payment');
  };

  return (
    <FormController>
      <CheckoutSteps step1 step2 />
      <h1>Chuyển hàng</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          <Form.Label>Địa chỉ nhận hàng</Form.Label>
          <Form.Control
            type='text'
            placeholder='Địa chỉ khách hàng'
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='phoneNumber'>
          <Form.Label>Số điện thoại</Form.Label>
          <Form.Control
            type='number'
            placeholder='Số điện thoại'
            value={phoneNumber}
            required
            onChange={(e) => setPhoneNumber(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='city'>
          <Form.Label>Thành phố</Form.Label>
          <Form.Control
            type='text'
            placeholder=''
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='postalCode'>
          <Form.Label>Mã bưu điện</Form.Label>
          <Form.Control
            type='text'
            placeholder=''
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='country'>
          <Form.Label>Quốc gia</Form.Label>
          <Form.Control
            type='text'
            placeholder=''
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Tiếp tục
        </Button>
      </Form>
    </FormController>
  );
};

export default ShippingScreen;
