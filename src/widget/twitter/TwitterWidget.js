import axios from 'axios'
import useSWR from 'swr';
import { Stack, Divider, List, ListItem, ListItemText, CardMedia, Typography, Avatar } from '@mui/material';
import { format, parseISO, isToday } from 'date-fns';

export default function Twitter({ id }) {

    const fetcher = () => axios.get('https://asia-northeast1-yooneapi.cloudfunctions.net/twitterGetTweet?userid=959072014899097601').then(res => res.data)
    const { data, error } = useSWR('userid', fetcher)

    if (!data) return <div></div>

    console.log(data)

    const onClick = (url) => {
        console.log(url)
    }

    return (

        <Stack
            alignItems="center"
            sx={{ position: 'relative', maxHeight: '320px', paddingTop: '72%', width: '100%', overflowY: 'scroll' }}
        >
            <List dense={true} sx={{ position: 'absolute', top: '0', left: '0', width: '100%', mt: '-7px', }}>
                {data.map(tweet =>
                    <div key={tweet.text} >
                        <ListItem disablePadding sx={{ my: '10px', px: '4%' }}>
                            <Stack sx={{ mb: '4px', width: '100%' }}>
                                {(tweet.referenced_tweets?.type === 'retweeted') &&
                                    <Stack direction='row' spacing={1} sx={{ mb: '8px' }}>
                                        <Avatar
                                            src={tweet.referencedUser.profile_image_url}
                                            sx={{ textAlign: 'left' }}
                                        />
                                        <Stack sx={{ whiteSpace: 'nowrap', overflow: 'hidden', width: '100%' }}>
                                            <Typography fontWeight='600' fontSize='0.85rem' noWrap sx={{ width: '80%' }}>
                                                {tweet.referencedUser.name}
                                            </Typography>
                                            <Typography fontWeight='500' fontSize='0.75rem' sx={{ opacity: '0.8' }}>
                                                {'@' + tweet.referencedUser.username}
                                            </Typography>
                                        </Stack >
                                    </Stack >
                                }
                                <Typography fontSize='0.85rem'>
                                    {tweet.referencedText || tweet.text}
                                </Typography>
                                {(tweet.image || tweet.referencedImage?.[0]) &&
                                    <CardMedia
                                        component="img"
                                        image={tweet.image || tweet.referencedImage?.[0] || ''}
                                        sx={{ objectFit: 'cover', pt: '4%', borderRadius: '6%' }}
                                    />}
                            </Stack>
                            {/* <ListItemText
                                primary={tweet.referencedText || tweet.text}
                                primaryTypographyProps={{
                                    // whiteSpace: 'mormal',
                                    lineHeight: '1.4rem',
                                    fontSize: '0.85rem',
                                }}
                                sx={{
                                    width: '100%',
                                    ml: '5%',
                                    mr: '3%',
                                    my: '7px',
                                    overflow: 'hidden',
                                    // wordBreak: 'break-all'
                                }}
                            /> */}
                        </ListItem>
                        <Divider />
                    </div>
                )}
            </List>
        </Stack>


    );
}