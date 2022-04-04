import SpotifyFrame from './SpotifyFrame'
import SpotifyPlayListSelecter from './SpotifyPlayListSelecter'
import { useSpotifyPlayListId } from './SpotifyStates'

export default function Spotify({ id }) {
  const { spotifyPlayListId } = useSpotifyPlayListId(id)
  return spotifyPlayListId ? <SpotifyFrame spotifyPlayListId={spotifyPlayListId} /> : <SpotifyPlayListSelecter id={id} />
}
