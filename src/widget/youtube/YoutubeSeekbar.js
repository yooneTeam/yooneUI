import { memo } from 'react'
import { Typography, Slider, Stack } from '@mui/material'
import { styled } from '@mui/material/styles'
import { addSeconds, format, startOfDay } from 'date-fns'

const TinyText = styled(Typography)({
  fontSize: '0.72rem',
  opacity: 0.7,
  fontWeight: 500,
  letterSpacing: 0.2,
})

const valueLabelFormat = (seconds) => {
  const helperDate = addSeconds(startOfDay(new Date(0)), Number(seconds))
  return seconds > 3600 ? format(helperDate, 'H:mm:ss') : format(helperDate, 'm:ss')
}

export default memo(function YoutubeSeekbar({ progeress, duration, handleSeekChange }) {
  return (
    <Stack direction='row' justifyContent='center' alignItems='center' spacing={1.8} sx={{ width: '93%', mb: '-1%', mt: '1%' }}>
      <TinyText>{valueLabelFormat(progeress)}</TinyText>
      <Slider
        valueLabelDisplay='auto'
        valueLabelFormat={valueLabelFormat}
        size='small'
        max={duration}
        value={progeress}
        onChange={handleSeekChange}
      />
      <TinyText>{valueLabelFormat(duration)}</TinyText>
    </Stack>
  )
})
