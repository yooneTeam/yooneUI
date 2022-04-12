import { useState } from 'react'
import { atom, useRecoilState } from 'recoil'
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'
import { Grid, Container, IconButton } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { localForageEffect } from '../../../common/effects/localForageEffect'
import { useIsSettingMode } from '../../hooks/useIsSetting'
import { useHasTouchScreen } from '../../hooks/useHasTouchScreen'
import MovableItem from './MovableItem'
import { useComponentList } from './ComponentListState'
import ComponentImporter from './ComponentImporter'
import ComponentSelector from './ComponentSelector'

export default function Home() {
  const { componentList, setComponentList } = useComponentList()
  const { hasTouchScreen } = useHasTouchScreen()
  const { isSettingMode } = useIsSettingMode()
  const [open, setOpen] = useState(false)

  const medium = { xs: 12, md: 6, lg: 4 }

  const sensors = useSensors(useSensor(hasTouchScreen ? TouchSensor : MouseSensor))

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (value) => {
    setOpen(false)
  }

  function handleDragEnd(event) {
    const { active, over } = event
    if (active.id !== over.id) {
      setComponentList((items) => {
        const oldIndex = items.findIndex((item) => active.id === item.id)
        const newIndex = items.findIndex((item) => over.id === item.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <SortableContext items={componentList}>
        <Container>
          <ComponentSelector open={open} onClose={handleClose} />
          <Grid container spacing={1} alignItems='stretch'>
            {componentList.map(({ size, name, id }, index) => (
              <MovableItem key={id} id={id} size={size}>
                <ComponentImporter name={name} id={id} index={index} />
              </MovableItem>
            ))}
            {isSettingMode && (
              <Grid item {...medium} sx={{ height: 'auto', minHeight: '200px', display: 'grid', placeItems: 'center' }}>
                <IconButton onClick={handleClickOpen}>
                  <AddCircleIcon sx={{ width: '60px', height: '60px', color: 'primary.main' }} />
                </IconButton>
              </Grid>
            )}
          </Grid>
        </Container>
      </SortableContext>
    </DndContext>
  )
}
