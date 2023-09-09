import { useState } from "react"
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const {dispatch} = useAuthContext();

    const login = async (loginUsername, password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch(process.env.REACT_APP_API_URL + '/users/login', {
            method: 'POST',
            body: JSON.stringify({loginUsername, password}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();

        if(!response.ok) {
            setIsLoading(false);
            setError(json.error);
        }
        if(response.ok){
            localStorage.setItem('user', JSON.stringify(json));

            dispatch({type: 'LOGIN', payload: json});

            setIsLoading(false);
        }
    }

    return { login, isLoading, error }
}