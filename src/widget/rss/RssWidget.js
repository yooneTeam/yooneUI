import { useState } from 'react'
import { Stack, Divider, List, ListItem, Typography, IconButton, Input } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import CheckIcon from '@mui/icons-material/Check'
import { useRssUrlState, useItemListState, useRssWidgetNameState } from './RssStates'
import useToday from '../../common/hooks/useToday'
import RssFetcher from './RssFetcher'
import RssViewer from './RssViewer'
import RssSetting from './RssSetting'

export default function RssWidget({ id }) {
  const { rssUrlList } = useRssUrlState(id)
  const { rssItemList } = useItemListState(id)
  const { rssWidgetName, setRssWidgetName } = useRssWidgetNameState(id)
  const [isSettingRss, setIsSettingRss] = useState(false)
  const toDay = useToday()

  const onClickSetting = () => {
    setIsSettingRss(!isSettingRss)
  }

  const onChangeName = (e) => {
    setRssWidgetName(e.target.value)
  }

  const rssItemListSorted = rssItemList.length
    ? rssItemList.flat().sort((a, b) => (a.date < b.date ? 1 : -1))
    : [{ title: 'No feed', date: toDay.toISOString() }]

  return (
    <div style={{ minHeight: '260px' }}>
      <Stack
        alignItems='center'
        sx={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          overflowY: 'scroll',
        }}
      >
        <List dense sx={{ width: '100%' }}>
          <ListItem>
            <Stack direction='row' justifyContent='space-between' sx={{ width: '100%' }}>
              {isSettingRss ? (
                <Input size='small' value={rssWidgetName} sx={{ my: 0, fontSize: '1rem', mt: '-3px', width: '100%' }} onChange={onChangeName} />
              ) : (
                <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, my: '-2px' }}>{rssWidgetName}</Typography>
              )}
              <IconButton size='small' sx={{ mt: '-4px' }} onClick={onClickSetting}>
                {isSettingRss ? <CheckIcon fontSize='small' /> : <SettingsIcon fontSize='small' />}
              </IconButton>
            </Stack>
          </ListItem>
          <Divider />
          {rssUrlList.map((rss) => (
            <RssFetcher key={rss.url} id={id} rssURL={rss.url} />
          ))}
          {isSettingRss ? <RssSetting id={id} /> : <RssViewer rssItemListSorted={rssItemListSorted} />}
        </List>
      </Stack>
    </div>
  )
}
