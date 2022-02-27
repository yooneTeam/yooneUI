import { memo } from 'react';
import { Box, Divider, List, ListItem, ListItemText, ListItemButton } from '@mui/material';

function YoutubePlayList({ onClickVideoItem, data, indexPlaying }) {

    if (!data) return <div style={{ height: '70%' }}></div>

    return (
        <Box sx={{ width: '100%', height: '70%', overflowY: 'auto', overflowX: 'hidden', position: 'relative' }}>
            <List dense={true} sx={{ position: 'absolute', top: '0', left: '0', width: '100%' }}>
                <Divider />
                {data.map((item, index) =>
                    <span key={item.videoId}>
                        <ListItem disablePadding >
                            {(index == indexPlaying) ?
                                <ListItemButton
                                    onClick={() => onClickVideoItem({ ...item, index })}
                                    sx={{ backgroundColor: 'primary.lighter' }}
                                >
                                    <ListItemText
                                        primary={item.title}
                                        primaryTypographyProps={{
                                            noWrap: true,
                                            fontSize: 13,
                                            lineHeight: '14px',
                                        }}
                                    />
                                </ListItemButton>
                                :
                                <ListItemButton onClick={() => onClickVideoItem({ ...item, index })}>
                                    <ListItemText
                                        primary={item.title}
                                        primaryTypographyProps={{
                                            noWrap: true,
                                            fontSize: 13,
                                            lineHeight: '14px',
                                        }}
                                    />
                                </ListItemButton>
                            }

                        </ListItem>
                        <Divider />
                    </span>
                )}
            </List>
        </Box>
    );
}

export default memo(YoutubePlayList);
