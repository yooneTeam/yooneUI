import { memo } from 'react';
import { Box, Divider, List, ListItem, ListItemText, ListItemButton } from '@mui/material';

function YoutubePlayList({ onClickVideoItem, data, titlePlaying }) {

    const playList = data || [...Array(4)].map((_, index) => { return { title: '　', videoId: index, index } })

    console.log(playList)

    return (
        <Box sx={{ width: '100%', height: '70%', overflowY: 'auto', overflowX: 'hidden', position: 'relative' }}>
            <List dense={true} sx={{ position: 'absolute', top: '0', left: '0', width: '100%' }}>
                <Divider />
                {playList.map((item, index) =>
                    <div key={item.videoId} >
                        <ListItem disablePadding >
                            <ListItemButton
                                onClick={() => onClickVideoItem({ ...item, index })}
                                sx={{ backgroundColor: (item.title == titlePlaying) ? 'primary.lighter' : 'default' }}
                            >
                                <ListItemText
                                    primary={item.title}
                                    primaryTypographyProps={{
                                        noWrap: true,
                                        fontSize: 13,
                                        lineHeight: '14px',
                                        fontWeight: (item.title == titlePlaying) ? '700' : '400'
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                    </div>
                )}
            </List>
        </Box >
    );
}

export default memo(YoutubePlayList);
