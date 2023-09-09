import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useAuthContext } from '../hooks/useAuthContext'
import { useTweetsContext } from '../hooks/useTweetsContext';
import { useState } from 'react';

const TweetFormModal = () => {
    const {user} = useAuthContext();
    const {dispatch} = useTweetsContext();
    const [content, setContent] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        const response = await fetch(process.env.REACT_APP_API_URL + '/tweets', {
            method: 'POST',
            body: JSON.stringify({content}),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json();
        if(!response.ok) {
            setError(json.error);
        }
        if(response.ok) {
            setContent('');
            setError(null);
            dispatch({type: 'CREATE_TWEET', payload: json});
        }

    }


    return (
        <div className="modal fade text-white" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content bg-black">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">New Tweet</h1>
                    <button type="button" className="btn-close mb-2" data-bs-dismiss="modal" aria-label="Close">
                        <FontAwesomeIcon icon={faXmark} className="fs-3"/>
                    </button>
                </div>
                <div className="modal-body">
                       {error && (
                        {error}
                       )}
                    <div className="tweet-form-container">
                        <div className="tweet-form-dp">
                            <img src="https://jfly-ecommerce.s3.ap-southeast-2.amazonaws.com/default-avatar-blue.png" alt=""/>
                        </div>
                        <div className="tweet-form">
                            <form action="" className="actual-tweet-form" onSubmit={handleSubmit}>
                                <textarea name="" id="" rows="2"    placeholder="What is happening?!" 
                                className="bg-black"
                                value={content}
                                onChange={(ev) => setContent(ev.target.value)}
                                
                                ></textarea>
                                <div className="tweet-form-options d-flex">
                                    <button className="tweet-form-btn ms-auto" data-bs-dismiss="modal"> Post</button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
                </div>
            </div>
        </div>
    )
}

export default TweetFormModal