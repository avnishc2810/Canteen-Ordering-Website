import React, { useEffect, useState } from 'react'
import UserInfo from './UserInfo'
import OrderHistoryItemContainer from './OrderHistoryItemContainer'
import api from '../../../api'
import Spinner from '../ui/Spinner'

const UserProfilePage = () => {

    const [userInfo,setUserInfo] = useState({})
    const [loading,setLoading] = useState(false)
    const [orderItems,setOrderItems] = useState([])

    useEffect(function(){
        setLoading(true)
        api.get("user_info")
        .then(res=>{
            console.log(res.data)
            setUserInfo(res.data)
            setOrderItems(res.data.items)
            setLoading(false)
        })
        .catch(err => {
            console.log(err.message)
            setLoading(false)
        })
    },[])
    
   


    if(loading){
        return <Spinner loading={loading} />
    }

    return (
        <div className='container my-5'>
            <UserInfo userInfo = {userInfo} />

            {userInfo.username !== "admin" && <OrderHistoryItemContainer orderItems = {orderItems} />}
        </div>
    )
}

export default UserProfilePage
