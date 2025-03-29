import { jwtDecode } from "jwt-decode";
import { Children, createContext, useEffect, useState } from "react";
import api from "../../../api";


export const AuthContext = createContext(false)

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [username, setUsername] = useState("")

    // const handleAuth = () => {
    //     const token = localStorage.getItem("access")
    //     const decoded = jwtDecode(token)
    //     const expiry_date = decoded.exp
    //     const current_time = Date.now() / 1000
    //     if (expiry_date >= current_time) {
    //         setIsAuthenticated(true)
    //     }
    // }

    const handleAuth = () => {
        const token = localStorage.getItem("access");

        if (!token) {  // Check if token exists
            setIsAuthenticated(false);
            return;
        }

        try {
            const decoded = jwtDecode(token);
            const expiry_date = decoded.exp;
            const current_time = Date.now() / 1000;

            if (expiry_date >= current_time) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
                localStorage.removeItem("access"); // Remove expired token
            }
        } catch (error) {
            console.error("Invalid token:", error);
            setIsAuthenticated(false);
            localStorage.removeItem("access"); // Remove invalid token
        }
    };
    const get_username = () => {
        api.get("get_username")
            .then(res => {
                setUsername(res.data.username)
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    useEffect(function () {
        handleAuth()
        get_username()
    }, [])

    const authValue = { isAuthenticated, username, setIsAuthenticated, get_username }

    return <AuthContext.Provider value={authValue} >
        {children}
    </AuthContext.Provider>
}