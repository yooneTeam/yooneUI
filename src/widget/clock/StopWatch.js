import { useEffect } from 'react'
import { Stack, Typography, Button } from '@mui/material'
import { format } from 'date-fns'
import { useTheme } from '@emotion/react'
import useStopWatch from '../../common/hooks/useStopWatch'

export default function StopWatch({ id, isHidden }) {
  const { clickStart, clickStop, clickReset, switchActiveMode, switchPassiveMode, isWatching, elapsedTime } = useStopWatch(id)

  useEffect(() => {
    isHidden ? switchPassiveMode() : switchActiveMode()
  }, [isHidden])

  const handlePlay = () => {
    isWatching ? clickStop() : clickStart()
  }

  const formatMilliseconds = (ms) => {
    const helperDate = new Date(ms + 15 * 60 * 60 * 1000)
    const formatType = ms < 60 * 1000 ? 'ss.SS' : ms < 60 * 60 * 1000 ? 'mm:ss.SS' : 'HH:mm:ss.SS'
    return format(helperDate, formatType)
  }

  return (
    <div style={{ height: '100%', width: '100%', display: 'grid', placeItems: 'center' }}>
      <Stack spacing={1} alignItems='center'>
        <Typography fontSize='3rem' fontWeight='300'>
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
