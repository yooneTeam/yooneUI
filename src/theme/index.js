import PropTypes from 'prop-types'
import { useMemo, useState, createContext } from 'react'
// material
import { CssBaseline } from '@mui/material'
import { ThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles'
//
import shape from './shape'
import paletteMaker from './paletteMaker'

import typography from './typography'
import componentsOverride from './overrides'
import { shadowMaker, customShadowMaker } from './shadowMaker'

ThemeConfig.propTypes = {
  children: PropTypes.node,
}

export const colorModeContext = createContext()

export default function ThemeConfig({ children }) {
  const [colorMode, setColorMode] = useState('light')

  const colorModeChanger = (mode) => {
    console.log(`change DarkMode ${  mode}`)
    setColorMode(mode)
  }

  const themeOptions = useMemo(() => {
    console.log('loading theme')
    console.log(colorMode)
    return {
      palette: paletteMaker(colorMode),
      shadows: shadowMaker(colorMode),
      customShadows: customShadowMaker(colorMode),
      shape,
      typography,
    }
  }, [colorMode])

  const theme = createTheme(themeOptions)
  theme.components = componentsOverride(theme)

  return (
    <colorModeContext.Provider value={{ colorModeChanger, colorMode }}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </StyledEngineProvider>
    </colorModeContext.Provider>
  )
}
