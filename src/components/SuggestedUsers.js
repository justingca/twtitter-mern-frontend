import { useState } from 'react';
import '../pages/users/profile/profileStyle.css';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';

const SuggestedUserDetails = ({sU}) => {
    const [isFollowing, setIsFollowing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuthContext();

    const handleFollow = async () => {
        setIsLoading(true);
        const response = await fetch(process.env.REACT_APP_API_URL + '/users/follow/' + sU.username, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

        if(response.ok) {
            setIsFollowing(true);
            setIsLoading(false);
        }
    }

    const handleUnfollow = async () => {
        setIsLoading(true);
        const response = await fetch(process.env.REACT_APP_API_URL + '/users/unfollow/' + sU.username, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

        if(response.ok) {
            setIsFollowing(false);
            setIsLoading(false);
        }
    }

    return (
        <div className="d-flex my-2 explore-user-container">
            <div className="sidebar-user-pic">
                <img src={sU.image} alt="profile-img"></img>
            </div>
            <div className="d-flex flex-column ms-2">
                <Link to={`/${sU.username}`} className="text-decoration-none text-white"><span>{sU.displayName}</span></Link>
                <span>@{sU.username}</span>
            </div>
            {!isFollowing && (
                <button className="ms-auto suggested-follow-button" 
                disabled={isLoading}
                onClick={handleFollow}
                >
                    Follow
                </button>
            )}

            {isFollowing && (
                <button className="ms-auto suggested-unfollow-button" 
                disabled={isLoading}
                onClick={handleUnfollow}
                >
                    <span className="suf-text-following">Following</span>
                    <span className="suf-text-unfollow">Unfollow</span>
                </button>
            )}
            
            
        </div>
    )
}

export default SuggestedUserDetails;