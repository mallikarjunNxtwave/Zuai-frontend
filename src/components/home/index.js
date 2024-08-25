import { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { format } from 'date-fns'
import './index.css'
import { Navigate, Link } from 'react-router-dom';
import Header from '../header';
import Footer from '../footer';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [apiStatus, setApiAtatus] = useState('INITIAL');

    const GetPosts = async () => {
        setApiAtatus('INPROGRESS');
        const url = 'https://zuai-ui6l.onrender.com/posts'

        const response = await fetch(url);
        const data = await response.json()
        if (response.ok) {
            setPosts(data.posts)
            setApiAtatus('SUCCESS');
        } else {
            setApiAtatus('FAILURE');
            console.log(response)
        }
    }
    useEffect(() => {
        GetPosts();
    }, [])

    const renderLoadingView = () => (
        <p className='failure-loading-text'>LOADING...</p>
    )

    const renderFailureView = () => (
        <p className='failure-loading-text'>No posts found! Please refresh the page.</p>
    )

    const renderSuccessView = () => (
        <ul className='posts-list-container'>
            {
                posts.map(eachPost => {
                    const { _id, username, heading, description, createdDate, imageUrl } = eachPost
                    return (
                        <Link to={`/posts/${_id}`} className='link-elememt'>
                            <div key={_id} className='post-list-item'>
                                <img src={imageUrl} alt='post' className='post-image' />
                                <h1 className='post-heading'>{heading}</h1>
                                <p className='post-description'>{description}</p>
                                <div className='post-credentials'>
                                    <p className='post-username-date'>{username}</p>
                                    <p className='post-username-date'>{format(createdDate, "dd/LLL/yyyy")}</p>
                                </div>
                            </div>
                        </Link>
                    )
                })
            }
        </ul>
    )

    const renderMainView = () => {
        switch (apiStatus) {
            case "INPROGRESS":
                return renderLoadingView()
            case "SUCCESS":
                return renderSuccessView()
            case "FAILURE":
                return renderFailureView()
            default:
                return null;
        }
    }

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
        return <Navigate to='/login' />
    }

    return (
        <div className='home-main-container'>
            <Header />

            {renderMainView()}

            <Footer />
        </div>
    )
}

export default Home