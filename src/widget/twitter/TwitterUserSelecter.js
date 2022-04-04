import { useState } from 'react'
import axios from 'axios'
import { Stack, TextField, Typography, Avatar, Button, InputAdornment } from '@mui/material'
import { useUserIdState } from './TwitterStates'

const urlGetUser = 'https://asia-northeast1-yooneapi.cloudfunctions.net/twitterGetUserInfo'

export default function TwitterUserSelecter({ id }) {
  const { setuserId } = useUserIdState(id)
  const [timerID, setTimerID] = useState('')
  const [userInfo, setUserInfo] = useState({ name: 'ユーザー名を入力' })

  const fetcher = (username) =>
    username.match(/^[0-9a-zA-Z]*$/) &&
    axios
      .get(urlGetUser, { params: { username } })
      .then(({ data }) => {
        console.log(data)
        setUserInfo(data.data[0])
      })
      .catch((err) => {
        setUserInfo({ name: '存在しないユーザーです' })
      })

  const onChange = (e) => {
    const url = e.target.value
    clearTimeout(timerID)
    setTimerID(setTimeout(() => fetcher(url), 1000))
  }

  const onClickDecision = () => {
    setuserId(userInfo.id)
  }

  return (
    <Stack justifyContent='center' sx={{ placeItems: 'center', height: '100%', minHeight: '280px' }}>
      <Avatar src={userInfo?.profile_image_url} sx={{ width: '68px', height: '68px', mb: '2%' }} />
      <Typography fontWeight='500' variant='h4'>
        {userInfo.name}
      </Typography>
      <Stack direction='row' my='5%' sx={{ width: '80%' }} justifyContent='center'>
        <TextField
          onChange={onChange}
          size='small'
          label='ユーザー名'
          InputProps={{
            startAdornment: <InputAdornment position='start'>@</InputAdornment>,
          }}
        />
        <Button onClick={onClickDecision} variant='contained' disabled={Boolean(!userInfo?.id)}>
          決定
        </Button>
      </Stack>
    </Stack>
  )
}
