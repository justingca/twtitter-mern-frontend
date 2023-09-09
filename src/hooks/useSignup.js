import { useState } from "react"
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const {dispatch} = useAuthContext();

    const signup = async (username, email, password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch(process.env.REACT_APP_API_URL + '/users/signup', {
            method: 'POST',
            body: JSON.stringify({username, email, password}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok) {
            setIsLoading(false);
            setError(json.error);
        }
        if(response.ok) {
            //save user to localstorage
            localStorage.setItem('user', JSON.stringify(json));

            //update the auth context
            dispatch({type: 'LOGIN', payload: json});

            setIsLoading(false);
        }
    }

    return {signup, isLoading, error}
}