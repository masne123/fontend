// HII NI SEHEMU KUU YA SYSTEM
import React, { useState } from 'react';

// Sample data for each section to make the content more realistic
const dashboardData = {
  totalOrders: 1250,
  totalRevenue: 85000,
  pendingOrders: 50
};

const orderData = [
  { orderId: 'ORD001', customer: 'John Doe', status: 'Shipped', amount: '$250' },
  { orderId: 'ORD002', customer: 'Jane Smith', status: 'Pending', amount: '$175' },
  { orderId: 'ORD003', customer: 'Alice Brown', status: 'Delivered', amount: '$120' },
];

const paymentData = [
  { paymentId: 'PAY001', amount: '$250', status: 'Completed' },
  { paymentId: 'PAY002', amount: '$175', status: 'Pending' },
  { paymentId: 'PAY003', amount: '$120', status: 'Completed' },
];

const MainContent = ({ activeSection }) => {
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    phone: '',
  });

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const [orderDataModal, setOrderDataModal] = useState({
    orderId: '',
    customer: '',
    status: 'Pending',
    amount: '',
    motoType: ''
  });

  const [paymentDataModal, setPaymentDataModal] = useState({
    paymentId: '',
    amount: '',
    orderId: ''
  });

  const handleOrderModalToggle = () => setIsOrderModalOpen(!isOrderModalOpen);
  const handlePaymentModalToggle = () => setIsPaymentModalOpen(!isPaymentModalOpen);

  const handleOrderChange = (e) => setOrderDataModal({ ...orderDataModal, [e.target.name]: e.target.value });
  const handlePaymentChange = (e) => setPaymentDataModal({ ...paymentDataModal, [e.target.name]: e.target.value });

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    console.log('New Order:', orderDataModal);
    handleOrderModalToggle(); // Close the modal after submitting
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    console.log('Payment Information:', paymentDataModal);
    handlePaymentModalToggle(); // Close the modal after submitting
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="dashboard-content">
            <h3>Overview</h3>
            <div className="dashboard-stats">
              <div className="stat-card">
                <h4>Total Orders</h4>
                <p>{dashboardData.totalOrders}</p>
              </div>
              <div className="stat-card">
                <h4>Total Revenue</h4>
                <p>{dashboardData.totalRevenue} USD</p>
              </div>
              <div className="stat-card">
                <h4>Pending Orders</h4>
                <p>{dashboardData.pendingOrders}</p>
              </div>
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
                  <tr key={order.orderId}>
                    <td>{order.orderId}</td>
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
                  <tr key={payment.paymentId}>
                    <td>{payment.paymentId}</td>
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
                <input type="text" value={profileData.username} onChange={(e) => setProfileData({ ...profileData, username: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={profileData.email} onChange={(e) => setProfileData({ ...profileData, email: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input type="tel" value={profileData.phone} onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })} />
              </div>
              <button type="submit">Save Changes</button>
            </form>
          </div>
        );
      default:
        return <h3>Select a section to view details.</h3>;
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
                <label>Order ID</label>
                <input
                  type="text"
                  name="orderId"
                  value={orderDataModal.orderId}
                  onChange={handleOrderChange}
                  placeholder="Order ID"
                  required
                />
              </div>
              <div className="form-group">
                <label>Customer</label>
                <input
                  type="text"
                  name="customer"
                  value={orderDataModal.customer}
                  onChange={handleOrderChange}
                  placeholder="Customer Name"
                  required
                />
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
                <input
                  type="text"
                  name="motoType"
                  value={orderDataModal.motoType}
                  onChange={handleOrderChange}
                  placeholder="Motorcycle Type"
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="submit">Submit Order</button>
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
                <label>Order ID</label>
                <input
                  type="text"
                  name="orderId"
                  value={paymentDataModal.orderId}
                  onChange={handlePaymentChange}
                  placeholder="Order ID"
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="submit">Submit Payment</button>
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
