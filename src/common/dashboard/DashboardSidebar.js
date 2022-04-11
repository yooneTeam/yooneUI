import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
// material
import { styled } from '@mui/material/styles'
import { Box, SwipeableDrawer } from '@mui/material'
// components
import Logo from './Logo'
import NavSection from './NavSection'
import { MHidden } from './@material-extend'
//
import sidebarConfig from './SidebarConfig'

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 230

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}))

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
}

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation()

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar()
    }
  }, [pathname])

  const renderContent = (
    <>
      <Box sx={{ px: 2.5, py: 3 }}>
        <Box component={RouterLink} to='/' sx={{ display: 'inline-flex' }}>
          <Logo />
        </Box>
      </Box>
      <NavSection navConfig={sidebarConfig} />
      <Box sx={{ flexGrow: 1 }} />
    </>
  )

  return (
    <RootStyle>
      <MHidden width='lgUp'>
        <SwipeableDrawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </SwipeableDrawer>
      </MHidden>

      <MHidden width='lgDown'>
        <SwipeableDrawer
          open
          variant='persistent'
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
            },
          }}
        >
          {renderContent}
        </SwipeableDrawer>
      </MHidden>
    </RootStyle>
  )
}
