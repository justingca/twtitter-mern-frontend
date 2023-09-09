import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom';
import { useTweetsContext } from '../../hooks/useTweetsContext';
import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';

const ShowTweetLikeUnlike = ({isTweetLiked, likeCount}) => {
    const [isLiked, setIsLiked] = useState(isTweetLiked);
    const [tweetLikes, setTweetLikes] = useState(likeCount || 0);
    const {tweetId} = useParams();
    const {dispatch} = useTweetsContext();
    const {user} = useAuthContext();


    
    const handleLike = async () => {
        const response = await fetch(process.env.REACT_APP_API_URL + '/tweets/like/' + tweetId, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json();

        if(response.ok) {
            setIsLiked(true);
            setTweetLikes(tweetLikes + 1);
            dispatch({type: 'LIKE_TWEET', payload: json});
        }
    }

    const handleUnlike = async () => {
        const response = await fetch(process.env.REACT_APP_API_URL + '/tweets/unlike/' + tweetId, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json();

        if(response.ok) {
            setIsLiked(false);
            setTweetLikes(tweetLikes - 1);
            dispatch({type: 'LIKE_TWEET', payload: json});
        }
    }
    return (
        <>
            <div className="fs-5 ms-2 my-2">
                    {tweetLikes} Likes
            </div>
            <div className="tweet-buttons-post-page d-flex">
                <div className="tweet-buttons-comments">
                    <FontAwesomeIcon icon={faComment}
                    className="comment-button text-white"/>
                    
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
                </div>
            </div>
        </>
    )
}

export default ShowTweetLikeUnlike