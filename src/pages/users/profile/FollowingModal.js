import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const FollowingModal = ({following}) => {
    return (
        <div class="modal" tabindex="-1" id="followingModal">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content bg-black">
                <div class="modal-header">
                    <h5 class="modal-title">Following</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <FontAwesomeIcon icon={faXmark} className="fs-3"/>
                    </button>
                </div>
                <div class="modal-body">
                    
                    {following && following.map(followee => (
                        <div className="tweet-container d-flex">
                            <div className="tweet-left">
                                <img src={followee.image} alt=""/>
                            </div>
                            <div className="tweet-right">
                                <div className="tweet-content">
                                    <div className="d-flex flex-column">
                                        <Link to={`/${followee.username}`} className="text-decoration-none text-white">
                                            <span data-bs-dismiss="modal">{followee.displayName}</span>
                                        </Link>
                                        <span>@{followee.username}</span>
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

export default FollowingModal