import { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import NotificationDetails from "../../components/NotificationDetails"
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNotificationsContext } from "../../hooks/useNotificationsContext";
import { Link } from "react-router-dom";

const NotificationsPage = () => {
    const { user } = useAuthContext();
    const [notifications, setNotifications] = useState(null);
    const { dispatch } = useNotificationsContext();

    useEffect(() => {
        const fetchNotifications = async () => {
            const response = await fetch(process.env.REACT_APP_API_URL + '/notifications/read', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json();

            if(response.ok) {
                setNotifications(json);
                dispatch({type: 'SET_NOTIF_COUNT', payload: {count : 0}});
            }
        }
        fetchNotifications();
    }, [user, dispatch])

    return (
        <main>
            <div className="main-content text-white px-0">
                
                <div className="main-content-menu sticky-top d-flex">
                    <div className="mc-title-container d-flex align-items-center gap-2 my-2">
                        <div className="ms-3">
                            <Link to="/" className="text-white">
                                <FontAwesomeIcon icon={faArrowLeft} className="fs-4"/>
                            </Link>    
                        </div>
                        <div className="d-flex flex-column ms-4 p-0">
                            <h4>Notifications</h4>
                        </div>
                    </div>
                </div>

                {notifications && notifications.map((notification) => (
                    <NotificationDetails notification={notification} key={notification._id}/>
                ))}

            </div>
        </main>
    )
}

export default NotificationsPage