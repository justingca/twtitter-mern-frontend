import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import './users.css';
import { Link } from "react-router-dom";
import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";


const LoginPage = () => {
    const [loginUsername, setLoginUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoading, error } = useLogin();

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        await login(loginUsername, password);
    }

    return(
        <div className="login-container bg-black min-vh-100 min-vw-100 px-0 d-flex position-fixed flex-md-row flex-column">
            <div className="login-left text-white d-flex align-items-center justify-content-center">
                <FontAwesomeIcon icon={faXTwitter} className="login-logo"/>
            </div>
            <div className="login-right d-flex flex-column align-items-center justify-content-center text-white">
                <h1 className="mb-3">Login</h1>
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} action="" className="login-form d-flex flex-column align-items-center gap-5 w-100">
                    <input type="text" className="login-form-input" placeholder="Username"
                        value={loginUsername}
                        onChange={(ev) => setLoginUsername(ev.target.value)}
                    />
                    <input type="password" className="login-form-input" placeholder="Password"
                        value={password}
                        onChange={(ev) => setPassword(ev.target.value)}
                    />
                    <button disabled={isLoading} className="login-form-button login-button">Login</button>
                </form>
                <div className="text-white mt-2 d-flex flex-column align-items-center gap-2">
                    <h5>Dont have an account?</h5>
                    <Link to="/signup" disabled={isLoading}><button className="login-form-button signup-button">Create Account</button></Link>
                </div>
            </div>
        </div>
    )
}

export default LoginPage