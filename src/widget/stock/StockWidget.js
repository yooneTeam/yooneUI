import useStockInfoState from './useStockInfoState'
import StockSelector from './StockSelector'
import StockChart from './StockChart'

export default function Stock({ id }) {
  // 44192

  const { stockInfo } = useStockInfoState(id)

  return stockInfo ? <StockChart stockInfo={stockInfo} /> : <StockSelector id={id} />
}
