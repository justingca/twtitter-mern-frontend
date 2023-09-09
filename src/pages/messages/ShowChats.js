import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import ChatDetails from '../../components/ChatDetails';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import ChatModal from './ChatModal';

const ShowChats = () => {
    const [chats, setChats] = useState(null);
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchChats = async () => {
            const response = await fetch(process.env.REACT_APP_API_URL + '/chats', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json();

            if(response.ok) {
                setChats(json);
            }
        }
        fetchChats();

    }, [user])

    return (
        <main>
            
            <div className="main-content text-white px-0">
                <ChatModal/>
                <div className="main-content-menu sticky-top">
                    <div className="mc-title-container d-flex align-items-center gap-2 my-2">
                        <div className="ms-3">
                            <Link to="/" className="text-white">
                                <FontAwesomeIcon icon={faArrowLeft} className="fs-4"/>
                            </Link>    
                        </div>
                        <div className="d-flex flex-column ms-4 p-0">
                            <h4>Messages</h4>
                        </div>
                        <div className="ms-auto me-4 subscribe-button mb-2" data-bs-toggle="modal" data-bs-target="#messagesModal">
                            <FontAwesomeIcon icon={faEnvelope} className="fs-4"/>
                        </div>

                        

                    </div>
                </div>

                {chats && chats.map((chat) => (
                    <ChatDetails 
                        chat={chat} 
                        key={chat._id}
                        otherUser={chat.participants.filter((participant) => participant.username !== user.username).pop()}
                    />
                ))}

            </div>
        </main>
    )
}

export default ShowChats;