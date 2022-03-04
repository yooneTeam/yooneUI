import axios from 'axios'
import useSWR from 'swr';
import { Stack, Divider, List, ListItem, ListItemText, ListItemButton } from '@mui/material';
import { useRecoilState, atomFamily } from 'recoil';

const rssUrlState = atomFamily({
    key: 'counterState',
    default: ''
});

const fetcher = url => axios.get(url).then(res => res.data)

export default function Rss({ id }) {   //44192　

    const { data, error } = useSWR('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fb.hatena.ne.jp%2Fhotentry%2Fit.rss', fetcher)

    if (error) return <div>error</div>
    if (!data) return <div>loading</div>

    console.log(data)

    const onClick = (item) => {
        console.log(item)
    }

    return (
        <Stack alignItems="center" sx={{ maxHeight: '320px' }}  >
            <div style={{ position: 'relative', paddingTop: '75%', width: '100%', overflowY: 'auto', }}>
                <List dense={true} sx={{ position: 'absolute', top: '0', left: '0', width: '100%' }}>
                    <Divider />
                    {data.items.map(item =>
                        <span key={item.id}>
                            <ListItem disablePadding  >
                                <ListItemButton onClick={() => onClick(item)}>
                                    <ListItemText
                                        primary={item.title}
                                        primaryTypographyProps={{
                                            noWrap: false,
                                        }} />
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