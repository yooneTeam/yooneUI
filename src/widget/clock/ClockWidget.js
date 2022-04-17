import { Stack, Typography, Divider } from '@mui/material'
import { useTheme } from '@emotion/react'
import { format, getSeconds } from 'date-fns'
import useNow from '../../common/hooks/useNow'
import AnarogClock from './AnarogClock'
import Calendar from './Calendar'

export default function Clock() {
  const time = useNow()
  const theme = useTheme()

  return (
    <Stack alignItems='center' sx={{ height: '100%', minHeight: '280px', width: '100%' }} divider={<Divider flexItem />}>
      <Stack direction='row' justifyContent='center' alignItems='center' sx={{ height: '100%', width: '100%', my: -2 }} spacing={3}>
        <AnarogClock time={time} />
        <Stack alignItems='center'>
          <Typography fontSize='4.5em' fontWeight='300' sx={{ my: -2 }}>
            {format(time, 'HH')}
            <span style={{ color: getSeconds(time) % 2 === 0 && theme.palette.primary.light }}>:</span>
            {format(time, 'mm')}
          </Typography>
          <Typography fontSize='1.3rem' fontWeight='500'>
            {format(time, 'yyyy/M/d')}
          </Typography>
        </Stack>
      </Stack>
      <Calendar />
    </Stack>
  )
}
