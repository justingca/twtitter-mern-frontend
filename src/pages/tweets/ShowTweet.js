import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link, useParams } from 'react-router-dom';
import CommentForm from '../../components/CommentForm';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useCommentsContext } from '../../hooks/useCommentsContext';
import CommentDetails from '../../components/CommentDetails';
import ShowTweetLikeUnlike from './ShowTweetLike';

const ShowTweetPage = () => {
    const [tweet, setTweet] = useState(null);
    const [isTweetLiked, setIsTweetLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0); 
    const { user } = useAuthContext();
    const {tweetId} = useParams();
    const { comments, dispatch } = useCommentsContext();
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTweet = async () => {
            const response = await fetch(process.env.REACT_APP_API_URL + '/tweets/' + tweetId, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(!response.ok) {
                setError(json.error);
            }
            
            if(response.ok) {
                setTweet(json);
                setLikeCount(json.likes.length);
                if(json.likes.includes(user.username)) {
                    setIsTweetLiked(true);
                }
                dispatch({type: 'SET_COMMENTS', payload: json.comments})
            }
        }
        fetchTweet();
    }, [tweetId, user, dispatch])

    return (
        <main>
            {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
            )}

            {!error && (
            <div className="main-content text-white px-0">
                <div className="main-content-menu sticky-top">
                    <div className="mc-title-container d-flex align-items-center gap-2">
                        <div className="ms-3">
                            <Link to="/" className="text-white">
                                <FontAwesomeIcon icon={faArrowLeft} className="fs-4"/>
                            </Link>    
                        </div>
                        <div className="d-flex flex-column ms-4 p-0">
                            <h4>Post</h4>
                        </div>
                    </div>
                </div>

                {tweet && (
                    <div>
                        <div className="tweet-container d-flex">
                            <div className="tweet-left">
                                <img src={tweet.author.image} alt=""/>
                            </div>
                            <div className="tweet-right">
                                <div className="tweet-author-post-page d-flex flex-column gap-1">
                                    <span className="tweet-author-name"><Link to={`/${tweet.author.username}`}>{tweet.author.displayName}</Link></span>
                                    <span className="tweet-author-handle">@{tweet.author.username}</span>
                                </div>
                                <div className="tweet-content d-flex flex-column gap-1">
                                    <span className="fs-4">
                                        {tweet.content}
                                    </span>

                                    {tweet.image && (
                                        <div className="tweet-content-image">
                                            <img src={tweet.image} alt="" className="w-100"></img>
                                        </div>
                                    )}
                                    
                                </div>
                                <div className="my-2">
                                    <span className="tweet-createdAt d-none d-sm-block">           {formatDistanceToNow(new Date(tweet.createdAt), { addSuffix: true })}
                                    </span>
                                </div>
                            </div>
                        </div>


                        <ShowTweetLikeUnlike isTweetLiked={isTweetLiked} likeCount={likeCount}/>

                        <CommentForm tweetId={tweetId}/>

                        {comments && comments.map((comment) => (
                            <CommentDetails comment={comment} key={comment._id}/>
                        ))}
                    </div>
                )}
            </div>
            )}
        </main>
    )
}

export default ShowTweetPage;