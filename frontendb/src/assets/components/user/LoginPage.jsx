import React, { useContext, useState } from 'react'
import "./LoginPage.css"
import api from '../../../api'
import { replace, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
const LoginPage = () => {

    const { setIsAuthenticated, get_username } = useContext(AuthContext)
    const location = useLocation()
    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const userinfo = { username, password }

    function handleSubmit(e) {

        setLoading(true)
        e.preventDefault()

        api.post("token/", userinfo)
            .then(res => {

                console.log(res.data)
                localStorage.setItem("access", res.data.access)
                localStorage.setItem("refresh", res.data.refresh)
                setUsername("")
                setPassword("")
                setIsAuthenticated(true)
                setLoading(false)
                get_username()
                setError("")

                if (username === "admin") {
                    const from = '/pending'
                    navigate(from, { replace: true })
                }
                else {
                    const from = location?.state?.from.pathname || '/'
                    navigate(from, { replace: true })
                }

            })
            .catch(err => {
                console.log(err.message)
                setLoading(false)
                setError(err.message)
            })
    }

    return (
        <div className="login-container my-5" >
            <div className="login-card shadow" style={{ background: "linear-gradient(135deg, #6A11CB, #2575FC)" }}>
                <h2 className="login-title" style={{ color: "white" }}>Welcome Back</h2>
                <p className="login-subtitle">Please login to your account</p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label" style={{ color: "white" }}>Username</label>
                        <input type="username" className="form-control" id="email"
                            value={username} onChange={(e) => setUsername(e.target.value)}
                            placeholder='Enter your username' required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label" style={{ color: "white" }}>Password</label>
                        <input type="password" className="form-control" id="password"
                            value={password} onChange={(e) => setPassword(e.target.value)}
                            placeholder='Enter your password' required />
                    </div>

                    <button className='btn btn-primary w-100' type='submit' disabled={loading}>Login</button>
                </form>
                <div className="login-footer">
                    {/* <p><a href="#">Forgot Password?</a></p> */}
                    <p>Don't have an account?<a href="/register">Sign up</a></p>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
