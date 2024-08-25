import Header from '../header'
import Footer from '../footer'
import './index.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { format } from 'date-fns'
import Popup from 'reactjs-popup'
import { IoIosClose } from "react-icons/io";
import Cookies from 'js-cookie'

const DetailedPost = () => {
    const [post, setPost] = useState('')
    const [apiStatus, setApiStatus] = useState('INITIAL')
    const [heading, setHeading] = useState('')
    const [description, setDescription] = useState('');
    const [imageUrl, setUrl] = useState('');

    const loggedUser = Cookies.get("username")

    const { id } = useParams()

    const GetPost = async () => {
        setApiStatus('INPROGRESS')
        const url = `https://zuai-ui6l.onrender.com/posts/${id}`
        const response = await fetch(url);
        const data = await response.json()
        if (response.ok) {
            setPost(data.post)
            setApiStatus('SUCCESS')
        } else {
            setApiStatus('FAILURE')
        }
    }

    useEffect(() => {
        GetPost();
    }, [])

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

    const update = () => (
        <div className='popup-container'>
            <Popup
                modal
                trigger={
                    <button type='button' className='create-button'>Update</button>
                }
            >

                {close => {
                    <div className='popup-content-container'>
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
                }}
            </Popup>
        </div>
    )

    const renderSuccessView = () => {
        const { _id, username, heading, description, createdDate, imageUrl } = post

        return (
            <div className='post-container'>
                <h1 className='detailed-view-heading'>{heading}</h1>
                <img src={imageUrl} alt='post' className='deatailed-post-image' />
                <div className='username-date-container'>
                    <p className='username-date'>{username}</p>
                    <p className='username-date'>{format(createdDate, "dd/LLL/yyyy")}</p>
                </div>
                <p className='detailed-view-description'>{description}</p>
                {update()}
            </div>
        )
    }

    const renderMainView = () => {
        switch (apiStatus) {
            case "INPROGRESS":
                return <p className='failure-loading-text'>LOADING...</p>
            case "FAILURE":
                return <p className='failure-loading-text'>We cant get post! Please refresh the page.</p>
            case "SUCCESS":
                return renderSuccessView();
            default:
                return null;
        }
    }
    return (
        <div className='detailed-view-container'>
            <Header />
            {renderMainView()}
            <Footer />
        </div>
    )
}

export default DetailedPost

/*
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
*/