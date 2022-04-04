import { useRecoilState, atomFamily } from 'recoil'

const youtubeVideoInfoState = atomFamily({
  key: 'youtubeVideoInfo',
  default: {
    title: 'URLを入力',
    channelTitle: ' チャンネル or プレイリスト',
    videoId: '',
    index: -1,
  },
})

const youtubePlayListInfoState = atomFamily({
  key: 'youtubePlayListInfo',
  default: {
    // type: false,
    // id: '',
    type: 'channelId',
    id: 'UC1EB8moGYdkoZQfWHjh7Ivw',
  },
})
