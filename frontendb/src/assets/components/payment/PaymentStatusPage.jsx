// import React, { useEffect, useState } from 'react'
// import { Link, useLocation } from 'react-router-dom'
// import api from '../../../api'
// const PaymentStatusPage = ({setNumCartItems}) => {

//   const [statusMessage,setStatusMessage] = useState("Verifying Payment")
//   const [statusSubMessage,setStatusSubMessage] = useState("Give us a moment while we are verifying your Payment!")

//   const location = useLocation()

//   useEffect(function(){
//     const queryParams = new URLSearchParams(location.search)
//     const status = queryParams.get('status')
//     const txRef = queryParams.get('tx_ref')
//     const transactionId = queryParams.get('transaction_id');

//     if(status && txRef && transactionId){
//       api.post(`payment-callback/?status=${status}&tx_ref=${txRef}&transaction_id=${transactionId}`)
//       .then(res => {
//         setStatusMessage(res.data.message)
//         setStatusSubMessage(res.data.subMessage)
//         localStorage.removeItem('cart_code')
//         setNumCartItems(0)
//       })
//       .catch(err => {
//         console.log(err.message)
//       })
//     }
//   },[])



//   return (
//     <header className="py-5" style={{
//         background: 'linear-gradient(135deg, #6A11CB, #2575FC)',
//       }}>
//         <div className="container px-4 px-lg-5 my-5">
//             <div className="text-center text-white">
//                 <h2 className="display-4 fw-bold">{`${statusMessage}`}</h2>
//                 <p className="text-white-75 fw-normal lead mb-4">{`${statusSubMessage}`}</p>
//                 <span>
//                     <Link to="#shop" className='btn btn-light btn-lg px-4 py-2 mx-3'>View Order Details</Link>
//                     <Link to="#shop" className='btn btn-light btn-lg px-4 py-2'>Continue Shopping</Link>
//                 </span>
//             </div>
//         </div>
//     </header>
//   )
// }

// export default PaymentStatusPage


import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import api from '../../../api'

const PaymentStatusPage = ({ setNumCartItems }) => {
  const [statusMessage, setStatusMessage] = useState("Verifying Payment")
  const [statusSubMessage, setStatusSubMessage] = useState("Give us a moment while we verify your payment!")

  const location = useLocation()
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const razorpay_payment_id = queryParams.get('razorpay_payment_id');
    const razorpay_order_id = queryParams.get('razorpay_order_id');
    const razorpay_signature = queryParams.get('razorpay_signature');
  
    if (razorpay_payment_id && razorpay_order_id && razorpay_signature) {
      api.post(`payment_callback/?razorpay_payment_id=${razorpay_payment_id}&razorpay_order_id=${razorpay_order_id}&razorpay_signature=${razorpay_signature}`)
        .then(res => {
          setStatusMessage(res.data.message);
          setStatusSubMessage(res.data.subMessage);
          localStorage.removeItem('cart_code');
          setNumCartItems(0);
        })
        .catch(err => {
          console.log(err.message);
        });
    }
  }, []);
  

  return (
    <header className="py-5" style={{ background: 'linear-gradient(135deg, #6A11CB, #2575FC)' }}>
      <div className="container px-4 px-lg-5 my-5">
        <div className="text-center text-white">
          <h2 className="display-4 fw-bold">{statusMessage}</h2>
          <p className="text-white-75 fw-normal lead mb-4">{statusSubMessage}</p>
          <span>
            <Link to="/orders" className="btn btn-light btn-lg px-4 py-2 mx-3">View Order Details</Link>
            <Link to="/shop" className="btn btn-light btn-lg px-4 py-2">Continue Shopping</Link>
          </span>
        </div>
      </div>
    </header>
  )
}

export default PaymentStatusPage
