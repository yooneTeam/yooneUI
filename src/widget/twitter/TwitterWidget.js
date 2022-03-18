import axios from 'axios'
import useSWR from 'swr';
import { Stack, Divider, List, ListItem, ListItemText, ListItemButton, CardMedia, Typography } from '@mui/material';
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
            <List dense={true} sx={{ position: 'absolute', top: '0', left: '0', width: '100%' }}>
                {data.map(tweet =>
                    <div key={tweet.text} >
                        <ListItem disablePadding >
                            <ListItemText
                                primary={tweet.referencedText || tweet.text}
                                primaryTypographyProps={{
                                    whiteSpace: 'mormal',
                                    lineHeight: '1.4rem',
                                    fontSize: '0.85rem',
                                }}
                                sx={{
                                    width: '100%',
                                    ml: '5%',
                                    mr: '3%',
                                    my: '6px',
                                    overflow: 'hidden',
                                    wordBreak: 'break-all'
                                }}
                            />
                        </ListItem>
                        {(tweet.image || tweet.referencedImage?.[0]) &&
                            <ListItem disablePadding >
                                <CardMedia
                                    component="img"
                                    image={tweet.image || tweet.referencedImage?.[0] || ''}
                                    sx={{ pb: '3%', px: '5%', objectFit: 'cover' }}
                                />
                            </ListItem>}
                        <Divider />
                    </div>
                )}
            </List>
        </Stack>


    );
}