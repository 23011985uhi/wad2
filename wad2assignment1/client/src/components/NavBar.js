import { useCookies } from 'react-cookie';
import React, { useEffect, useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import './NavBar.css'

function NavBar() {
    let navigate = useNavigate();
    const [cookie, setCookie, removeCookie] = useCookies(['session']);
    const [loggedIn, setLoggedIn] = useState(false)
    const [isIframeFullScreen, setIsIframeFullScreen] = useState(false);

    useEffect(() => {
        if (cookie["session"]) {
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }
    }, [cookie])

    const handleAlevelClick = () => {
        if (!loggedIn) {
            navigate('/login');
            return;
          }
        setIsIframeFullScreen(true);
    
        const iframe = document.getElementById('myIframe');
        if (iframe.requestFullscreen) {
          iframe.requestFullscreen();
        } else if (iframe.mozRequestFullScreen) { // Firefox
          iframe.mozRequestFullScreen();
        } else if (iframe.webkitRequestFullscreen) { // Chrome, Safari, Opera
          iframe.webkitRequestFullscreen();
        } else if (iframe.msRequestFullscreen) { // IE/Edge
          iframe.msRequestFullscreen();
        }
      };
      
      

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">IWTSC</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/qlist">Questions</a>
                        </li>
                        <li className="nav-item">
                            {!loggedIn && <a className="nav-link" href="/login">Login/Register</a>}
                            {loggedIn && <a onClick={(e) => {
                                e.preventDefault()
                                removeCookie("session")
                                removeCookie("username")
                                navigate("/")
                            }} className="nav-link" href="/login">Sign out</a>}
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="#" onClick={() => handleAlevelClick()}>A-Level Questions</a>
                        </li>
                    </ul>
                </div>
            </div>
            {isIframeFullScreen && (
        <iframe
          id="myIframe"
          src="http://localhost:4000/"
          frameBorder="0"
          allowFullScreen
          className="fullscreen"
        ></iframe>
      )}
        </nav>
        
    )
}

export default NavBar;