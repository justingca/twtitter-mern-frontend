import { createContext, useReducer } from "react";


export const NotificationsContext = createContext();

export const NotificationsReducer = (state, action) => {
    switch(action.type) {
        case 'SET_NOTIF_COUNT': 
            return {
                notifCount : action.payload
            }
        default: return state
    }
}

export const NotificationsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(NotificationsReducer, {
        notifCount : null
    })

    return (
        <NotificationsContext.Provider value={{...state, dispatch}}>
            {children}
        </NotificationsContext.Provider>
    )
}