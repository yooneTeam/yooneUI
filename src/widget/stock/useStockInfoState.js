import { useRecoilState, atomFamily } from 'recoil'

const stockInfoState = atomFamily({
  key: 'stockInfo',
  default: '',
})

export default function useStockInfoState(info) {
  // 44192
  const [stockInfo, setStockInfo] = useRecoilState(stockInfoState(info))
  return { stockInfo, setStockInfo }
}
