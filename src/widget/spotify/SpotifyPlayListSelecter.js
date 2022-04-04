import { useState } from 'react'
import { Stack, Input, Typography, Avatar } from '@mui/material'
import { useSpotifyPlayListId } from './SpotifyStates'
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic'

export default function SpotifyPlayListSelecter({ id }) {
  const { setSpotifyPlayListId } = useSpotifyPlayListId(id)
  const [timerID, setTimerID] = useState('')
  const [infoText, setInfoText] = useState('プレイリストのURLを入力')

  const fetcher = (url) => {
    const playlistId = url.match(/playlist\/[\w-]{22}/)
    playlistId ? setSpotifyPlayListId(playlistId[0].slice(-22)) : setInfoText('無効なURLです')
  }

  const onChange = (e) => {
    const url = e.target.value
    clearTimeout(timerID)
    setTimerID(setTimeout(() => fetcher(url), 1000))
  }

  return (
    <Stack justifyContent='center' sx={{ placeItems: 'center', height: '100%', minHeight: '280px' }}>
      <Avatar sx={{ width: '80px', height: '80px', mb: '2%', bgcolor: '#44aa55' }}>
        <LibraryMusicIcon sx={{ width: '60px', height: '60px' }} />
      </Avatar>
      <Typography fontWeight='500' variant='h4'>
        {infoText}
      </Typography>
      <Input
        onChange={onChange}
        size='small'
        label='URL'
        placeholder='https://open.spotify.com/playlist/hogehoge...'
        sx={{
          fontSize: '14px',
          width: '80%',
        }}
      />
    </Stack>
  )
}
