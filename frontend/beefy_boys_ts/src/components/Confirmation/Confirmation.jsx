import React from 'react';
import './Confirmation.css';
import { useLocation } from 'react-router-dom';

export function Confirmation(props) {
  const location = useLocation();
  const { orderData, cartList } = location.state;

  return (
    <div className="confirmation-wrapper">
      <h2>Order Confirmation</h2>
      <div className="confirmation-section">
        <h3>Shipping Information</h3>
        <p>Name: {orderData.userName}</p>
        <p>Address: {orderData.userAddress}</p>
        <p>Total: {orderData.total}</p>
      </div>
      <div className="confirmation-section">
        <h3>Ordered Items</h3>
        <ul className="ordered-items-list">
          {cartList.map((item) => (
            <li key={item.id}>
              {item.shirtName} - Quantity: {item.count}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}