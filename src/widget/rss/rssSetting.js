import { useRssUrlState } from './rssStates';
import { Stack, Divider, ListItem, ListItemText, IconButton, CardMedia, Typography } from '@mui/material';
import { format, parseISO } from 'date-fns';
import DeleteIcon from '@mui/icons-material/Delete';

export default function RssSetting({ id }) {

    const { rssUrlList, addRssUrlList } = useRssUrlState(id)

    console.log('this is', rssUrlList)

    return (
        <>
            {rssUrlList.map(rss =>
                <div key={rss.url} >
                    <ListItem
                        secondaryAction={
                            <IconButton edge="end" size='small'>
                                <DeleteIcon fontSize='small' />
                            </IconButton>
                        }>
                        <ListItemText
                            primary={rss.name}
                            secondary={rss.url}
                            secondaryTypographyProps={{
                                noWrap: true,
                                fontSize: 11,
                                lineHeight: '15px',
                            }}
                        />
                    </ListItem>
                    <Divider />
                </div>
            )}
            {/* <ListItem
                secondaryAction={
                    <IconButton edge="end" size='small'>
                        <DeleteIcon fontSize='small' />
                    </IconButton>
                }>
                <ListItemText
                    primary={rss.name}
                    secondary={rss.url}
                    secondaryTypographyProps={{
                        noWrap: true,
                        fontSize: 11,
                        lineHeight: '15px',
                    }}
                />
            </ListItem> */}

        </>
    );
}