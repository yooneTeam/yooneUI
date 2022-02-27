import { atom, useRecoilState } from 'recoil';

const isDraggingState = atom({
    key: "isDragging",
    default: false,
});

const useIsDragging = () => {
    const [isDraggingNow, setIsDragging] = useRecoilState(isDraggingState)
    return { isDraggingNow, setIsDragging }
}
export default useIsDragging