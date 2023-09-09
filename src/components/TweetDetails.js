import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faComment, faEllipsis, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from '../hooks/useAuthContext'
import { useState } from 'react'
import { useTweetsContext } from '../hooks/useTweetsContext'

const TweetDetails = ({tweet}) => {
    const [likeCount, setLikeCount] = useState(tweet.likes.length);
    const {user} = useAuthContext();
    const {dispatch} = useTweetsContext();
    const [isLiked, setIsLiked] = useState(tweet.likes.includes(user.username));

    const handleLike = async () => {
        const response = await fetch(process.env.REACT_APP_API_URL + '/tweets/like/' + tweet._id, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json();

        if(response.ok) {
            setIsLiked(true);
            setLikeCount(likeCount + 1);
            dispatch({type: 'LIKE_TWEET', payload: json});
        }
    }

    const handleUnlike = async () => {
        const response = await fetch(process.env.REACT_APP_API_URL + '/tweets/unlike/' + tweet._id, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json();

        if(response.ok) {
            setIsLiked(false);
            setLikeCount(likeCount - 1);
            dispatch({type: 'LIKE_TWEET', payload: json});
        }
    }

    const handleDelete = async () => {
        const response = await fetch (process.env.REACT_APP_API_URL + '/tweets/' + tweet._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json();

        if(response.ok) {
            dispatch({type: 'DELETE_TWEET', payload: json});
        }
    }

    return (

        <div className="tweet-container d-flex">
            <div className="tweet-left">
                <img src={tweet.author.image} alt=""/>
            </div>
            <div className="tweet-right">
                <div className="tweet-author gap-2">
                    <span className="tweet-author-name"><Link to={`/${tweet.author.username}`}>{tweet.author.displayName}</Link></span>
                    <span className="tweet-author-handle">@{tweet.author.username}</span>
                    <span className="tweet-createdAt d-none d-sm-block">· {formatDistanceToNow(new Date(tweet.createdAt), { addSuffix: true })}</span>
                    
                    {tweet.author.username === user.username && (
                        <div className="ms-auto">
                            <FontAwesomeIcon icon={faEllipsis} className="dropdown-toggle fs-4" data-bs-toggle="dropdown"/>
                            <div className="dropup">
                                <ul className="dropdown-menu bg-black text-white border-white" role="menu">
                                    {/* <li className="dropdown-item">Edit Tweet</li> */}
                                    <li className="dropdown-item" onClick={handleDelete}><FontAwesomeIcon icon={faTrash}/> Delete Tweet </li>
                                </ul>
                            </div>
                        </div>
                    )}

                </div>

                <Link to={`/tweets/${tweet._id}`} className="tweet-link-wrapper">
                    <div className="tweet-content d-flex flex-column gap-2">

                        <span>
                            {tweet.content}
                        </span>
                        
                        {tweet.image && (
                            <div className="tweet-content-image">
                                <img src={tweet.image} alt="" className="w-100"></img>
                            </div>
                        )}
                        
                    </div>
                </Link>

                <div className="tweet-buttons">
                    
                    <div className="tweet-buttons-comments">
                        <Link to={`/tweets/${tweet._id}`} className="comment-button">
                            <FontAwesomeIcon icon={faComment}/>
                        </Link>
                        <span className="tweet-buttons-text">{tweet.comments.length}</span>
                    </div>
                    
                    <div className="tweet-buttons-likes">
                        {isLiked === false && (
                            <FontAwesomeIcon icon={faHeart} 
                                className="like-button-unliked"
                                onClick={handleLike}
                            />
                        )}
                        {isLiked === true && (
                            <FontAwesomeIcon icon={faHeart} 
                                className="unlike-heart"
                                onClick={handleUnlike}
                            />
                        )}
                        
                        <span className="tweet-buttons-text">{likeCount}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TweetDetails