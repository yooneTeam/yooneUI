import { atom, useRecoilState } from 'recoil'
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'
import { Grid, Container, IconButton } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { localForageEffect } from '../../../common/effects/localForageEffect'
import { useIsSettingMode } from '../../hooks/useIsSetting'
import { useHasTouchScreen } from '../../hooks/useHasTouchScreen'
import MovableItem from './MovableItem'
import ComponentImporter from './ComponentImporter'

const small = { xs: 4, md: 3, lg: 2 }
const medium = { xs: 12, md: 6, lg: 4 }

const widgetListsState = atom({
  key: 'widgetLists',
  default: [
    // { id: 1, name: 'Clock', size: small },
    // { id: 2, name: 'WeatherToday', size: small },
    // { id: 3, name: 'WeatherTommorow', size: small },
    // { id: 4, name: 'Stock', size: small },
    // { id: 5, name: 'Stock', size: small },
    // { id: 6, name: 'Stock', size: small },
    // // { id: 7, name: Neko, size: medium },
    // { id: 8, name: 'Youtube', size: medium },
    // { id: 10, name: 'Rss', size: medium },
    // { id: 11, name: 'Twitter', size: medium },
    // // { id: 9, name: Memo, size: small },
    // { id: 12, name: 'Counter', size: medium },
    // // { id: 12, name: Dice, size: small },
    // { id: 13, name: 'Spotify', size: medium },
  ],
  effects: [localForageEffect()],
})

// const localForageEffect =
//   () =>
//   ({ setSelf, onSet, trigger, node }) => {
//     const loadPersisted = async () => {
//       const savedValue = await localforage.getItem(node.key)
//       if (savedValue != null) setSelf(JSON.parse(savedValue))
//     }

//     if (trigger === 'get') loadPersisted()

//     onSet((newValue, _, isReset) => {
//       isReset ? localforage.removeItem(node.key) : localforage.setItem(node.key, JSON.stringify(newValue))
//     })
//   }

// const widgetComponentState = selector({
//   key: 'widgetComponentState',
//   get: ({ get }) => {
//     console.log(get(widgetListsState))
//     return get(widgetListsState)?.reduce((sum, { name }) => {
//       sum[name] = memo(lazy(() => import('../../../widget' + widgetPass[name])))
//       return sum
//     }, {})
//   },
// })

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
            {items.map(({ size, name, id }, index) => (
              <MovableItem key={id} id={id} size={size}>
                <ComponentImporter name={name} id={id} index={index} />
              </MovableItem>
            ))}
            {isSettingMode && (
              <Grid item {...medium} sx={{ height: 'auto', minHeight: '200px', display: 'grid', placeItems: 'center' }}>
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
