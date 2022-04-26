import { Dialog, Grid, Card, Typography, Button } from '@mui/material'
import { widgetInfos } from './widgetInfos'
import { ulid } from 'ulid'
import { alpha, styled } from '@mui/material/styles'
import { useComponentList } from './ComponentListState'

const medium = { xs: 12, md: 6, lg: 4 }

export default function ComponentSelector({ open, onClose }) {
  const { componentList, setComponentList } = useComponentList()

  const addComponent = (name) => {
    onClose()
    setComponentList([
      ...componentList,
      {
        id: ulid().toString(),
        name,
        size: medium,
      },
    ])
  }

  return (
    <Dialog onClose={onClose} open={open} maxWidth='lg' fullWidth>
      <Grid container spacing={2} sx={{ p: '4%' }} justifyContent='center' alignItems='center'>
        {Object.keys(widgetInfos).map((name) => (
          <Grid item {...medium} key={name}>
            <Card sx={{ display: 'grid', placeItems: 'center', height: '160px' }}>
              <Typography variant='h4' noWrap>
                {name}
              </Typography>
              <Button variant='contained' size='small' onClick={() => addComponent(name)}>
                追加
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Dialog>
  )
}
