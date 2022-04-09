import { useRecoilState, atomFamily } from 'recoil'
import { localForageEffect } from '../../common/effects/localForageEffect'

const spotifyPlayListIdState = atomFamily({
  key: 'spotifyPlayListId',
  default: '', //1tX5x49srrtvCfOmsJvgjf
  effects: [localForageEffect()],
})

export function useSpotifyPlayListId(id) {
  const [spotifyPlayListId, setSpotifyPlayListId] = useRecoilState(spotifyPlayListIdState(id))
  return { spotifyPlayListId, setSpotifyPlayListId }
}
