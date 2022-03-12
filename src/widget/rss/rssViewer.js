import { Stack, Divider, ListItem, ListItemText, ListItemButton, CardMedia, Typography } from '@mui/material';
import { format, parseISO } from 'date-fns';

export default function RssViewer({ rssItemListSorted }) {

    const onClick = (url) => {
        console.log(url)
        window.open(url, '_blank')
    }

    return (rssItemListSorted.map(item =>
        <div key={item.title} >
            <ListItem disablePadding >
                <ListItemButton onClick={() => onClick(item.link)}>
                    <Stack direction='row' sx={{ width: '100%' }}>
                        <CardMedia
                            component="img"
                            image={item.img || ''}
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
                                    WebkitBoxOrient: "vertical",
                                    WebkitLineClamp: '3',
                                }}
                            />
                            <Stack
                                direction='row'
                                justifyContent='space-between'
                                sx={{ width: '100%', height: '16px', ml: '4%' }}
                            >
                                <Typography color='main' sx={{
                                    color: 'primary.main',
                                    fontSize: '0.7rem',
                                    fontWeight: 500,
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    width: '62%'
                                }}>
                                    {item.sourceName}
                                </Typography>
                                <Typography sx={{ fontSize: '0.7rem', fontWeight: 400, opacity: 0.72 }}>
                                    {format(parseISO(item.date), 'd日 HH:mm')}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </ListItemButton>
            </ListItem>
            <Divider />
        </div>
    )
    );
}