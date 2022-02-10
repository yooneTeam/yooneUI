import { atom, useRecoilState } from 'recoil';
import { useEffect } from "react"

const nowState = atom({
    key: "now",
    default: new Date(),
});

const useNow = () => {
    const [now, setNow] = useRecoilState(nowState)

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            setNow(now);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return now
}
export default useNow