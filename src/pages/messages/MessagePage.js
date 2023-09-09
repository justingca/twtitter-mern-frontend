import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import MessageDetails from "../../components/MessageDetails";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect, useState } from "react";
import MessageForm from "../../components/MessageForm";
import { useMessagesContext } from "../../hooks/useMessagesContext";

const MessagePage = () => {
    const {receiverUsername} = useParams();
    const {user} = useAuthContext();
    const {messages, dispatch} = useMessagesContext();
    const [error, setError] = useState(null);
    const [otherUser, setOtherUser] = useState('');
    
    useEffect(() => {
        const fetchMessages = async () => {
            const response = await fetch(process.env.REACT_APP_API_URL + '/message/' + receiverUsername, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json();

            if(!response.ok) {
                setError(json.error);
            }
            if(response.ok) {
                dispatch({type: 'SET_MESSAGES', payload: json.messages});
                setOtherUser(json.receiver);
            }
        }
        fetchMessages();

    }, [user, dispatch, receiverUsername])

    return (
        <main>
            <div className="main-content text-white px-0">
                <div className="main-content-menu sticky-top">
                    <div className="mc-title-container d-flex align-items-center gap-2 my-2">
                        <div className="ms-3">
                            <Link to="/messages" className="text-white">
                                <FontAwesomeIcon icon={faArrowLeft} className="fs-4"/>
                            </Link>    
                        </div>
                        <div className="d-flex flex-column ms-4 p-0">
                            <h4>Messages</h4>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}

                {!error && (
                    <div>
                        <div className="message-top d-flex flex-column align-items-center">
                            <img src={otherUser.image} alt=""/>
                            <h5>{otherUser.displayName}</h5>
                            <span>@{otherUser.username}</span>
                        </div>
                        
                        <div className="message-main d-flex flex-column">
                            {messages && messages.map((message) => (
                                <MessageDetails message={message} key={message._id}/>
                            ))}
                        </div>
                        
                        <MessageForm/>
                    </div>
                )}
            </div>
        </main>
    )
}

export default MessagePage;