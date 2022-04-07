import { useRecoilState, atomFamily } from 'recoil'
import { localForageEffect } from '../../common/effects/localForageEffect'

const youtubeVideoInfoState = atomFamily({
  key: 'youtubeVideoInfo',
  default: {
    title: 'URLを入力',
    channelTitle: 'チャンネルURL or プレイリストURL',
    videoId: '',
    index: -1,
  },
})

const youtubePlayListInfoState = atomFamily({
  key: 'youtubePlayListInfo',
  default: {
    type: '',
    id: '', //UC1EB8moGYdkoZQfWHjh7Ivw
  },
  effects: [localForageEffect()],
})

export function usePlayListInfoState(id) {
  const [playListInfo, setPlayListInfo] = useRecoilState(youtubePlayListInfoState(id))
  return { playListInfo, setPlayListInfo }
}

export function useVideoInfoState(id) {
  const [videoInfo, setVideoInfo] = useRecoilState(youtubeVideoInfoState(id))
  return { videoInfo, setVideoInfo }
}
