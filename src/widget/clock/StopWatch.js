import { Stack, Typography, Button } from '@mui/material'
import format from 'date-fns/format'
import { useTheme } from '@emotion/react'
import useStopWatch from '../../common/hooks/useStopWatch'

export default function StopWatch(id) {
  const { clickStart, clickStop, clickReset, isWatching, elapsedTime } = useStopWatch(id)

  const handlePlay = () => {
    isWatching ? clickStop() : clickStart()
  }

  const formatMilliseconds = (ms) => {
    const helperDate = new Date(ms)
    return format(helperDate, 'mm:ss.SS')
  }

  return (
    <div style={{ height: '100%', width: '100%', display: 'grid', placeItems: 'center' }}>
      <Stack spacing={1} alignItems='center'>
        <Typography fontSize='2.5rem' fontWeight='400'>
          {formatMilliseconds(elapsedTime)}
        </Typography>
        <Stack direction='row' spacing={2}>
          <Button variant='outlined' size='small' onClick={clickReset}>
            リセット
          </Button>
          <Button variant='contained' size='small' onClick={handlePlay}>
            {isWatching ? 'ストップ' : 'スタート'}
          </Button>
        </Stack>
      </Stack>
    </div>
  )
}
