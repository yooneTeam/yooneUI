import { atom, useRecoilState } from 'recoil'
import { useEffect } from 'react'

const hasTouchScreenState = atom({
  key: ' hasTouchScreen',
  default: false,
})

export const useHasTouchScreen = () => {
  const [state, setState] = useRecoilState(hasTouchScreenState)

  useEffect(() => {
    setState(hasTouchScreen())
    console.log('test')
  }, [])

  return {
    hasTouchScreen: state,
  }
}

const hasTouchScreen = () => {
  if (navigator.maxTouchPoints > 0) {
    return true
  }
  if (navigator.msMaxTouchPoints > 0) {
    return true
  }
  if (window.matchMedia('(pointer:coarse)').matches) {
    return true
  }
  if ('orientation' in window) {
    return true
  }

  return false
}
