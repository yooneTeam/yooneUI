import { useEffect } from 'react'
import axios from 'axios'
import useSWR from 'swr'
import { useItemListState } from './rssStates'

const urlAPI = 'https://asia-northeast1-yooneapi.cloudfunctions.net/rssProxy'
const fetcher = (url) =>
  axios
    .get(urlAPI, {
      params: { url },
    })
    .then((res) => res.data)

export default function RssFetcher({ id, rssURL }) {
  const { rssItemList, addItemList } = useItemListState(id)
  const { data, error } = useSWR(rssURL, fetcher)

  const getedURL = rssItemList.map((item) => item[0].rssURL)

  useEffect(() => {
    data && !getedURL.includes(rssURL) && addItemList(data)
  }, [data])

  return null
}
