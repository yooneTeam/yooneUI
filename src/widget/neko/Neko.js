import axios from 'axios'
import useSWR from 'swr'
import { CardMedia, Box } from '@mui/material'
import { height } from '@mui/system'

const fetcher = (url) => axios.get(url).then((res) => res.data) // swr用のPromiseを返す関数

export default function Neko() {
  const { data, error } = useSWR('https://aws.random.cat/meow', fetcher)

  if (error) return <div>error</div>
  if (!data) return <div>loading</div>

  return (
    <CardMedia
      component='img'
      image={data.file}
      sx={{ maxHeight: '250px', objectFit: 'contain' }}
    />
  )
}
