import { FaRegSquarePlus } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'
import './index.css'
import { useState } from "react";

const Header = () => {
    const [heading, setHeading] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setUrl] = useState('');

    const loggedUser = Cookies.get("username")

    const handleStateChange = (event, setFunction) => {
        const { value } = event.target
        setFunction(value)
    }

    const onClickCreate = async () => {
        if (heading !== '' & description !== '' & imageUrl !== '') {
            const url = 'https://zuai-ui6l.onrender.com/posts'
            const details = {
                heading, description, imageUrl,
                username: loggedUser
            }
            const options = {
                method: 'POST',
                body: JSON.stringify(details),
                headers: {
                    "Content-Type": "Application/json"
                }
            }
            const response = await fetch(url, options)
            console.log(response)
        }
    }

    const createContainer = () => {
        return (
            <div className="popup-container">
                <Popup
                    modal
                    trigger={
                        <FaRegSquarePlus className="react-icon" />
                    }>
                    {close => (
                        <div className="popup-content-container">
                            <form className="input-form-container">
                                <IoIosClose onClick={() => close()} className="close-icon" />

                                <div className="input-container">
                                    <lable htmlFor="HEADING" className="lable-text">HEADING</lable>
                                    <input id="HEADING" placeholder="Heading" type="text" className="input-box" value={heading} onChange={(event) => handleStateChange(event, setHeading)} />
                                </div>
                                <div className="input-container">
                                    <lable htmlFor="DESCRIPTION" className="lable-text">DESCRIPTION</lable>
                                    <textarea id="DESCRIPTION" rows="6" cols="22" placeholder="Description" className="textarea" value={description} onChange={(event) => handleStateChange(event, setDescription)} />
                                </div>
                                <div className="input-container">
                                    <lable htmlFor="IMAGEURL" className="lable-text">IMAGE URL</lable>
                                    <input id="IMAGEURL" placeholder="Image Url" type="text" className="input-box" value={imageUrl} onChange={(event) => handleStateChange(event, setUrl)} />
                                </div>
                                <button type='button' className="create-button" onClick={onClickCreate}>Create</button>
                            </form>
                        </div>
                    )}

                </Popup>
            </div>
        )
    }

    return <div className="header-container">
        <div className='user-logo-container'><p className='username-letter'>{loggedUser[0].toUpperCase()}.</p></div>
        <h1 className="header-heading">Blog Spot</h1>
        <div className='create-new-container'>
            <p className="new-text">New</p>
            {createContainer()}
        </div>
    </div>
}

export default Header;