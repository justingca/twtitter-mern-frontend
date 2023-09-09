import { useAuthContext } from "../../../hooks/useAuthContext"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { Link, useParams } from "react-router-dom";
import './profileStyle.css';
import { useTweetsContext } from "../../../hooks/useTweetsContext";
import { useEffect, useState } from "react";
import TweetDetails from "../../../components/TweetDetails";
import ProfileInfo from "../../../components/ProfileInfo";

const ShowProfile = () => {
    const { profileName } = useParams();
    const { user } = useAuthContext();
    const { tweets, dispatch } = useTweetsContext();
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
        const fetchTweets = async () => {
            const response = await fetch(process.env.REACT_APP_API_URL + '/tweets/author/' + profileName + '?page=' + page, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json();

            if(!response.ok) {
                setError(json.error);
            }

            if(response.ok) {
                dispatch({type: 'SET_TWEETS', payload: json.tweets})
                setPageCount(json.totalPages);
            }
        }
        fetchTweets()

    }, [user, dispatch, profileName, page])


    const handleNext = () => {
        setPage((p) => {
            if(p === pageCount) return p;
            return p + 1;
        })
    }

    function handlePrevious() {
        setPage((p) => {
            if(p === 1) return p;
            return p - 1;
        })
    }

    return (
        <main>
            {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
            )}
            {!error && (
            <div className="main-content text-white px-0">
                <div className="main-content-menu sticky-top">
                    <div className="mc-title-container d-flex align-items-center gap-2">
                        <div className="ms-3">
                            <Link to="/" className="text-white">
                                <FontAwesomeIcon icon={faArrowLeft} className="fs-4"/>
                            </Link>    
                        </div>
                        <div className="d-flex flex-column ms-4 p-0">
                            <h4>{profileName}</h4>
                            <span>{tweets && (
                                (tweets.length || 0)
                            )} posts</span>
                        </div>
                    </div>
                </div>

                <ProfileInfo profileName={profileName}/>

                {tweets && tweets.map(tweet => (
                    <TweetDetails 
                        tweet={tweet} 
                        key={tweet._id}
                    />
                ))}

                <div className="message-form-container py-2 gap-2 d-flex justify-content-center">
                    <button className="paginate-button" disabled={page === 1} onClick={handlePrevious}>
                        <FontAwesomeIcon icon={faArrowLeft} className="fs-5"/>
                    </button>

                    <button className="paginate-button" disabled={page === pageCount || pageCount === 0} onClick={handleNext}>
                        <FontAwesomeIcon icon={faArrowRight} className="fs-5"/>
                    </button>
                </div>
                
            </div>
            )}
        </main>
    )
}

export default ShowProfile