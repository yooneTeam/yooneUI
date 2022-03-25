import PropTypes from 'prop-types'
import MenuIcon from '@mui/icons-material/Menu'
import { alpha, styled } from '@mui/material/styles'
import { Box, Stack, AppBar, Toolbar, IconButton, Typography, Card } from '@mui/material'
// components
import AccountPopover from './AccountPopover'
import SettingModeButton from './SettingModeButton'
import { MHidden } from './@material-extend'
//

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 230
const APPBAR_MOBILE = 64
const APPBAR_DESKTOP = 64

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'true',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.navbar, 0.5),
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
  },
}))

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}))

// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
}

export default function DashboardNavbar({ onOpenSidebar }) {
  return (
    <RootStyle>
      <ToolbarStyle>
        <MHidden width='lgUp'>
          <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'common.white' }}>
            <MenuIcon />
          </IconButton>
        </MHidden>

        {/* <MHidden width="lgDown">
            <Typography variant="h5">Energy Tracking System</Typography>
        </MHidden> */}

        {/* <Searchbar /> */}

        <Box sx={{ flexGrow: 1 }} />

        <Stack direction='row' alignItems='center' spacing={{ xs: 0.5, sm: 1.5 }}>
          <SettingModeButton />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  )
}
