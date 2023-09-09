import { Link } from "react-router-dom"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const NotificationDetails = ({notification}) => {
    return (
        <div className="tweet-container d-flex">
            <div className="tweet-left">
                <img src={notification.origin.image} alt=""/>
            </div>
            <div className="tweet-right">

                {notification.tweetRef && (
                    <Link to={`/tweets/${notification.tweetRef}`} className="text-decoration-none text-white">
                        <div className="tweet-content">
                            <span>
                                {notification.body}
                            </span>
                        </div>
                    </Link>
                )}

                {!notification.tweetRef && (notification.action === 'message') && (
                    <Link to={`/messages/${notification.body.split(' ')[0]}`} className="text-decoration-none text-white">
                        <div className="tweet-content">
                            <span>
                                {notification.body}
                            </span>
                        </div>
                    </Link>
                )}

                {!notification.tweetRef && notification.action !== 'message' && (
                    <div className="tweet-content">
                        <span>
                            {notification.body}
                        </span>
                    </div>
                )}      

<span className="tweet-createdAt d-none d-sm-block">{formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}</span>
            </div>
        </div>
    )
}

export default NotificationDetails