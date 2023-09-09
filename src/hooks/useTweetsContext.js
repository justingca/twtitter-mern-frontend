import { useContext } from "react"
import { TweetsContext } from "../context/TweetsContext"

export const useTweetsContext = () => {
    const context = useContext(TweetsContext);

    if(!context) {
        throw Error('useTweetsContext must be used within Tweets Context Provider');
    }

    return context
}