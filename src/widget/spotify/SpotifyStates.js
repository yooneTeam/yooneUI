import { useRecoilState, atomFamily } from 'recoil'

const spotifyPlayListIdState = atomFamily({
  key: 'spotifyPlayListId',
  default: '', //1tX5x49srrtvCfOmsJvgjf
})

export function useSpotifyPlayListId(id) {
  const [spotifyPlayListId, setSpotifyPlayListId] = useRecoilState(spotifyPlayListIdState(id))
  return { spotifyPlayListId, setSpotifyPlayListId }
}
