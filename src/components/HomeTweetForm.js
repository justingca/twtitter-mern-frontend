import { useState } from "react"
import { useTweetsContext } from "../hooks/useTweetsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'

const HomeTweetForm = () => {
    const { user } = useAuthContext();
    const { dispatch } = useTweetsContext();
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [isPosting, setIsPosting]= useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        setIsPosting(true);
        const tweet = { content, image };
        const response = await fetch(process.env.REACT_APP_API_URL + '/tweets', {
            method: 'POST',
            body: JSON.stringify(tweet),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json();

        if(!response.ok) {
            setIsPosting(false);
            setError(json.error);
        }
        if(response.ok) {
            dispatch({type: 'CREATE_TWEET', payload: json});
            setIsPosting(false);
            setError(null);
            setContent('');
            setImage('');
        }
    }

    const imageUpload = async (ev) => {
        ev.preventDefault();
        setIsUploading(true);

        const files = ev.target.files;

        if(files.length > 0) {
            const data = new FormData();
            for(const file of files) {
                data.append('file', file);
            }
            const response = await fetch(process.env.REACT_APP_API_URL + '/images', {
                method: 'POST',
                body: data,
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json();

            if(!response.ok) {
                setIsUploading(false);
            }
            if(response.ok) {
                setImage(json.links[0]);
                setIsUploading(false);
            }
        }
    }

    const deleteImage = async (imageKey) => {
        const response = await fetch(process.env.REACT_APP_API_URL + '/images/delete/' + imageKey, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

        if(response.ok) {
            setImage('');
        }
    }

    return (
            <div className="tweet-form-container">
                <div className="tweet-form-dp">
                    <img src={user.image} alt=""/>
                </div>
                <div className="tweet-form">
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}
                    <form action="" className="actual-tweet-form" onSubmit={handleSubmit}>
                        <textarea name="" id="" rows="2" placeholder="What is happening?!" 
                        className="bg-black"
                        value={content}
                        onChange={(ev) => setContent(ev.target.value)}
                        ></textarea>
                        {image && (
                            <div className="tweet-form-imageupload me-auto ms-3 mt-2">
                                <img src={image} alt=""></img>
                                <span class="badge rounded-pill badge-notification bg-danger img-form-delete"
                                    onClick={() => deleteImage(image.split('https://jfly-ecommerce.s3.amazonaws.com/').pop())}
                                >
                                    X
                                </span>
                            </div>
                        )}
                        <div className="tweet-form-options d-flex">
                            {image === '' && (
                                <label className="tweet-form-btn ms-5" for="upload">
                                    <input type="file" disabled={isUploading} className="d-none" id="upload" onChange={imageUpload}/>
                                    <FontAwesomeIcon icon={faImage}/>
                                </label>
                            )}
                            <button disabled={(isUploading || isPosting)} className="tweet-form-btn ms-auto"> Post</button>
                        </div>
                    </form>
                    
                    
                </div>
            </div>
    )
}

export default HomeTweetForm