import { Link } from "react-router-dom";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const ChatDetails = ({chat, otherUser}) => {

    return(
        <div className="tweet-container d-flex">
            <div className="tweet-left">
                <img src={otherUser.image} alt=""/>
            </div>
            <div className="tweet-right">
                <Link to={`/messages/${otherUser.username}`} className="tweet-link-wrapper">
                <div className="tweet-author gap-2">
                    <span className="tweet-author-name"><Link to={`/${otherUser.username}`}>{otherUser.displayName}</Link></span>
                    <span className="tweet-author-handle">@{otherUser.username}</span>
                    {/* <span className="tweet-createdAt d-none d-sm-block">· {formatDistanceToNow(new Date(tweet.createdAt), { addSuffix: true })}</span> */}
                </div>
                <div className="tweet-content d-flex flex-column gap-2">

                    <span>
                        "{chat.latestMessage.content}"
                    </span>
                    <span className="tweet-createdAt d-none d-sm-block">{formatDistanceToNow(new Date(chat.latestMessage.createdAt), { addSuffix: true })}</span>
                    
                </div>
                </Link>
                
                
            </div>
        </div>
    )
}

export default ChatDetails;