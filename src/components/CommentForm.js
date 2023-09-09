import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext";
import { useCommentsContext } from "../hooks/useCommentsContext";

const CommentForm = ({tweetId}) => {
    const [content, setContent] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuthContext();
    const { dispatch } = useCommentsContext();

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        setIsLoading(true);
        const comment = { content }
        const response = await fetch(process.env.REACT_APP_API_URL + '/tweets/comments/' + tweetId, {
            method: 'POST',
            body: JSON.stringify(comment),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json();

        if(!response.ok) {
            setError(json.error);
            setIsLoading(false);
        }
        if(response.ok) {
            dispatch({type: 'CREATE_COMMENT', payload: json});
            setIsLoading(false);
            setError(null);
            setContent('');
        }
    }

    return (
        <div className="tweet-form-container">
                <div className="tweet-form-dp">
                    <img src={user.image} alt=""/>
                </div>
                <div className="tweet-form">
                    <form action="" className="actual-tweet-form" onSubmit={handleSubmit}>
                        <textarea name="" id="" rows="2" placeholder="Post your reply" 
                        className="bg-black"
                        value={content}
                        onChange={(ev) => setContent(ev.target.value)}
                        ></textarea>
                        <div className="tweet-form-options d-flex">
                            <button className="tweet-form-btn ms-auto" disabled={isLoading}> Post</button>
                        </div>
                    </form>
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    )}
                </div>
            </div>
    )
}

export default CommentForm