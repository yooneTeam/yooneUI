import { atom, useRecoilState } from 'recoil'

const isSettingModeState = atom({
  key: ' isSettingMode',
  default: false,
})

export const useIsSettingMode = () => {
  const [isSettingMode, setIsSettingMode] = useRecoilState(isSettingModeState)

  return { isSettingMode, setIsSettingMode }
}
