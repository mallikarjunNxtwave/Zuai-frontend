import { useState } from "react";
import { useNavigate} from "react-router-dom";

import './index.css'

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [errorMsg, setError] = useState()

    const navigate = useNavigate();

    const onSubmitForm = async (event) => {
        event.preventDefault()
        setError("")
        const url = "https://zuai-ui6l.onrender.com/register"
        const details = {
            username, password, email,
        }
        const options = {
            method: 'POST',
            body: JSON.stringify(details),
            headers: {
                "Content-Type": "Application/json"
            }
        }
        const response = await fetch(url, options)
        if(response.ok){
            navigate('/login')
        }else {
            const data = await response.json()
            setError("*" + data.message)
        }
    }

    const handleStateChange = (event, setFunction) => {
        const {value} = event.target
        setFunction(value)
    }

    return (
        <div className="main-container">
            <form onSubmit={onSubmitForm} className="form-container">
                <h1 className="form-heading">REGISTER</h1>
                <div className="input-container">
                    <label htmlFor="USERNAME" className="input-label">USERNAME</label>
                    <input className="input-box" id="USERNAME" type="text" placeholder="username" value={username} onChange={(event) => handleStateChange(event, setUsername)}/>
                </div>
                <div className="input-container">
                    <label htmlFor="PASSWORD" className="input-label">PASSWORD</label>
                    <input className="input-box" id="PASSWORD" type="password" placeholder="password" value={password} onChange={(event) => handleStateChange(event, setPassword)}/>
                </div>
                <div className="input-container">
                    <label htmlFor="EMAIL" className="input-label">EMAIL</label>
                    <input className="input-box" id="EMAIL" type="text" placeholder="email" value={email} onChange={(event) => handleStateChange(event, setEmail)}/>
                </div>
                <button type="submit" className="login-button">Login</button>
                <p className="error-msg">{errorMsg}</p>
            </form>
        </div>
    )
}


export default Register