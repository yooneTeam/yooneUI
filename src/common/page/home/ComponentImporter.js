import React, { createElement, Suspense, lazy, memo } from 'react'
import { atomFamily, useRecoilValue } from 'recoil'

const widgetPass = {
  Counter: '/counter/CounteWidget',
  Neko: '/neko/Neko',
  Clock: '/clock/ClockWidget',
  WeatherToday: '/weather/WeatherTodayWiget',
  WeatherTommorow: '/weather/WeatherTommorowWiget',
  Stock: '/stock/StockWidget',
  Youtube: '/youtube/YoutubeWidget',
  Memo: '/memo/memoWidget',
  Rss: '/rss/RssWidget',
  Twitter: '/twitter/TwitterWidget',
  Dice: '/dice/diceWidget',
  Spotify: '/spotify/SpotifyWidget',
}

const importComponentEffect =
  () =>
  ({ setSelf, onSet, trigger, node }) => {
    const importCoponent = async () => {
      console.log('initializeAtom')
      console.log(trigger, node)
      const name = node.key.replace('importedComponent__', '').replace(/"/g, '')
      if (name) {
        setSelf({
          name,
          component: memo(lazy(() => import('../../../widget' + widgetPass[name]))),
        })
      }
    }
    if (trigger === 'get') importCoponent()
  }

const importedComponentState = atomFamily({
  key: 'importedComponent',
  default: { name: null, component: null },
  effects: [importComponentEffect()],
})

const dummy = () => <div></div>

export default memo(function ComponentImporter({ name, id, index }) {
  console.log(name)
  const item = useRecoilValue(importedComponentState(name))
  console.log(item)

  return <Suspense fallback={dummy}>{createElement(item.component || dummy, { id, index })}</Suspense>
})
