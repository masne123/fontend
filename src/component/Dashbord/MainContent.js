import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MainContent.css'; // Make sure to create and import a CSS file for styling

const MainContent = ({ activeSection }) => {
  const [orderData, setOrderData] = useState([]);
  const [paymentData, setPaymentData] = useState([]);
  const [MotorcycleTypes, setMotorcycleTypes] = useState([]); // New state for MotorcycleTypes
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const [orderDataModal, setOrderDataModal] = useState({
    orderId: '',
    customer: '',
    status: 'Pending',
    amount: '',
    MotorcycleType: '', // This will store the selected motorcycle type
  });

  const [paymentDataModal, setPaymentDataModal] = useState({
    paymentId: '',
    amount: '',
    orderId: '',
    customerId: '',
  });

  const [customers, setCustomers] = useState([]);
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    phone: '',
  });

  const [dashboardData, setDashboardData] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0
  });

  const handleOrderModalToggle = () => setIsOrderModalOpen(!isOrderModalOpen);
  const handlePaymentModalToggle = () => setIsPaymentModalOpen(!isPaymentModalOpen);

  const handleOrderChange = (e) => setOrderDataModal({ ...orderDataModal, [e.target.name]: e.target.value });
  const handlePaymentChange = (e) => setPaymentDataModal({ ...paymentDataModal, [e.target.name]: e.target.value });

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    const newOrder = {
      order_number: orderDataModal.orderId,
      customer: parseInt(orderDataModal.customer),
      amount: parseFloat(orderDataModal.amount),
      status: orderDataModal.status,
      MotorcycleType: orderDataModal.MotorcycleType,  
    };

    try {
      const response = await fetch('https://backend-up33.onrender.com/api/orders/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOrder),
      });

      if (response.ok) {
        const createdOrder = await response.json();
        setOrderData([...orderData, createdOrder]);
        handleOrderModalToggle();
      } else {
        const error = await response.json();
        alert(`Failed to create order: ${error.message || 'Unknown error'}`);
      }
    } catch (error) {
      alert('An error occurred while submitting the order.');
    }
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    const paymentDataToSend = {
      payment_id: paymentDataModal.paymentId,
      amount: parseFloat(paymentDataModal.amount),
      order_number: paymentDataModal.orderId,
      customer_id: paymentDataModal.customerId,
      status: 'Pending',
    };

    try {
      const response = await fetch('https://backend-up33.onrender.com/api/payments/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentDataToSend),
      });

      if (response.ok) {
        const newPayment = await response.json();
        setPaymentData([...paymentData, newPayment]);
        handlePaymentModalToggle();
      } else {
        const error = await response.json();
        console.error('Failed to create payment:', error);
        alert(`Failed to create payment: ${error.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('An error occurred while submitting the payment:', error);
      alert('An error occurred while submitting the payment.');
    }
  };

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await fetch('https://backend-up33.onrender.com/api/orders/');
        const data = await response.json();
        setOrderData(data);
        setDashboardData(prevState => ({
          ...prevState,
          totalOrders: data.length
        }));
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    };

    fetchOrderData();
  }, []);

  useEffect(() => {
    const fetchMotorcycleTypes = async () => {
      try {
        const response = await fetch('https://backend-up33.onrender.com/api/MotorcycleType//');
        const data = await response.json();
        setMotorcycleTypes(data);
      } catch (error) {
        console.error('Error fetching motorcycle types:', error);
      }
    };

    fetchMotorcycleTypes();
  }, []);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await fetch('https://backend-up33.onrender.com/api/customers/');
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchCustomerData();
  }, []);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/dashboard-data');
        setDashboardData({
          totalOrders: response.data.totalOrders,
          totalRevenue: response.data.totalRevenue,
          pendingOrders: response.data.pendingOrders,
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="dashboard-cards">
            <div className="card">
              <h3>Total Orders</h3>
              <p>{dashboardData.totalOrders}</p>
            </div>
            <div className="card">
              <h3>Total Revenue</h3>
              <p>${dashboardData.totalRevenue}</p>
            </div>
            <div className="card">
              <h3>Pending Orders</h3>
              <p>{dashboardData.pendingOrders}</p>
            </div>
          </div>
        );
      case 'orders':
        return (
          <div className="orders-content">
            <h3>Manage Orders</h3>
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {orderData.map((order) => (
                  <tr key={order.id}>
                    <td>{order.order_number}</td>
                    <td>{order.customer}</td>
                    <td>{order.status}</td>
                    <td>{order.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={handleOrderModalToggle}>Place New Order</button>
          </div>
        );
      case 'payments':
        return (
          <div className="payments-content">
            <h3>Payment History</h3>
            <table className="payments-table">
              <thead>
                <tr>
                  <th>Payment ID</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {paymentData.map((payment) => (
                  <tr key={payment.id}>
                    <td>{payment.payment_id}</td>
                    <td>{payment.amount}</td>
                    <td>{payment.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={handlePaymentModalToggle}>Make Payment</button>
          </div>
        );
      case 'profile':
        return (
          <div className="profile-content">
            <h3>Profile Settings</h3>
            <form className="profile-form">
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  value={profileData.username}
                  onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                />
              </div>
              <button type="submit">Save Changes</button>
            </form>
          </div>
        );
      default:
        return <center><h3>THIS IS OVER VIEW OF SYSTEM</h3></center>;
        
    }
  };


  return (
    <div className="main-content">
      {renderContent()}

      {/* Order Modal */}
      {isOrderModalOpen && (
        <div className="modal-overlay" onClick={handleOrderModalToggle}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Place New Order</h3>
            <form onSubmit={handleOrderSubmit}>
              <div className="form-group">
                <label>Order Number</label>
                <input
                  type="text"
                  name="orderId"
                  value={orderDataModal.orderId}
                  onChange={handleOrderChange}
                  placeholder="Order Number"
                  required
                />
              </div>
              <div className="form-group">
                <label>Customer</label>
                <select
                  name="customer"
                  value={orderDataModal.id}
                  onChange={handleOrderChange}
                  required
                >
                  <option value="">Select Customer</option>
                  {customers.map((customer) => (
                    <option key={customer.first_name} value={customer.id}>
                      {customer.id}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Status</label>
                <input
                  type="text"
                  name="status"
                  value={orderDataModal.status}
                  onChange={handleOrderChange}
                  placeholder="Order Status"
                  required
                />
              </div>
              <div className="form-group">
                <label>Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={orderDataModal.amount}
                  onChange={handleOrderChange}
                  placeholder="Order Amount"
                  required
                />
              </div>
              <div className="form-group">
                <label>Motorcycle Type</label>
                <select
                  name="motoType"
                  value={orderDataModal.name}
                  onChange={handleOrderChange}
                  required
                >
                  <option value="">Select Motorcycle Type</option>
                  {MotorcycleTypes.map((MotorcycleType) => (
                    <option key={MotorcycleType.name} value={MotorcycleType.name}>
                      {MotorcycleType.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="modal-actions">
                <button type="submit">Submit Order</button><br></br>
                <button type="button" onClick={handleOrderModalToggle}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {isPaymentModalOpen && (
        <div className="modal-overlay" onClick={handlePaymentModalToggle}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Make Payment</h3>
            <form onSubmit={handlePaymentSubmit}>
              <div className="form-group">
                <label>Payment ID</label>
                <input
                  type="text"
                  name="paymentId"
                  value={paymentDataModal.paymentId}
                  onChange={handlePaymentChange}
                  placeholder="Payment ID"
                  required
                />
              </div>
              <div className="form-group">
                <label>Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={paymentDataModal.amount}
                  onChange={handlePaymentChange}
                  placeholder="Payment Amount"
                  required
                />
              </div>
              <div className="form-group">
                <label>Order Number</label>
                <select
                  name="orderId"
                  value={paymentDataModal.orderId}
                  onChange={handlePaymentChange}
                  required
                >
                  <option value="">Select Order</option>
                  {orderData.map((order) => (
                    <option key={order.id} value={order.order_number}>
                      {order.order_number}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Customer ID</label>
                <select
                  name="customerId"
                  value={paymentDataModal.customerId}
                  onChange={handlePaymentChange}
                  required
                >
                  <option value="">Select Customer</option>
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.id}
                    </option>
                  ))}
                </select>
              </div>
              <div className="modal-actions">
                <button type="submit">Submit Payment</button><br />
                <button type="button" onClick={handlePaymentModalToggle}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainContent;
