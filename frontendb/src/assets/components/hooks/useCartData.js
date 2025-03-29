import api from "../../../api"
import { useEffect , useState } from "react"

function useCartData(){
    const cart_code = localStorage.getItem("cart_code")
    const [cartItems, setCartItems] = useState([])
    const [cartTotal, setCartTotal] = useState(0)
    const tax = 0.75
    const[loading,setLoading] = useState(false)


    useEffect(function () {
        setLoading(true)
        api.get(`get_cart?cart_code=${cart_code}`)
            .then(res => {
                console.log(res.data)
                setLoading(false)
                setCartItems(res.data.items);
                setCartTotal(res.data.sum_total)
            })
            .catch(err => {
                console.log(err.message)
            })
    }, [cart_code])

    return {cartItems,setCartItems,cartTotal,setCartTotal,tax,loading}
}

export default useCartData