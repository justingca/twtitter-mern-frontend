import { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import HomeTweetForm from "../components/HomeTweetForm"
import TweetDetails from "../components/TweetDetails"
import { useTweetsContext } from "../hooks/useTweetsContext"
import { useAuthContext } from "../hooks/useAuthContext"

const Home = () => {
    const {user} = useAuthContext();
    const { tweets, dispatch } = useTweetsContext();
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isTimeline, setIsTimeline] = useState(false);
    const [isForYou, setIsForYou] = useState(true);

    const timelineClass = "mc-right-button w-50 timeline-activate";
    const nonTimelineClass = "mc-right-button w-50";

    useEffect(() => {
        const fetchTweets = async () => {
            const response = await fetch(process.env.REACT_APP_API_URL + '/tweets/?page=' + page, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();
            if(response.ok) {
                dispatch({type: 'SET_TWEETS', payload: json.tweets});
                setPageCount(json.totalPages);
            }
        }
        fetchTweets();
    }, [dispatch, user, page])

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

    const handleFetchFollowing = async () => {
        if (isForYou === true) {
            setIsLoading(true);
            setIsTimeline(true);
            setIsForYou(false);
            setPage(1);
            const response = await fetch(process.env.REACT_APP_API_URL + '/tweets/following?page=1', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json();

            if(response.ok) {
                dispatch({type: 'SET_TWEETS', payload: json.tweets})
                setPageCount(json.totalPages);
                setIsLoading(false);
                setPage(1);
            }
        }
    }

    const handleFetchForYou = async () => {
        if (isTimeline === true) {
            setIsLoading(true);
            setIsTimeline(false);
            setIsForYou(true);
            setPage(1);
            const response = await fetch(process.env.REACT_APP_API_URL + '/tweets?page=1', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json();

            if(response.ok) {
                dispatch({type: 'SET_TWEETS', payload: json.tweets})
                setPageCount(json.totalPages);
                setIsLoading(false);
                setPage(1);
            }
        }
    }
    

    return(
        <>
        <main>
            <div className="main-content text-white px-0">
                
                <div className="main-content-menu sticky-top">
                    <div className="mc-title-container">
                        <h4 className="p-2">Home</h4>
                    </div>
                    <div className="mc-buttons">
                        <div className={isForYou? timelineClass : nonTimelineClass} disabled={isLoading} onClick={handleFetchForYou}>
                            For you
                        </div>
                        <div className={isTimeline? timelineClass : nonTimelineClass} disabled={isLoading} onClick={handleFetchFollowing}>
                            Following
                        </div>
                    </div>
                </div>

                <HomeTweetForm/>

                {tweets && tweets.map((tweet) => (
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
        </main>           
        </>
    )
}

export default Home