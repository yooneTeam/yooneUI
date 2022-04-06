import React, { createElement } from 'react'
import { atom, useRecoilState } from 'recoil'
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'

import { Grid, Container, IconButton } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'

import { localForageEffect } from '../../../common/effects/localForageEffect'

import { useIsSettingMode } from '../../hooks/useIsSetting'
import { useHasTouchScreen } from '../../hooks/useHasTouchScreen'
import MovableItem from './MovableItem'

import Counter from '../../../widget/counter/CounteWidget'
import Neko from '../../../widget/neko/Neko'
import Clock from '../../../widget/clock/ClockWidget'
import WeatherToday from '../../../widget/weather/WeatherTodayWiget'
import WeatherTommorow from '../../../widget/weather/WeatherTommorowWiget'
import Stock from '../../../widget/stock/StockWidget'
import Youtube from '../../../widget/youtube/YoutubeWidget'
import Memo from '../../../widget/memo/memoWidget'
import Rss from '../../../widget/rss/rssWidget'
import Twitter from '../../../widget/twitter/TwitterWidget'
import Dice from '../../../widget/dice/diceWidget'
import Spotify from '../../../widget/spotify/SpotifyWidget'

const small = { xs: 4, md: 3, lg: 2 }
const medium = { xs: 12, md: 6, lg: 4 }

const widgetItems = {
  Clock,
  WeatherToday,
  WeatherTommorow,
  Stock,
  Youtube,
  Memo,
  Rss,
  Twitter,
  Spotify,
  Counter,
}

const widgetListsState = atom({
  key: 'widgetLists',
  default: [
    { id: 1, component: 'Clock', size: small },
    { id: 2, component: 'WeatherToday', size: small },
    { id: 3, component: 'WeatherTommorow', size: small },
    { id: 4, component: 'Stock', size: small },
    { id: 5, component: 'Stock', size: small },
    { id: 6, component: 'Stock', size: small },
    // { id: 7, component: Neko, size: medium },
    { id: 8, component: 'Youtube', size: medium },
    { id: 10, component: 'Rss', size: medium },
    { id: 11, component: 'Twitter', size: medium },
    // { id: 9, component: Memo, size: small },
    { id: 12, component: 'Counter', size: medium },
    // { id: 12, component: Dice, size: small },
    { id: 13, component: 'Spotify', size: medium },
  ],
  effects: [localForageEffect()],
})

export default function Home() {
  const [items, setItems] = useRecoilState(widgetListsState)
  const { hasTouchScreen } = useHasTouchScreen()
  const { isSettingMode } = useIsSettingMode()

  const sensors = useSensors(useSensor(hasTouchScreen ? TouchSensor : MouseSensor))

  function handleDragEnd(event) {
    const { active, over } = event
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => active.id === item.id)
        const newIndex = items.findIndex((item) => over.id === item.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <SortableContext items={items}>
        <Container>
          <Grid container spacing={1} alignItems='stretch'>
            {items.map(({ size, component, id }, index) => (
              <MovableItem key={id} id={id} size={size}>
                {createElement(widgetItems[component], { id, index })}
              </MovableItem>
            ))}
            {isSettingMode && (
              <Grid item {...medium} sx={{ height: 'auto', display: 'grid', placeItems: 'center' }}>
                <IconButton>
                  <AddCircleIcon sx={{ width: '60px', height: '60px', color: 'primary.dark' }} />
                </IconButton>
              </Grid>
            )}
          </Grid>
        </Container>
      </SortableContext>
    </DndContext>
  )
}
