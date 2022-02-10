import { atom, useRecoilValue } from 'recoil';

const todayState = atom({
    key: "today",
    default: new Date(),
});

const useToday = () => {
    return useRecoilValue(todayState)
}

export default useToday