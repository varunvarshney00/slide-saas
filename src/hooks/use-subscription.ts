import axios from "axios";
import { useState } from "react"

export const useSubscription = () => {
    const [isProcessing, setIsProcessing] = useState(false);

    const onSubscribe = async () => {
        setIsProcessing(true)

        const response = await axios.get('/api/payment');

        if (response.data.status === 200) {
            return (window.location.href = `${response.data.session_url}`)
        }

        setIsProcessing(false);
    }

    return { onSubscribe, isProcessing }

}