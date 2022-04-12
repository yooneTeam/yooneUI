import { atom, useRecoilState } from 'recoil'
import { localForageEffect } from '../../../common/effects/localForageEffect'

const small = { xs: 4, md: 3, lg: 2 }
const medium = { xs: 12, md: 6, lg: 4 }

const componentListState = atom({
  key: 'componentList',
  default: [
    // { id: 1, name: 'Clock', size: small },
    // // { id: 2, name: 'WeatherToday', size: small },
    // { id: 3, name: 'WeatherTommorow', size: small },
    // { id: 4, name: 'Stock', size: small },
    // { id: 5, name: 'Stock', size: small },
    // { id: 6, name: 'Stock', size: small },
    // // { id: 7, name: Neko, size: medium },
    // { id: 8, name: 'Youtube', size: medium },
    // { id: 9, name: 'Rss', size: medium },
    // { id: 11, name: 'Twitter', size: medium },
    // // { id: 9, name: Memo, size: small },
    // { id: 12, name: 'Counter', size: medium },
    // // { id: 12, name: Dice, size: small },
    // { id: 13, name: 'Spotify', size: medium },
  ],
  effects: [localForageEffect()],
})

export function useComponentList() {
  const [componentList, setComponentList] = useRecoilState(componentListState)
  return { componentList, setComponentList }
}
