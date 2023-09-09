import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const FollowersModal = ({followers}) => {
    return (
        <div class="modal" tabindex="-1" id="followersModal">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content bg-black">
                <div class="modal-header">
                    <h5 class="modal-title">Followers</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <FontAwesomeIcon icon={faXmark} className="fs-3"/>
                    </button>
                </div>
                <div class="modal-body">
                    
                    {followers && followers.map(follower => (
                        <div className="tweet-container d-flex">
                            <div className="tweet-left">
                                <img src={follower.image} alt=""/>
                            </div>
                            <div className="tweet-right">
                                <div className="tweet-content">
                                    <div className="d-flex flex-column">
                                        <Link to={`/${follower.username}`} className="text-decoration-none text-white">
                                            <span data-bs-dismiss="modal">{follower.displayName}</span>
                                        </Link>
                                        <span>@{follower.username}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default FollowersModal