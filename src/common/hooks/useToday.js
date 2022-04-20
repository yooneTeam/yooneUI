import startOfDay from 'date-fns/startOfDay'
import { atom, useRecoilState } from 'recoil'
import { useEffect } from 'react'

const todayState = atom({
  key: 'today',
  default: startOfDay(new Date()),
})

const useToday = () => {
  const [today, setToday] = useRecoilState(todayState)

  useEffect(() => {
    const timer = setInterval(() => {
      const today = startOfDay(new Date())
      setToday(today)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return today
}

export default useToday
