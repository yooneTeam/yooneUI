import { getTime } from 'date-fns'
import { atomFamily, useRecoilState } from 'recoil'
import { useEffect } from 'react'
import { localForageEffect } from '../effects/localForageEffect'

const StartTimeState = atomFamily({
  key: 'startTime',
  default: 0,
  effects: [localForageEffect()],
})

const NowTimeState = atomFamily({
  key: 'nowTime',
  default: 0,
})

const IntegrationTimeState = atomFamily({
  key: 'integrationTime',
  default: 0,
  effects: [localForageEffect()],
})

const isWatchingState = atomFamily({
  key: 'isWatching',
  default: false,
  effects: [localForageEffect()],
})

const useStopWatch = (id) => {
  const [startTime, setStartTime] = useRecoilState(StartTimeState(id))
  const [nowTime, setNowTime] = useRecoilState(NowTimeState(id))
  const [integrationTime, setIntegrationTime] = useRecoilState(IntegrationTimeState(id))
  const [isWatching, setIsWatching] = useRecoilState(isWatchingState(id))

  const clickStart = () => {
    console.log('start')
    const nowTime = getTime(new Date())
    setStartTime(nowTime)
    setNowTime(nowTime)
    setIsWatching(true)
  }

  const clickStop = () => {
    setIsWatching(false)
    setIntegrationTime(nowTime - startTime + integrationTime)
    setStartTime(0)
    setNowTime(0)
    console.log('stop')
  }

  const clickReset = () => {
    setIsWatching(false)
    setIntegrationTime(0)
    setStartTime(0)
    setNowTime(0)
    console.log('reset')
  }

  useEffect(() => {
    if (isWatching) {
      const timer = setInterval(() => {
        const nowTime = getTime(new Date())
        setNowTime(nowTime)
      }, 250)
      return () => clearInterval(timer)
    }
  }, [isWatching])

  return { clickStart, clickStop, clickReset, isWatching, elapsedTime: nowTime - startTime + integrationTime }
}

export default useStopWatch
