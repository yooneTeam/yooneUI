import axios from 'axios'
import useSWR from 'swr'

const fetcher = (url) => axios.get(url).then((res) => res.data)

const useLocation = () => {
  const { data, error } = useSWR('https://ipapi.co/json', fetcher)
  return !data || error ? 13 : data.region_code
}

export default useLocation
