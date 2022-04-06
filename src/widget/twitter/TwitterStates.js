import { useRecoilState, atomFamily } from 'recoil'
import { localForageEffect } from '../../common/effects/localForageEffect'

const twitterUserIdState = atomFamily({
  key: 'twitterUserId',
  default: '', //959072014899097601
  effects: [localForageEffect()],
})

export function useUserIdState(id) {
  const [userId, setuserId] = useRecoilState(twitterUserIdState(id))
  return { userId, setuserId }
}
