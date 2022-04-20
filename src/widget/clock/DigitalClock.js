import { Stack, Typography } from '@mui/material'
import { useTheme } from '@emotion/react'
import { format, getSeconds } from 'date-fns'
import useNow from '../../common/hooks/useNow'

export default function DigitalClock() {
  const time = useNow()
  const theme = useTheme()

  return (
    <Stack alignItems='center'>
      <Typography fontSize='4.5em' fontWeight='300' sx={{ my: -2 }}>
        {format(time, 'HH')}
        <span style={{ color: getSeconds(time) % 2 === 0 && theme.palette.primary.light }}>:</span>
        {format(time, 'mm')}
      </Typography>
      <Typography fontSize='1.3rem' fontWeight='400'>
        {format(time, 'yyyy/M/d')}
      </Typography>
    </Stack>
  )
}
