import { Stack, Typography, CircularProgress, IconButton } from '@mui/material'
import { PlayCircleFilledWhite, PauseCircleFilled, HighlightOff } from '@mui/icons-material'
import useStopWatch from '../../common/hooks/useStopWatch'

const zeroPadding = (num) => num.toString().padStart(2, '0')

const formatMilliseconds = (ms = 0) => {
  const secTmp = Math.trunc(ms / 1000)
  const hour = zeroPadding(Math.trunc(secTmp / 3600))
  const min = zeroPadding(Math.trunc((secTmp % 3600) / 60))
  const sec = zeroPadding(Math.trunc(secTmp % 60))
  return hour + ':' + min + ':' + sec
}

const formatPercentOfMinutes = (ms) => {
  return (Math.trunc(ms / 1000) % 60) * (100 / 60)
}

export default function StopWatch({ id }) {
  const { clickStart, clickStop, clickReset, isWatching, elapsedTime } = useStopWatch(id)

  const handlePlay = () => {
    isWatching ? clickStop() : clickStart()
  }

  return (
    <div style={{ height: '100%', width: '100%', display: 'grid', placeItems: 'center' }}>
      <Stack alignItems='center' spacing={1}>
        <Typography fontSize='2.8rem' fontWeight='300' sx={{ m: '-5px' }}>
          {formatMilliseconds(elapsedTime)}
        </Typography>
        <Stack direction='row' spacing={1} alignItems='center'>
          <div style={{ width: '50px' }} />

          <div style={{ position: 'relative', display: 'grid', placeItems: 'center' }}>
            <IconButton onClick={handlePlay} sx={{ fontSize: 70, position: 'rerative' }} size='small'>
              {isWatching ? <PauseCircleFilled fontSize='inherit' /> : <PlayCircleFilledWhite fontSize='inherit' color='primary' />}
            </IconButton>
            <CircularProgress
              size={80}
              thickness={4}
              variant='determinate'
              value={formatPercentOfMinutes(elapsedTime)}
              sx={{
                position: 'absolute',
                zIndex: -1,
                color: (theme) => (isWatching ? theme.palette.primary.main : theme.palette.grey[500]),
              }}
            />
            <CircularProgress
              size={80}
              thickness={4}
              variant='determinate'
              value={100}
              sx={{
                position: 'absolute',
                zIndex: -2,
                color: (theme) => theme.palette.grey[300],
              }}
            />
          </div>

          {!isWatching && elapsedTime !== 0 ? (
            <IconButton onClick={clickReset} sx={{ fontSize: 30, width: '50px', height: '50px' }} size='small'>
              <HighlightOff fontSize='inherit' />
            </IconButton>
          ) : (
            <div style={{ width: '50px' }} />
          )}
        </Stack>
      </Stack>
    </div>
  )
}
