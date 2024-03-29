import { Stack, IconButton, Typography, Box } from '@mui/material'
import { Add, Remove } from '@mui/icons-material'
import { useRecoilState, atomFamily } from 'recoil'
import { localForageEffect } from '../../common/effects/localForageEffect'

const counterState = atomFamily({
  key: 'counterState',
  default: 0,
  effects: [localForageEffect()],
})

export default function Counter({ id, index }) {
  const [count, setCount] = useRecoilState(counterState(id))

  console.log(id, index)

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant='h5' align='center'>
        Counter
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
