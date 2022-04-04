import { useRecoilState, atomFamily } from 'recoil'

const twitterUserIdState = atomFamily({
  key: 'twitterUserId',
  default: '959072014899097601', //959072014899097601
})

export function useUserIdState(id) {
  const [userId, setuserId] = useRecoilState(twitterUserIdState(id))
  return { userId, setuserId }
}
