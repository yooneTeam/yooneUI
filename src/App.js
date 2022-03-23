import * as React from 'react'
import AppRouter from './common/AppRouter'
import AppProvider from './common/AppProvider'
import ThemeConfig from './theme'
import GlobalStyles from './theme/globalStyles'

export default function App() {
  return (
    <AppProvider>
      <ThemeConfig>
        <GlobalStyles />
        <AppRouter />
      </ThemeConfig>
    </AppProvider>
  )
}
