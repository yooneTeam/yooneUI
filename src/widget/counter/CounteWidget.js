import { Stack, IconButton, Typography, Box } from '@mui/material'
import { Add, Remove } from '@mui/icons-material'
import { useRecoilState, atomFamily } from 'recoil'

const counterState = atomFamily({
  key: 'counterState',
  default: 0,
})

export default function Counter({ id }) {
  const [count, setCount] = useRecoilState(counterState(id))

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant='h5' align='center'>
        Counter{id}
      </Typography>

      <Stack direction='row' justifyContent='center' alignItems='center' sx={{ pt: 2 }}>
        <IconButton
          size='large'
          onClick={() => {
            setCount(count - 1)
          }}
        >
          <Remove fontSize='large' />
        </IconButton>
        <Typography variant='h2'>{count}</Typography>
        <IconButton
          size='large'
          onClick={() => {
            setCount(count + 1)
          }}
        >
          <Add fontSize='large' />
        </IconButton>
      </Stack>
    </Box>
  )
}
