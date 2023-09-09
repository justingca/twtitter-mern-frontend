import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import FollowersModal from "../pages/users/profile/FollowersModal";
import FollowingModal from "../pages/users/profile/FollowingModal";

const ProfileInfo = ({profileName}) => {
    const [isUserFollowing, setIsUserFollowing] = useState(false);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [profileImage, setProfileImage] = useState('');
    const [error, setError] = useState(null);
    const {user} = useAuthContext();
    const [displayName, setDisplayName] = useState(null);

    useEffect(() => {
        const fetchProfileInfo = async () => {
            const response = await fetch(process.env.REACT_APP_API_URL + '/users/stats/' + profileName, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json();

            if(response.ok) {
                setFollowers(json.profile.followers);
                setFollowing(json.profile.following);
                setFollowersCount(json.profile.followers.length);
                setFollowingCount(json.profile.following.length);
                setProfileImage(json.profile.image);
                setIsUserFollowing(json.isFollowing);
                setDisplayName(json.profile.displayName);
            }
        }
        fetchProfileInfo();
    }, [profileName, user])

    const handleFollow = async (ev) => {
        ev.preventDefault();
        setIsLoading(true);
        const response = await fetch(process.env.REACT_APP_API_URL + '/users/follow/' + profileName, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = response.json();

        if(!response.ok) {
            setError(json.error);
            setIsLoading(false);
        }
        if(response.ok) {
            setIsLoading(false);
            setIsUserFollowing(true);
            setFollowersCount(followersCount + 1);
        }
    }

    const handleUnfollow = async (ev) => {
        ev.preventDefault();
        setIsLoading(true);
        const response = await fetch(process.env.REACT_APP_API_URL + '/users/unfollow/' + profileName, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json();

        if(!response.ok) {
            setError(json.error);
            setIsLoading(false);
        }
        if(response.ok) {
            setIsLoading(false);
            setIsUserFollowing(false);
            setFollowersCount(followersCount - 1);
        }
    }

    return (
        <>
        <div className="profile-container d-flex flex-column">
            <div className="profile-backdrop">
                <img src="https://pbs.twimg.com/profile_banners/959640046205681664/1664980092/1080x360" alt=""></img>
                <div className="profile-dp">
                    <img src={profileImage} alt=""></img>
                </div>
            </div>
        </div>

        <div className="profile-info-container d-flex flex-column justify-content-end">
            
            <div className="edit-profile d-flex">
                

                {profileName === user.username && (
                    <Link to="/profile/edit" className="ms-auto">
                        <button className="ms-auto follow-button">Edit Profile</button>
                    </Link>
                )}

                {isUserFollowing === false && profileName !== user.username && (
                    <button className="ms-auto follow-button" 
                        onClick={handleFollow}
                        disabled={isLoading}
                    >    
                        Follow
                    </button>
                )}

                {isUserFollowing === true && profileName !== user.username && (
                    <button className="ms-auto unfollow-button" onClick={handleUnfollow} disabled={isLoading}>
                        <span className="unfollow-button-following">Following</span>
                        <span className="unfollow-button-unfollow">Unfollow</span>
                    </button>
                )} 
            </div>
            <div className="profile-info text-white ms-2 pb-3">
            { error && (
                    <div className="d-flex alert alert-danger alert-dismissible fade show">
                        {error}
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
            )}
                <div className="d-flex">
                <h2>{displayName}</h2>
                {profileName !== user.username && (
                    <div className="profile-msg-btn ms-auto me-4 mt-2">
                        <Link to={`/messages/${profileName}`}>
                            <div className=" subscribe-button">
                                <FontAwesomeIcon icon={faEnvelope} className="fs-4"/>   
                            </div>
                        </Link>
                    </div>
                )}
                </div>
                <span className="profile-info-handle">@{profileName}</span>
                <div className="profile-follower-stats d-flex flex-column flex-sm-row">
                    
                    <div data-bs-toggle="modal" data-bs-target="#followersModal" className="modal-profile-link me-3">
                        {followersCount} followers
                    </div>
                    <FollowersModal followers={followers}/>
                    
                    <div data-bs-toggle="modal" data-bs-target="#followingModal" className="modal-profile-link">
                        {followingCount} following
                    </div>
                    <FollowingModal following={following}/>
                </div>
            </div>
        </div>
        </>
    )
}

export default ProfileInfo