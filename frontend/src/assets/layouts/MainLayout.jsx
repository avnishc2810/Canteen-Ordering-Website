import React from 'react'
import NavBar from '../components/ui/Navbar'
import Footer from '../components/ui/Footer'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
  

const MainLayout = ({numCartItems}) => {
  return (
    <>
      <NavBar numCartItems = {numCartItems} />
      <ToastContainer />
      <Outlet />
      {/* <Footer /> */}
    </>
  )
}

export default MainLayout
