import { useContext } from "react"
import { NotificationsContext } from "../context/NotificationContext"


export const useNotificationsContext = () => {
    const context = useContext(NotificationsContext);

    if(!context) {
        throw Error('useNotificationsContext must be used within NotificationsContextProvider');
    }

    return context
}