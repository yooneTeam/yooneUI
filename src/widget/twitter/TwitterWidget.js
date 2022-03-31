import { useUserIdState } from './TwitterStates'
import TwitterViewer from './TwitterViewer'
import TwitterUserSelecter from './TwitterUserSelecter'

export default function Twitter({ id }) {
  const { userId } = useUserIdState(id)
  return userId ? <TwitterViewer userid={userId} /> : <TwitterUserSelecter id={id} />
}
