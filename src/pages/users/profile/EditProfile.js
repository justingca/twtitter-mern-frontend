import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuthContext } from '../../../hooks/useAuthContext'

const EditProfilePage = () => {
    const [displayName, setDisplayName] = useState('');
    const [image, setImage] = useState('');
    const [handle, setHandle] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useAuthContext();
    const [successMsg, setSuccessMsg] = useState(null);

    useEffect(() => {
        const fetchEditProfileInfo = async () => {
            const response = await fetch(process.env.REACT_APP_API_URL + '/users/editinfo', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json();

            if(!response.ok) {
                setError(json.error);
            }
            if(response.ok) {
                setDisplayName(json.displayName);
                setImage(json.image);
                setHandle(json.username);
                setEmail(json.email);
                setError(null);
            }
        }
        fetchEditProfileInfo();
    }, [user])

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        setIsLoading(true);
        const response = await fetch(process.env.REACT_APP_API_URL + "/users/update", {
            method: 'PATCH',
            body: JSON.stringify({displayName, image}),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json();

        if(!response.ok) {
            setIsLoading(false);
            setError(json.error);
        }

        if(response.ok) {
            setSuccessMsg(json.success);
            setIsLoading(false);
        }
    }

    const imageUpload = async (ev) => {
        ev.preventDefault();
        setIsLoading(true);

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
                setIsLoading(false);
            }
            if(response.ok) {
                setImage(json.links[0]);
                setIsLoading(false);
            }
        }
    }

    return (
        <main>
            <div className="main-content text-white px-0">
                <div className="main-content-menu sticky-top">
                    <div className="mc-title-container d-flex align-items-center gap-2 my-2">
                        <div className="ms-3">
                            <Link to="/" className="text-white">
                                <FontAwesomeIcon icon={faArrowLeft} className="fs-4"/>
                            </Link>    
                        </div>
                        <div className="d-flex flex-column ms-4 p-0">
                            <h4>Edit Profile</h4>
                        </div>
                    </div>
                </div>

                <div className="container">
                    {successMsg && (
                        <div class="alert alert-success" role="alert">
                            {successMsg}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Change Display Name:</label>
                            <input type="text" class="form-control" id="exampleInputEmail1" 
                                placeholder={displayName}
                                value={displayName}
                                onChange={(ev) => setDisplayName(ev.target.value)}
                            />
                        </div>
                        <div className="mb-3 gap-2">
                            <label class="form-label">User Handle: </label>
                            <span className="ms-2 tweet-author-handle">@{handle}</span>
                        </div>
                        <div className="mb-3 gap-2">
                            <label class="form-label">User Email: </label>
                            <span className="ms-2 tweet-author-handle">{email}</span>
                        </div>
                        <div className="mb-3">
                            <label class="form-label">Change Display Image: </label>
                            <div className="sidebar-user-pic my-2">
                                <img src={image} alt="profile-img"></img>
                            </div>

                            <input type="file" className="form-control"  disabled={isLoading} onChange={imageUpload}></input>
                        </div>
                        <div className="mb-3">

                        </div>
                        
                        <button type="submit" class="subscribe-button text-white" disabled={isLoading}>Submit</button>
                    </form>
                </div>
            </div>
        </main>
    )
}

export default EditProfilePage