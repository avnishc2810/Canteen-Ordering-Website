import { useState } from 'react';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Handle registration logic here
        console.log({ username, email, password, phone});
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
                        <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Enter your username' required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" style={{ color: "white" }}>Email</label>
                        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" style={{ color: "white" }}>Password</label>
                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter your password' required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" style={{ color: "white" }}>Phone</label>
                        <input type="tel" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Enter your phone number' required />
                    </div>
                    
                    <button className='btn btn-primary w-100' type='submit' disabled={loading}>Register</button>
                </form>
                <div className="register-footer text-center mt-3">
                    <p style={{color:"white"}}>Already have an account? <a href="/login" style={{color:"black"}}>Login</a></p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
