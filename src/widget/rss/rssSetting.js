import { useState } from 'react'
import axios from 'axios'
import { Stack, Divider, ListItem, ListItemText, IconButton, Button, Typography, Input } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useRssUrlState, useItemListState, useRemoveRss } from './rssStates'

const urlAPI = 'https://asia-northeast1-yooneapi.cloudfunctions.net/rssProxy'

export default function RssSetting({ id }) {
  const { rssUrlList, addRssUrlList } = useRssUrlState(id)
  const { addItemList } = useItemListState(id)
  const [timerID, setTimerID] = useState('')
  const [rssData, setRssData] = useState(false)
  const [infoText, setInfoText] = useState('RSSフィードのURLを入力')
  const removeRss = useRemoveRss(id)

  const fetcher = (url) =>
    url.match(/https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+/g) &&
    axios
      .get(urlAPI, { params: { url } })
      .then(({ data }) => {
        setRssData(data)
      })
      .catch((err) => {
        setInfoText('無効なURLです')
      })

  const onChange = (e) => {
    const url = e.target.value
    clearTimeout(timerID)
    setTimerID(setTimeout(() => fetcher(url), 1000))
  }

  const onClickAdd = () => {
    addItemList(rssData)
    addRssUrlList({ name: rssData[0].sourceName, url: rssData[0].rssURL })
  }

  const onClickRemove = (url) => {
    removeRss(url)
  }

  return (
    <>
      {rssUrlList.map((rss) => (
        <div key={rss.url}>
          <ListItem
            secondaryAction={
              <IconButton
                edge='end'
                size='small'
                onClick={() => {
                  onClickRemove(rss.url)
                }}
              >
                <DeleteIcon fontSize='small' />
              </IconButton>
            }
          >
            <ListItemText
              primary={rss.name}
              primaryTypographyProps={{
                noWrap: true,
              }}
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
      ))}
      <ListItem>
        <Typography variant='subtitle1' sx={{ mt: '10px' }} noWrap>
          {rssData[0] ? rssData[0].sourceName : infoText}
        </Typography>
      </ListItem>
      <ListItem>
        <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{ width: '100%', mt: '-8px' }}>
          <Input onChange={onChange} size='small' placeholder='https://www.hogehoge.rss' sx={{ my: 0, fontSize: '11px', width: '100%' }} />
          <Button
            onClick={onClickAdd}
            variant='contained'
            size='small'
            disabled={Boolean(!rssData[0] || rssUrlList.map((rss) => rss.url).includes(rssData[0].rssURL))}
            sx={{ ml: '12px' }}
          >
            追加
          </Button>
        </Stack>
      </ListItem>
    </>
  )
}
