import { MdLogout } from "react-icons/md";
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";
import './index.css'

const Footer = () => {
    const navigate = useNavigate()
    const onLogout = () => {
        Cookies.remove("jwt_token",)
        Cookies.remove("username",)
        Cookies.remove("user_id",)

        navigate('/login')
    }
    return <div className="footer-container">
        <MdLogout className="logout-icon" onClick={onLogout}/>
    </div>
}

export default Footer