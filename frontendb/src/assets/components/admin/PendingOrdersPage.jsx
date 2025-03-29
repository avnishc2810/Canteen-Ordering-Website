import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../../api';

const PendingOrdersPage = () => {

  const [userInfo, setUserInfo] = useState({});
  let navigate = useNavigate()

  useEffect(function () {
    api.get("user_info")
      .then(res => {
        console.log(res.data);
        setUserInfo(res.data);

        if (res.data.username !== "admin") {
          const from = "*";
          navigate(from, { replace: true })
        }
      })
      .catch(err => {
        console.log(err.message);
      })
  }, [])

  const [allOrders, setAllOrders] = useState([])
  useEffect(function () {
    api.get("get_orders")
      .then(res => {
        console.log(res.data);
        setAllOrders(res.data);

      })
      .catch(err => {
        console.log(err.message);
      })
  }, [])




  const markAsReady = (order) => {
    
    api.post("markasready", { order_id: order.transaction.order_id })
      .then(res => {
        console.log("database updated successfully!");
        console.log(`Order ${order.transaction.order_id} marked as ready`);
        toast.success("Order completed Successfully")
        
        api.get("get_orders")
          .then(res => {
            setAllOrders(res.data);  // this will automatically show only orders with status = "pending"
          })
          .catch(err => {
            console.log(err.message);
            toast.error("Failed to fetch updated orders");
          });
        

      })
      .catch(err => {
        console.log(err.message);
        console.error("Failed to update order:", error);
        toast.error("Failed to update order");
      })
  };


  const getWaitingTime = (created_at) => {
    const orderTime = new Date(created_at);
    const currentTime = new Date();
    const diffInMinutes = Math.floor((currentTime - orderTime) / (1000 * 60));
    return diffInMinutes;
  };

  return (
    <div style={{ padding: '1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Pending Orders</h1>

      {allOrders.filter((order) => (order.status === "pending")).length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}>
          <p style={{ fontSize: '1.125rem', color: '#6b7280' }}>No pending orders</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
          {allOrders.filter((order) => (order.status === "pending")).map((order) => (
            <div

              style={{
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden'
              }}
            >
              {/* Card Header */}
              <div style={{ padding: '1rem 1rem 0.5rem 1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>{order.transaction.order_id}</h3>
                  <span style={{ display: 'inline-flex', alignItems: 'center', padding: '0.25rem 0.5rem', fontSize: '0.75rem', borderRadius: '9999px', border: '1px solid #e5e7eb', color: '#4b5563' }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ marginRight: '0.25rem' }}
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    {getWaitingTime(order.created_at)} mins
                  </span>
                </div>
                <p style={{ color: '#6b7280', margin: '0.25rem 0' }}>{order.user_full_name}</p>
                {/* <p style={{ fontSize: '0.875rem', color: '#9ca3af', margin: '0.25rem 0' }}>
                Ordered at {formatTime(order.timestamp)}
            </p> */}
              </div>

              {/* Card Content */}
              <div style={{ padding: '0.5rem 1rem' }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {order.transaction.cart.items.map((item, index) => (
                    <li
                      key={index}
                      style={{
                        borderBottom: index === order.length - 1 ? 'none' : '1px solid #e5e7eb',
                        paddingBottom: '0.5rem',
                        marginBottom: '0.5rem'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: '500' }}>{item.product.name}</span>
                        <span>x{item.quantity}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Footer */}
              <div style={{ padding: '0.5rem 1rem 1rem 1rem' }}>
                <button
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.25rem',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                  onClick={() => markAsReady(order)}
                >
                  Mark as Ready
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingOrdersPage;

