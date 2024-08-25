import { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import Cookies from 'js-cookie'

import './index.css'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setError] = useState('')

    const navigate = useNavigate();

    const handleStateChange = (event, setFunction) => {
        const { value } = event.target
        setFunction(value)
    }

    const onSubmitForm = async (event) => {
        event.preventDefault();
        setError('')
        const url = "https://zuai-ui6l.onrender.com/login"
        const details = {
            username,
            password
        }
        const options = {
            method: 'POST',
            body: JSON.stringify(details),
            headers: {
                "Content-Type": "Application/json"
            }
        }
        const response = await fetch(url, options)
        const data = await response.json()
        if (response.ok) {
            Cookies.set("jwt_token", data.jwtToken, { expires: 1 })
            Cookies.set("user_id", data.user_id, { expires: 1 })
            Cookies.set("username", data.username, { expires: 1 })
            navigate('/posts')
        }else {
            setError("*" + data.message)
        }

    }

    const jwtToken = Cookies.get('jwt_token')
    if(jwtToken !== undefined){
        return <Navigate to='/posts'/>
    }

    return (
        <div className="main-container">
            <form onSubmit={onSubmitForm} className="form-container">
                <h1 className="form-heading">LOGIN</h1>
                <div className="input-container">
                    <label htmlFor="USERNAME" className="input-label">USERNAME</label>
                    <input className="input-box" id="USERNAME" type="text" placeholder="username" value={username} onChange={(event) => handleStateChange(event, setUsername)} />
                </div>
                <div className="input-container">
                    <label htmlFor="PASSWORD" className="input-label">PASSWORD</label>
                    <input className="input-box" id="PASSWORD" type="password" placeholder="password" value={password} onChange={(event) => handleStateChange(event, setPassword)} />
                </div>
                <button type="submit" className="login-button">Login</button>
                <p className="error-msg">{errorMsg}</p>
                <Link to='/register'>Create User</Link>
            </form>
        </div>
    )
}

export default Login;