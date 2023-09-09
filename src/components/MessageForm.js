import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";
import { useMessagesContext } from "../hooks/useMessagesContext";
import { useAuthContext } from "../hooks/useAuthContext";

const MessageForm = () => {
    const {receiverUsername} = useParams();
    const [content, setContent] = useState('');
    const [error, setError] = useState(null);
    const [isSending, setIsSending] = useState(false);
    const { dispatch } = useMessagesContext();
    const { user } = useAuthContext();

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        setIsSending(true);
        const message = {content};
        const response = await fetch(process.env.REACT_APP_API_URL + '/message/' + receiverUsername, {
            method: 'POST',
            body: JSON.stringify(message),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json();

        if(!response.ok) {
            setError(json.error);
            setIsSending(false);
        }
        if(response.ok) {
            dispatch({type: 'SEND_MESSAGE', payload: json});
            setIsSending(false);
            setContent('');
        }
    }

    return (
        <div className="message-form-container pb-1">
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            <form className="message-form" onSubmit={handleSubmit}>
                <input className="" placeholder="Send a message"
                    value={content}
                    onChange={(ev) => setContent(ev.target.value)}
                />
                <button disabled={isSending}><FontAwesomeIcon icon={faPaperPlane}/></button>
            </form>
        </div>
    )
}

export default MessageForm;