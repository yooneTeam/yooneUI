import axios from 'axios'
import useSWR from 'swr'
import SettingsIcon from '@mui/icons-material/Settings'
import { styled } from '@mui/material/styles'
import { Stack, List, ListItem, CardMedia, Typography, Avatar, Card, AppBar, Toolbar, IconButton } from '@mui/material'

export default function Twitter() {
  const fetcher = () =>
    axios.get('https://asia-northeast1-yooneapi.cloudfunctions.net/twitterGetTweet?userid=959072014899097601').then((res) => res.data)

  const { data, error } = useSWR('userid', fetcher)

  if (!data) return <div />
  if (error) return <div>error</div>

  console.log(data)
  const onClick = (url) => {
    console.log(url)
  }

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
    right: 23,
    zIndex: 5,
    width: 40,
    height: 40,
    position: 'absolute',
    borderRadius: '4px',
    transform: 'rotate(-155deg)',
    background: theme.palette.primary.lighter,
  }))

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
          {data.map((tweet) => (
            <ListItem key={tweet.text} disablePadding sx={{ my: '10px', px: '4%' }}>
              <Stack sx={{ mb: '4px', width: '100%' }}>
                {tweet.referenced_tweets?.type === 'retweeted' && (
                  <Stack direction='row' spacing={1} sx={{ mb: '10px' }}>
                    <Avatar src={tweet.referencedUser.profile_image_url} sx={{ border: '1.5px solid', borderColor: 'primary.light' }} />
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
                )}
                {tweet.referenced_tweets?.type !== 'retweeted' && <ArrowTweet />}
                <Card sx={{ backgroundColor: 'primary.lighter', mb: tweet.referenced_tweets?.type !== 'retweeted' && '4%', zIndex: 5 }}>
                  <Typography fontSize='0.85rem' sx={{ p: '4%' }}>
                    {tweet.referencedText || tweet.text}
                  </Typography>
                  {(tweet.image || tweet.referencedImage?.[0]) && (
                    <CardMedia
                      component='img'
                      image={tweet.image || tweet.referencedImage?.[0] || ''}
                      sx={{ objectFit: 'cover', borderRadius: '6%', width: '92%', ml: '4%', mb: '4%' }}
                    />
                  )}
                </Card>
              </Stack>
            </ListItem>
          ))}
        </List>
      </Stack>
      <AppBar position='absolute' sx={{ top: '83%', height: '17%', width: '100%' }}>
        <Typography fontWeight='500' fontSize='1rem' sx={{ position: 'absolute', top: '25%', left: '4%' }}>
          甲賀流忍者ぽんぽこ🍃たぬき！
        </Typography>
      </AppBar>
      <Avatar
        src={'https://pbs.twimg.com/profile_images/1474715067564572677/eiVSxL2__200x200.jpg'}
        sx={{
          position: 'absolute',
          top: '74%',
          right: '6%',
          width: '65px',
          height: '65px',
          zIndex: '2000',
          border: '4px solid',
          borderColor: 'primary.main',
        }}
      />
    </div>
  )
}
