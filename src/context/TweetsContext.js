import { createContext, useReducer } from "react";

export const TweetsContext = createContext();

export const TweetsReducer = (state, action) => {
    switch(action.type) {
        case 'SET_TWEETS':
            return {
                tweets: action.payload
            }
        case 'CREATE_TWEET':
            return {
                tweets: [action.payload, ...state.tweets]
            }
        case 'DELETE_TWEET':
            return {
                tweets: state.tweets.filter((t) => t._id !== action.payload._id)
            }
        case 'LIKE_TWEET':
            return {
                tweets: [...state.tweets.map(t => {
                    if(t._id === action.payload._id) {
                        return action.payload;
                    }
                    return t;
                })]
            }
        default:
            return state
    }
}

export const TweetsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(TweetsReducer, {
        tweets: null
    })

    return (
        <TweetsContext.Provider value={{...state, dispatch}}>
            {children}
        </TweetsContext.Provider>
    )
}