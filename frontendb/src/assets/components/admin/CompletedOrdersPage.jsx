import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../api';


const CompletedOrdersPage = () => {

  const [userInfo, setUserInfo] = useState({});
  let navigate = useNavigate()

  useEffect(function () {
    api.get("user_info")
      .then(res => {
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




  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'table'

  const formatDateTime = (timestamp) => {
    return new Date(timestamp).toLocaleString([], {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculatePreparationTime = (orderTime, completedTime) => {
    if (!orderTime || !completedTime) return "N/A";

    const start = new Date(orderTime);
    const end = new Date(completedTime);

    if (isNaN(start) || isNaN(end)) return "Invalid date";

    const diffInMinutes = Math.floor((end - start) / (1000 * 60));
    return `${diffInMinutes} min`;
  };

  const itemsToString = (items) => {
    return items.map(item => `${item.product.name} (x${item.quantity})`).join(', ');
  };

  return (
    <div style={{ padding: '1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', margin: 0 }}>Completed Orders</h1>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            style={{
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              border: viewMode === 'cards' ? 'none' : '1px solid #e5e7eb',
              backgroundColor: viewMode === 'cards' ? '#3b82f6' : 'transparent',
              color: viewMode === 'cards' ? 'white' : '#4b5563',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}
            onClick={() => setViewMode('cards')}
          >
            Cards
          </button>
          <button
            style={{
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              border: viewMode === 'table' ? 'none' : '1px solid #e5e7eb',
              backgroundColor: viewMode === 'table' ? '#3b82f6' : 'transparent',
              color: viewMode === 'table' ? 'white' : '#4b5563',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}
            onClick={() => setViewMode('table')}
          >
            Table
          </button>
        </div>
      </div>

      {allOrders.filter((order) => (order.status === "completed")).length === 0  ? (
        <div style={{ textAlign: 'center', padding: '2rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}>
          <p style={{ fontSize: '1.125rem', color: '#6b7280' }}>No completed orders</p>
        </div>
      ) : (
        <>
          {viewMode === 'cards' ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
              {allOrders.filter((order) => order.status === "completed").map(order => (
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
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '0.25rem 0.5rem',
                        fontSize: '0.75rem',
                        borderRadius: '9999px',
                        backgroundColor: '#dcfce7',
                        color: '#166534'
                      }}>
                        {/* Check icon */}
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
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        Completed
                      </span>
                    </div>
                    <p style={{ color: '#6b7280', margin: '0.25rem 0' }}>{order.user_full_name}</p>
                  </div>

                  {/* Card Content */}
                  <div style={{ padding: '0.5rem 1rem 1rem 1rem' }}>
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem 0' }}>
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
                            <span>{item.product.name}</span>
                            <span>x{item.quantity}</span>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                        <span>Ordered:</span>
                        <span>{formatDateTime(order.created_at)}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                        <span>Completed:</span>
                        <span>{formatDateTime(order.modified_at)}</span>
                      </div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontWeight: '500',
                        marginTop: '0.5rem'
                      }}>
                        <span>Preparation Time:</span>
                        <span>{calculatePreparationTime(order.created_at, order.modified_at)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ backgroundColor: '#f9fafb' }}>
                  <tr>
                    <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Order #</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Student</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Items</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Ordered At</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Completed At</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Prep Time</th>
                  </tr>
                </thead>
                <tbody>
                  {allOrders.filter((order) => order.status === "completed").map((order, index) => (
                    <tr
                      key={order.id}
                      style={{ backgroundColor: index % 2 === 0 ? 'white' : '#f9fafb' }}
                    >
                      <td style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb', fontWeight: '500' }}>{order.transaction.order_id}</td>
                      <td style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>{order.user_full_name}</td>
                      <td style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>{itemsToString(order.transaction.cart.items)}</td>
                      <td style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>{formatDateTime(order.created_at)}</td>
                      <td style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>{formatDateTime(order.modified_at)}</td>
                      <td style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>{calculatePreparationTime(order.created_at, order.modified_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CompletedOrdersPage;