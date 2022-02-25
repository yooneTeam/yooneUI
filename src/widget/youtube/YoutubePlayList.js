import { memo } from 'react';
import useSWR from 'swr';
import axios from 'axios'
import { Box, Stack, TextField, InputAdornment, Divider, List, ListItem, ListItemText, ListItemButton, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function YoutubePlayList({ id }) {   //44192　


    const fetcher = url => axios.get(url, {
        params: {
            key: 'AIzaSyDK3kWMm_HNy8GlVgBkmeoBm5ZkZD4MWwg',
            channelId: 'UC1EB8moGYdkoZQfWHjh7Ivw',
            part: 'snippet ',
            maxResults: '50',
            order: 'date',
        }
    }).then(res => res.data)


    const { data, error } = useSWR('https://www.googleapis.com/youtube/v3/search', fetcher)

    if (!data) return <div></div>

    const onClick = (info) => {
        console.log(info)
    }

    console.log(data)

    return (
        <Box sx={{ width: '100%', height: '70%', overflowY: 'auto', overflowX: 'hidden', position: 'relative' }}>
            <List dense={true} sx={{ position: 'absolute', top: '0', left: '0', width: '100%' }}>
                <Divider />
                {data.items.map(item =>
                    <span key={item.etag}>
                        <ListItem disablePadding >
                            <ListItemButton onClick={() => onClick(item)}>
                                <ListItemText
                                    primary={item.snippet.title}
                                    primaryTypographyProps={{
                                        noWrap: true,
                                        fontSize: 13,
                                        lineHeight: '14px',
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                    </span>
                )}
            </List>
        </Box>
    );
}

export default memo(YoutubePlayList);
