import { Link } from 'react-router-dom'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const CommentDetails = ({comment}) => {
    return(
        <div className="tweet-container d-flex">
            <div className="tweet-left">
                    <img src={comment.author.image} alt=""/>
                </div>
                <div className="tweet-right">
                    <div className="tweet-author gap-2">
                        <span className="tweet-author-name"><Link to={`/${comment.author.username}`}>{comment.author.displayName}</Link></span>
                        <span className="tweet-author-handle">@{comment.author.username}</span>
                    </div>
                    <div className="tweet-content d-flex flex-column">
                        <span>
                            {comment.content}
                        </span>
                        <span className="tweet-createdAt d-none d-sm-block">{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</span>
                    </div>
            </div>
        </div>
    )
}

export default CommentDetails