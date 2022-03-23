import { SWRConfig } from 'swr'
import { RecoilRoot } from 'recoil'

export default function AppProvider({ children }) {
  return (
    <RecoilRoot>
      <SWRConfig
        value={{
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
          revalidateIfStale: false,
          refreshWhenHidden: true,
          refreshWhenOffline: true,
        }}
      >
        {children}
      </SWRConfig>
    </RecoilRoot>
  )
}
