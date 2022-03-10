import axios from 'axios'
import useSWR from 'swr';
import { Stack, Divider, List, ListItem, ListItemText, ListItemButton, CardMedia, Typography } from '@mui/material';
import { useRecoilState, atomFamily } from 'recoil';
import { format, parseISO } from 'date-fns';

const rssUrlState = atomFamily({
    key: 'counterState',
    default: ''
});


const urlAPI = 'https://asia-northeast1-yooneapi.cloudfunctions.net/rssProxy'

const fetcher = urlRss => axios.get(urlAPI, {
    params: { url: urlRss }
}).then(res => res.data)

export default function Rss({ id }) {   //44192　

    const { data, error } = useSWR(`https://www.gizmodo.jp/index.xml`, fetcher)

    if (error) return <div>error</div>
    if (!data) return <div></div>

    console.log(data)

    const onClick = (url) => {
        console.log(url)
        window.open(url, '_blank')
    }

    return (
        <Stack alignItems="center" sx={{ maxHeight: '320px' }} >
            <div style={{ position: 'relative', paddingTop: '75%', width: '100%', overflowY: 'auto' }}>
                <List dense={true} sx={{ position: 'absolute', top: '0', left: '0' }}>
                    <Divider />
                    {data.items.map(item =>
                        <span key={item.title}>
                            <ListItem disablePadding  >
                                <ListItemButton onClick={() => onClick(item.link)}>
                                    <Stack direction='row' sx={{ width: '100%' }}>
                                        <CardMedia
                                            component="img"
                                            image={item.img}
                                            sx={{ width: '40%', height: '80px', objectFit: 'cover', borderRadius: '8%' }}
                                        />
                                        <Stack sx={{ width: '60%', height: '80px' }} >
                                            <ListItemText
                                                primary={item.title}
                                                primaryTypographyProps={{
                                                    whiteSpace: 'mormal',
                                                    lineHeight: '20px',
                                                }}
                                                sx={{
                                                    width: '100%',
                                                    height: '60px',
                                                    ml: '4%',
                                                    mr: '-2%',
                                                    overflow: 'hidden',
                                                    display: "-webkit-box",
                                                    '-webkit-box-orient': "vertical",
                                                    '-webkit-line-clamp': '3',
                                                }}
                                            />
                                            <Stack
                                                direction='row'
                                                justifyContent='space-between'
                                                sx={{ width: '100%', height: '18px', ml: '4%' }}
                                            >
                                                <Typography color='main' sx={{ fontSize: '0.8rem' }}>
                                                    {data.items.sourceName}
                                                </Typography>
                                                <Typography sx={{ fontSize: '0.75rem', opacity: 0.75 }}>
                                                    {format(parseISO(item.date), 'M/d HH:mm')}
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                        </span>
                    )}
                </List>
            </div>
        </Stack>
    );
}