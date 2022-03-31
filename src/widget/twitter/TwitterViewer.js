import axios from 'axios'
import useSWR from 'swr'
import reactStringReplace from 'react-string-replace'
import { styled } from '@mui/material/styles'
import { Stack, List, ListItem, CardMedia, Typography, Avatar, Card, AppBar } from '@mui/material'

const urlGetTweet = 'https://asia-northeast1-yooneapi.cloudfunctions.net/twitterGetTweet'
const urlGetUser = 'https://asia-northeast1-yooneapi.cloudfunctions.net/twitterGetUserInfo'

export default function TwitterViewer({ userid }) {
  const fetcherTweets = () => axios.get(urlGetTweet, { params: { userid } }).then((res) => res.data)
  const { data: tweets = [{ text: 'Loading' }], error: errorTweet } = useSWR('tweet' + userid, fetcherTweets)

  const fetcherUserInfo = () => axios.get(urlGetUser, { params: { id: userid } }).then(({ data }) => data.data[0])
  const { data: userInfo = { username: '', name: 'Loading', profile_image_url: '' }, error: errorUser } = useSWR('user' + userid, fetcherUserInfo)

  if (errorTweet || errorUser) return <div>error</div>

  console.log(userInfo)

  const ArrowReTweet = styled('span')(({ theme }) => ({
    top: 46,
    left: 20,
    zIndex: 5,
    width: 30,
    height: 30,
    position: 'absolute',
    borderRadius: '4px',
    transform: 'rotate(-135deg)',
    background: theme.palette.primary.lighter,
  }))

  const ArrowTweet = styled('span')(({ theme }) => ({
    bottom: 8,
    right: 36,
    zIndex: 5,
    width: 40,
    height: 40,
    position: 'absolute',
    borderRadius: '4px',
    transform: 'rotate(-150deg)',
    background: theme.palette.primary.lighter,
  }))

  const regURL = /(https?:\/\/\S+)/g

  return (
    <div style={{ minHeight: '280px' }}>
      <Stack
        alignItems='center'
        sx={{
          position: 'absolute',
          height: '83%',
          width: '100%',
          overflowY: 'scroll',
        }}
      >
        <List dense sx={{ width: '100%' }}>
          {tweets.map((tweet, index) => (
            <ListItem key={index} disablePadding sx={{ my: '10px', px: '4%' }}>
              <Stack sx={{ mb: '4px', width: '100%' }}>
                {tweet.referenced_tweets?.type === 'retweeted' ? (
                  <Stack direction='row' spacing={1} sx={{ mb: '10px' }}>
                    <Avatar src={tweet.referencedUser.profile_image_url} sx={{ border: '2px solid', borderColor: 'primary.light' }} />
                    <ArrowReTweet />
                    <Stack sx={{ whiteSpace: 'nowrap', overflow: 'hidden', width: '100%' }}>
                      <Typography fontWeight='600' fontSize='0.85rem' noWrap sx={{ width: '100%' }}>
                        {tweet.referencedUser.name}
                      </Typography>
                      <Typography fontWeight='500' fontSize='0.75rem' sx={{ opacity: '0.8' }}>
                        {`@${tweet.referencedUser.username}`}
                      </Typography>
                    </Stack>
                  </Stack>
                ) : (
                  <ArrowTweet />
                )}

                <Card sx={{ backgroundColor: 'primary.lighter', mb: tweet.referenced_tweets?.type !== 'retweeted' && '4%', zIndex: 5 }}>
                  <Typography fontSize='0.85rem' sx={{ p: '4%' }}>
                    {reactStringReplace((tweet.referenced_tweets?.type !== 'quoted' && tweet.referencedText) || tweet.text, regURL, (match, i) => (
                      <a href={match} target='_blank' rel='noreferrer'>
                        {match}
                      </a>
                    ))}
                  </Typography>
                  {tweet.referenced_tweets?.type !== 'quoted' && (tweet.image || tweet.referencedImage?.[0]) && (
                    <CardMedia
                      component='img'
                      image={tweet.image?.[0] || tweet.referencedImage?.[0] || ''}
                      sx={{ objectFit: 'cover', borderRadius: '6%', width: '92%', ml: '4%', mb: '4%' }}
                    />
                  )}
                  {tweet.referenced_tweets?.type === 'quoted' && (
                    <Card sx={{ mx: '4%', mb: '4%' }}>
                      <Stack direction='row' sx={{ width: '100%', px: '4%', pt: '2%', mb: '-2%' }}>
                        <Typography fontWeight='600' fontSize='0.85rem' noWrap sx={{ whiteSpace: 'nowrap', overflow: 'hidden', width: '60%' }}>
                          {tweet.referencedUser.name}
                        </Typography>
                        <Typography
                          fontWeight='500'
                          fontSize='0.75rem'
                          sx={{ whiteSpace: 'nowrap', overflow: 'hidden', width: '40%', opacity: '0.8' }}
                        >
                          {`@${tweet.referencedUser.username}`}
                        </Typography>
                      </Stack>
                      <Typography fontSize='0.83rem' sx={{ p: '4%' }}>
                        {reactStringReplace(tweet.referencedText, regURL, (match, i) => (
                          <a href={match} target='_blank' rel='noreferrer'>
                            {match}
                          </a>
                        ))}
                      </Typography>
                      <CardMedia
                        component='img'
                        image={tweet.referencedImage?.[0] || ''}
                        sx={{ objectFit: 'cover', borderRadius: '6%', width: '92%', ml: '4%', mb: '4%' }}
                      />
                    </Card>
                  )}
                </Card>
              </Stack>
            </ListItem>
          ))}
          <div style={{ height: '15px' }}></div>
        </List>
      </Stack>
      <AppBar position='absolute' sx={{ top: '83%', height: '17%', width: '100%' }}>
        <Typography fontWeight='500' fontSize='1rem' noWrap sx={{ position: 'absolute', top: '8%', left: '4%', width: '60%' }}>
          {userInfo.name}
        </Typography>
        <Typography fontWeight='300' fontSize='0.72rem' sx={{ position: 'absolute', top: '55%', left: '5%', opacity: '0.9' }}>
          {userInfo.username && '@' + userInfo.username}
        </Typography>
      </AppBar>
      <Avatar
        src={userInfo?.profile_image_url?.replace('normal', '200x200')}
        sx={{
          position: 'absolute',
          top: '74%',
          right: '6%',
          width: '68px',
          height: '68px',
          zIndex: '1200',
          border: '3px solid',
          borderColor: 'primary.main',
        }}
      />
    </div>
  )
}
