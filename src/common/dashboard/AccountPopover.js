import { useRef, useState } from 'react'
import { Button, Box, Divider, Typography, Avatar, IconButton } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person' // components
import MenuPopover from './MenuPopover'

// import LightModeIcon from '@mui/icons-material/LightMode';
// import Brightness4Icon from '@mui/icons-material/Brightness4';

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const anchorRef = useRef(null)
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleLogout = () => {
    console.log('logout')
  }

  return (
    <>
      <IconButton ref={anchorRef} onClick={handleOpen}>
        <Avatar sx={{ bgcolor: 'white' }}>
          <PersonIcon color='primary' fontSize='large' />
        </Avatar>
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 350 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant='h4'>'TestUser'</Typography>
          <Typography variant='subtitle' sx={{ color: 'text.secondary' }}>
            'user001A'
          </Typography>
          <Typography variant='subtitle2' sx={{ color: 'text.secondary' }}>
            'test@test.com'
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button fullWidth variant='contained' onClick={handleLogout}>
            ログアウト
          </Button>
        </Box>
      </MenuPopover>
    </>
  )
}
