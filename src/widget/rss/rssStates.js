import { useRecoilState, atomFamily, useRecoilValue, selectorFamily } from 'recoil';

const rssUrlListState = atomFamily({
    key: 'rssUrlList',
    // default: ['https://b.hatena.ne.jp/hotentry/it.rss', 'https://www.gizmodo.jp/index.xml', 'http://himasoku.com/index.rdf']
    default: [
        { name: 'はてな IT', url: 'https://b.hatena.ne.jp/hotentry/it.rss' },
        { name: 'ギズモード', url: 'https://www.gizmodo.jp/index.xml' },
        { name: '暇人速報', url: 'http://himasoku.com/index.rdf' },
    ]
});

const rssItemListState = atomFamily({
    key: 'rssItemList',
    default: []
});

export function useRssUrlState(id) {
    const [rssUrlList, setRssUrlList] = useRecoilState(rssUrlListState(id));
    const addRssUrlList = newItem => setRssUrlList([...rssUrlList, newItem])
    return { rssUrlList, addRssUrlList }
}

export function useItemListState(id) {
    const [rssItemList, setRssItemList] = useRecoilState(rssItemListState(id));
    const addItemList = newItem => setRssItemList([...rssItemList, newItem])
    return { rssItemList, addItemList }
}
