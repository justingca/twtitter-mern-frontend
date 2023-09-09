import { useAuthContext } from "../hooks/useAuthContext"

const MessageDetails = ({message}) => {
    const {user} = useAuthContext();
    const receivedMsg = "dm-message-recvd me-auto"
    const sentMsg = "dm-message-sent ms-auto"
    
    return (
            <div className={message.sender.username === user.username ? sentMsg : receivedMsg}>
                {message.content}
            </div>
    )
}

export default MessageDetails;