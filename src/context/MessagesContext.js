import { createContext, useReducer } from "react";


export const MessagesContext = createContext();

export const MessagesReducer = (state, action) => {
    switch(action.type) {
        case 'SET_MESSAGES':
            return {
                messages : action.payload
            }
        case 'SEND_MESSAGE':
            return {
                messages : [...state.messages, action.payload]
            }
        default: 
            return state
    }
}

export const MessagesContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(MessagesReducer, {
        messages: null
    })

    return (
        <MessagesContext.Provider value={{...state, dispatch}}>
            {children}
        </MessagesContext.Provider>
    )
}