import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'

const ChatModal = () => {
    const [following, setFollowing] = useState([]);
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchFollowing = async () => {
            const response = await fetch(process.env.REACT_APP_API_URL + '/users/following', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json();

            if(response.ok) {
                setFollowing(json.following);
            }
        }
        fetchFollowing();

    }, [user])
    return (
        <div class="modal" tabindex="-1" id="messagesModal">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content bg-black">
                <div class="modal-header">
                    <h5 class="modal-title">Message Followed Users</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <FontAwesomeIcon icon={faXmark} className="fs-3"/>
                    </button>
                </div>
                <div class="modal-body">
                        
                    {following && following.map(f => (
                        <div className="tweet-container d-flex">
                            <div className="tweet-left">
                                <img src={f.image} alt=""/>
                            </div>
                            <div className="tweet-right">
                                <div className="tweet-content">
                                    <div className="d-flex flex-column">
                                        <span data-bs-dismiss="modal">{f.displayName}</span>
                                        <span>@{f.username}</span>
                                    </div>
                                    <Link to={`/messages/${f.username}`} className="text-decoration-none text-white ms-auto">
                                    <div className="ms-auto me-4 subscribe-button mb-4" data-bs-dismiss="modal">
                                        <FontAwesomeIcon icon={faEnvelope} className="fs-4"/>   
                                    </div>
                                    </Link>
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

export default ChatModal