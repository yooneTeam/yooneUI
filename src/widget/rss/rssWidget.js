import { useState } from 'react';
import { Stack, Divider, List, ListItem, Typography, IconButton } from '@mui/material';
import { useRssUrlState, useItemListState } from './rssStates';
import useToday from '../../common/hooks/useToday';
import RssFetcher from './rssFetcher';
import RssViewer from './rssViewer';
import RssSetting from './rssSetting';

import SettingsIcon from '@mui/icons-material/Settings';
import CheckIcon from '@mui/icons-material/Check';

export default function RssWidget({ id }) {

    const { rssUrlList } = useRssUrlState(id)
    const { rssItemList } = useItemListState(id)
    const [isSettingRss, setIsSettingRss] = useState(false);
    const toDay = useToday()

    const onClickSetting = () => {
        setIsSettingRss(!isSettingRss)
    }

    const rssItemListSorted = Boolean(rssItemList.length)
        ? rssItemList.flat().sort((a, b) => a.date < b.date ? 1 : -1)
        : [{ title: 'Loading', date: toDay.toISOString() }]

    return (
        <Stack
            alignItems="center"
            sx={{ position: 'relative', maxHeight: '320px', paddingTop: '72%', width: '100%', overflowY: 'scroll' }}
        >
            <List dense={true} sx={{ position: 'absolute', top: '0', left: '0', width: '100%' }}>
                <ListItem >
                    <Stack direction='row' justifyContent='space-between' sx={{ width: '100%' }} >
                        <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, my: '-2px' }}>
                            RSS
                        </Typography>
                        <IconButton size='small' sx={{ mt: '-4px' }} onClick={onClickSetting}>
                            {isSettingRss
                                ? <CheckIcon fontSize="small" />
                                : <SettingsIcon fontSize="small" />
                            }
                        </IconButton>
                    </Stack>
                </ListItem>
                <Divider />
                {rssUrlList.map(rss => <RssFetcher key={rss.url} id={id} rssURL={rss.url} />)}
                {isSettingRss
                    ? <RssSetting id={id} />
                    : <RssViewer rssItemListSorted={rssItemListSorted} />
                }
            </List>
        </Stack>
    );
}