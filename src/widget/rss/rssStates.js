import { useRecoilState, atomFamily, useRecoilValue, selectorFamily } from 'recoil'

const rssUrlListState = atomFamily({
  key: 'rssUrlList',
  default: [
    { name: 'はてな IT', url: 'https://b.hatena.ne.jp/hotentry/it.rss' },
    { name: 'ギズモード', url: 'https://www.gizmodo.jp/index.xml' },
    { name: '暇人速報', url: 'http://himasoku.com/index.rdf' },
  ],
})

const rssItemListState = atomFamily({
  key: 'rssItemList',
  default: [],
})

const rssWidgetNameState = atomFamily({
  key: 'rssWidgetName',
  default: 'RSS',
})

export function useRssUrlState(id) {
  const [rssUrlList, setRssUrlList] = useRecoilState(rssUrlListState(id))
  const addRssUrlList = (newItem) => setRssUrlList([...rssUrlList, newItem])
  return { rssUrlList, addRssUrlList }
}

export function useItemListState(id) {
  const [rssItemList, setRssItemList] = useRecoilState(rssItemListState(id))
  const addItemList = (newItem) => setRssItemList([...rssItemList, newItem])
  return { rssItemList, addItemList }
}

export function useRemoveRss(id) {
  const [rssUrlList, setRssUrlList] = useRecoilState(rssUrlListState(id))
  const [rssItemList, setRssItemList] = useRecoilState(rssItemListState(id))

  const removeRss = (url) => {
    console.log(url)
    setRssUrlList(rssUrlList.filter((rss) => rss.url !== url))
    setRssItemList(rssItemList.filter((items) => items[0].rssURL !== url))
  }

  return removeRss
}

export function useRssWidgetNameState(id) {
  const [rssWidgetName, setRssWidgetName] = useRecoilState(rssWidgetNameState(id))
  return { rssWidgetName, setRssWidgetName }
}
