import { startOfDay, getTime } from 'date-fns'
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

const isActiveState = atomFamily({
  key: 'isActive',
  default: false,
})

const useStopWatch = (id) => {
  const [startTime, setStartTime] = useRecoilState(StartTimeState(id))
  const [nowTime, setNowTime] = useRecoilState(NowTimeState(id))
  const [integrationTime, setIntegrationTime] = useRecoilState(IntegrationTimeState(id))
  const [isWatching, setIsWatching] = useRecoilState(isWatchingState(id))
  const [isActive, setIsActive] = useRecoilState(isActiveState(id))

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

  const switchPassiveMode = () => {
    setIsActive(false)
  }

  const switchActiveMode = () => {
    setIsActive(true)
  }

  useEffect(() => {
    if (isWatching && isActive) {
      const timer = setInterval(() => {
        const nowTime = getTime(new Date())
        setNowTime(nowTime)
      }, 33)
      return () => clearInterval(timer)
    }
  }, [isWatching, isActive])

  return { clickStart, clickStop, clickReset, switchPassiveMode, switchActiveMode, isWatching, elapsedTime: nowTime - startTime + integrationTime }
}

export default useStopWatch
