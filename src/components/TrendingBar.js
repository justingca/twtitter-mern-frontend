import { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext"
import SuggestedUserDetails from "./SuggestedUsers";

const TrendingBar = () => {
    const [searchInput, setSearchInput] = useState('');
    const [searchUserResults, setSearchUserResults] = useState(null);
    const [suggestedUsers, setSuggestedUsers] = useState(null);
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchSuggested = async () => {
            const response = await fetch(process.env.REACT_APP_API_URL + '/users/suggested', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json();

            if(response.ok) {
                setSuggestedUsers(json);
            }
        }
        fetchSuggested();
    }, [user])

    const fetchData = async (ev) => {
        ev.preventDefault();

        if(searchInput !== '') {
            const response = await fetch(process.env.REACT_APP_API_URL + '/search/?filter=' + searchInput, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();
            if(response.ok) {
                setSearchUserResults(json);
            }
        }
    }


    return(
        <div className="div explore-bar">
            <form className="explore-form d-flex" onSubmit={fetchData}>
                <button className="explore-form-btn"><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
                <input className="form-control mr-sm-2 search-bar-input mt-2 text-white" 
                type="search" 
                placeholder="Search" 
                aria-label="Search"
                value={searchInput}
                onChange={(ev) => setSearchInput(ev.target.value)}
                />   
            </form>
            
            {searchUserResults && (
                <div className="subscribe-container text-white">
                <h5>Search Results</h5>
                {searchUserResults.length === 0 && (
                    <div>
                        No results found.
                    </div>
                )}
                {searchUserResults && searchUserResults.map(result => (
                    <div class="d-flex my-3">
                        <div className="sidebar-user-pic">
                            <img src={result.image} alt="profile-img"></img>
                        </div>
                        <div className="d-flex flex-column ms-3">
                            <Link to={`/${result.username}`} className="text-decoration-none text-white"><span>{result.displayName}</span></Link>
                            <span>@{result.username}</span>
                        </div>
                    </div>
                ))}
                </div>
            )}
            
                
           
            
            

            <div className="subscribe-container">
                <div className="subscribe-premium">
                    <h5>Subscribe to Premium</h5>
                    <span>Subscribe to unlock new features and if eligible, receive a share of ads revenue.</span>
                </div>
                <div className="subscribe-button">
                    Subscribe
                </div>
            </div>

            <div className="subscribe-container">
                <div className="subscribe-premium">
                    <h5 className="ms-2">Who To Follow</h5>

                    {suggestedUsers && suggestedUsers.map((sU) => (
                        <SuggestedUserDetails sU={sU} key={sU._id}/>
                    ))}
                                
                </div>
            </div>
        </div>
    )   
}

export default TrendingBar