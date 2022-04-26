import { Stack, Typography, CircularProgress, IconButton } from '@mui/material'
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite'
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { format } from 'date-fns'
import useStopWatch from '../../common/hooks/useStopWatch'

export default function StopWatch({ id }) {
  const { clickStart, clickStop, clickReset, isWatching, elapsedTime } = useStopWatch(id)

  const handlePlay = () => {
    isWatching ? clickStop() : clickStart()
  }

  const formatMilliseconds = (ms) => {
    const helperDate = new Date(ms + 15 * 60 * 60 * 1000)
    return format(helperDate, 'HH:mm:ss')
  }

  const formatPercentOfMinutes = (ms) => {
    const helperDate = new Date(ms + 15 * 60 * 60 * 1000)
    return 100 * (parseFloat(format(helperDate, 's')) / 60)
  }

  console.log(elapsedTime)

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
              {isWatching ? <PauseCircleFilledIcon fontSize='inherit' /> : <PlayCircleFilledWhiteIcon fontSize='inherit' color='primary' />}
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
              <HighlightOffIcon fontSize='inherit' />
            </IconButton>
          ) : (
            <div style={{ width: '50px' }} />
          )}
        </Stack>
      </Stack>
    </div>
  )
}
