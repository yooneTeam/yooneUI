import { useSortable } from '@dnd-kit/sortable'
import { Grid, Card, Stack, Avatar } from '@mui/material'

import CloseIcon from '@mui/icons-material/Close'
import OpenWithIcon from '@mui/icons-material/OpenWith'
import { useIsSettingMode } from '../../hooks/useIsSetting'

export default function MovableItem({ id, size, children }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

  const { isSettingMode } = useIsSettingMode()

  const onClickClose = () => {
    console.log('close')
  }

  const scale = attributes['aria-pressed'] ? 1.08 : 1
  const zIndex = attributes['aria-pressed'] ? 1500 : 1

  const style = {
    transform: transform && `translate3d(${transform.x}px, ${transform.y}px, 0) scaleX(${scale}) scaleY(${scale})`,
    transition,
    zIndex,
    touchAction: 'auto',
  }

  return (
    <Grid item {...size}>
      <Card sx={{ minHeight: '200px', height: '100%' }} ref={setNodeRef} style={style}>
        {children}
        {isSettingMode && (
          <Stack
            direction='row'
            sx={{
              position: 'absolute',
              top: '0%',
              left: '0%',
              zIndex: '2000',
              width: '100%',
              height: '20%',
              justifyContent: 'space-between',
              direction: 'row',
            }}
          >
            <Avatar sx={{ bgcolor: 'back.main', cursor: 'move' }} {...attributes} {...listeners}>
              <OpenWithIcon />
            </Avatar>
            <Avatar sx={{ bgcolor: 'error.main' }} onClick={onClickClose}>
              <CloseIcon />
            </Avatar>
          </Stack>
        )}
      </Card>
    </Grid>
  )
}
