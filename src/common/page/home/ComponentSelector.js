import { Dialog } from '@mui/material'

export default function ComponentSelector({ open, onClose }) {
  return (
    <Dialog onClose={onClose} open={open}>
      <div>test</div>
    </Dialog>
  )
}
