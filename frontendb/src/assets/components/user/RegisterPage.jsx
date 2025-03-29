    import { useState } from 'react';
    import api from '../../../api';
    import { replace ,useNavigate} from 'react-router-dom';

    const RegisterPage = () => {
        const [username, setUsername] = useState('');
        const [first_name, setFirstName] = useState('');
        const [last_name, setLastName] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [password2, setPassword2] = useState('');
        const [phone, setPhone] = useState('');
        const [loading, setLoading] = useState(false);

        const navigate = useNavigate()

        function handleSubmit (e){
            e.preventDefault();
            setLoading(true);

            const registerData = { username, first_name, last_name, email, password, phone };
            if(password !== password2){
                alert("Both Passwords do not match.")
            }

            api.post("register/",registerData)
            .then(res => {
                console.log(res.data);
                setLoading(false)
                alert("User has been created successfully")
                const from = "/login"
                navigate(from,{replace:true})
            })
            .catch(err =>{
                console.log(err.message);
                setLoading(false)
            })
            
            setLoading(false);
        };

        return (
            <div className="register-container my-5 d-flex justify-content-center">
                <div className="register-card shadow p-4" style={{ background: "linear-gradient(135deg, #6A11CB, #2575FC)", width: "400px", borderRadius: "10px" }}>
                    <h2 className="register-title text-center" style={{ color: "white" }}>Register Your Account</h2>
                    <p className="register-subtitle text-center" style={{color:"white"}}>Please fill in the details to create an account</p>
                    
                 

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label" style={{ color: "white" }}>Username</label>
                            <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" style={{ color: "white" }}>First Name</label>
                            <input type="text" className="form-control" value={first_name} onChange={(e) => setFirstName(e.target.value)} placeholder="Enter your First Name" required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" style={{ color: "white" }}>Last Name</label>
                            <input type="text" className="form-control" value={last_name} onChange={(e) => setLastName(e.target.value)} placeholder="Enter your Last Name" required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" style={{ color: "white" }}>Email</label>
                            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" style={{ color: "white" }}>Password</label>
                            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" style={{ color: "white" }}>Confirm Password</label>
                            <input type="password" className="form-control" value={password2} onChange={(e) => setPassword2(e.target.value)} placeholder="Confirm your password" required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" style={{ color: "white" }}>Phone</label>
                            <input type="tel" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter your phone number" required />
                        </div>
                        
                        <button className='btn btn-primary w-100' type='submit' disabled={loading}>
                            {loading ? "Registering..." : "Register"}
                        </button>
                    </form>
                    <div className="register-footer text-center mt-3">
                        <p style={{color:"white"}}>Already have an account? <a href="/login" style={{color:"black"}}>Login</a></p>
                    </div>
                </div>
            </div>
        );
    };

    export default RegisterPage;
