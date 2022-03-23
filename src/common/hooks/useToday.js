import { atom, useRecoilValue } from 'recoil'

const todayState = atom({
  key: 'today',
  default: new Date(),
})

const useToday = () => useRecoilValue(todayState)

export default useToday
