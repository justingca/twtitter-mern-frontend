import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faHouse, faEllipsis, faBell, faEnvelope, faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faXTwitter } from "@fortawesome/free-brands-svg-icons"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"
import { useNotificationsContext } from "../hooks/useNotificationsContext"
import { useEffect, useRef } from "react"


const NavigationMenu = () => {
    const { user } = useAuthContext();
    const { logout } = useLogout();
    const { notifCount, dispatch } = useNotificationsContext();
    const ref = useRef();

    const handleSignOut = () => {
        logout();
    }
    
    const handleBurger = () => {
        const visibility = ref.current.getAttribute('data-visible');
        if(visibility === "false") {
            ref.current.setAttribute('data-visible', true)
        }
        else {
            ref.current.setAttribute('data-visible', false)
        }
    }


    useEffect(() => {
        const fetchNotifsCount = async () => {
            const response = await fetch(process.env.REACT_APP_API_URL + '/notifications/unread', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json();

            if(response.ok) {
                dispatch({type: 'SET_NOTIF_COUNT', payload: json});
            }
        }
        fetchNotifsCount();
    }, [user, dispatch])

    return(

        <nav className="sidebar">
            <span className="mobile-nav-toggle">
                <FontAwesomeIcon icon={faBars} onClick={handleBurger}/>
            </span>
            <span className="mobile-nav-logo">
                <FontAwesomeIcon icon={faXTwitter}/>
            </span>
            <ul className="sidebar-menu mt-2" ref={ref} data-visible="false">
                <li className="navi-item">
                    <Link className="navi-link" to="/">
                        <FontAwesomeIcon icon={faXTwitter} className="navi-icon"/>
                    </Link>
                </li>
                <li className="navi-item">
                    <Link className="navi-link" to="/">
                        <FontAwesomeIcon icon={faHouse} className="navi-icon"/>
                        <span className="navi-text">
                            Home
                        </span>
                    </Link> 
                </li>
                <li className="navi-item">
                    <Link className="navi-link" to="/">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="navi-icon"/>
                        <span className="navi-text">
                            Explore
                        </span>
                    </Link> 
                </li>
                <li className="navi-item">
                    <Link className="navi-link" to="/notifications">
                        <FontAwesomeIcon icon={faBell} className="navi-icon"/>
                        {(notifCount && notifCount.count > 0) && (
                            <span class="badge rounded-pill badge-notification bg-danger count-notif">
                                {notifCount.count}
                            </span>
                        )}    
                        <span className="navi-text">
                            Notifications
                        </span>
                    </Link> 
                </li>
                <li className="navi-item">
                    <Link className="navi-link" to="/messages">
                        <FontAwesomeIcon icon={faEnvelope} className="navi-icon"/>
                        <span className="navi-text">
                            Messages
                        </span>
                    </Link> 
                </li>
                <li className="navi-item">
                    <Link className="navi-link" to={`/${user.username}`}>
                        <FontAwesomeIcon icon={faUser} className="navi-icon"/>
                        <span className="navi-text">
                            Profile
                        </span>
                    </Link> 
                </li>


                <div className="post-button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <span>Post</span>
                </div>

                

                    
                
                
                
                <div className="sidebar-user mt-auto">
                    <div className="sidebar-user-container dropdown-toggle" data-bs-toggle="dropdown">
                        <div className="dropup">
                            <ul className="dropdown-menu bg-black text-white border-white" role="menu">
                                <li className="dropdown-item" onClick={handleSignOut}>Logout</li>
                                <li className="dropdown-item">Some Action</li>
                            </ul>
                        </div>
                        <div className="sidebar-user-pic">
                            <img src={user.image} alt="profile-img"></img>
                        </div>
                        <div className="sidebar-user-info">
                            <span className="sidebar-user-name">{user.username}</span>
                            <span className="sidebar-user-handle">@{user.username}</span>
                        </div>
                        <div className="user-dropup">
                            <button className="user-dropdown-button">
                                <FontAwesomeIcon icon={faEllipsis}/>
                            </button>
                        </div>
                    </div>
                </div>
            </ul>
        </nav>
    )
}

export default NavigationMenu