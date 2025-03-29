import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './assets/layouts/MainLayout'
import HomePage from './assets/components/home/HomePage'
import NotFoundPage from './assets/components/ui/NotFoundPage'
import ProductPage from './assets/components/products/ProductPage'
import { useEffect } from 'react'
import api from './api'
import CartPage from './assets/components/cart/CartPage'
import CheckoutPage from './assets/components/checkout/CheckoutPage'
import LoginPage from './assets/components/user/LoginPage'
import ProtectedRoute from './assets/components/ui/ProtectedRoute'
import { AuthProvider } from './assets/components/context/AuthContext'
import UserProfilePage from './assets/components/user/UserProfilePage'
import PaymentStatusPage from './assets/components/payment/PaymentStatusPage'
import RegisterPage from './assets/components/user/RegisterPage'
import PendingOrdersPage from './assets/components/admin/PendingOrdersPage'
import CompletedOrdersPage from './assets/components/admin/CompletedOrdersPage'

const App = () => {
  const [numCartItems, setNumCartItems] = useState(0)
  const cart_code = localStorage.getItem("cart_code")

  useEffect(function () {
    if (cart_code) {
      api.get(`get_cart_stat?cart_code=${cart_code}`)
        .then(res => {
          console.log(res.data)
          setNumCartItems(res.data.num_of_items)
        })
        .catch(err => {
          console.log(err.message)
        })
    }
  }, [])

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainLayout numCartItems={numCartItems} />}>
            <Route index element={<HomePage />} />
            <Route path='products/:slug' element={<ProductPage setNumCartItems={setNumCartItems} />} />
            <Route path='/cart' element={<CartPage setNumCartItems={setNumCartItems} />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/pending' element={<PendingOrdersPage/>} />
            <Route path='/completed' element={<CompletedOrdersPage/>} />
            <Route path='/register' element={<RegisterPage/>}></Route>
            <Route path='/checkout' element={<ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>} />
            <Route path='profile' element={<UserProfilePage/>} />
            <Route path='*' element={<NotFoundPage />}></Route>
            <Route path='/payment-status' element={<PaymentStatusPage setNumCartItems={setNumCartItems}/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
