import { useState, useEffect } from "react"

const useTime = () => {
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => {
            const date = new Date();
            setDate(date);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (date)
}
export default useTime