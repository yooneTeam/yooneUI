import { lazy, memo } from 'react'

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

export const loadingComponentEffect =
  () =>
  ({ setSelf, onSet, trigger, node }) => {
    // const loadPersisted = async () => {
    //   const savedValue = await localforage.getItem(node.key)
    //   if (savedValue != null) setSelf(JSON.parse(savedValue))
    // }
    console.log('node', node)
    console.log('trigger', trigger)

    onSet((newValue, oldValue, isReset) => {
      console.log('newValue', newValue)

      const componentLoadedItems = newValue.map((item) => {
        return item.component ? item : { ...item, component: memo(lazy(() => import('../../../widget' + widgetPass[item.name]))) }
      })

      setSelf(componentLoadedItems)
    })
  }
