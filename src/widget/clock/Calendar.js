import { memo } from 'react'
import { Box, Typography } from '@mui/material'
import { useTheme } from '@emotion/react'
import { getDaysInMonth, getDay, startOfMonth, subMonths, getDate } from 'date-fns'
import useToday from '../../common/hooks/useToday'

export default memo(function Calendar() {
  const today = useToday()
  const theme = useTheme()
  const days = ['日', '月', '火', '水', '木', '金', '土']

  const dayOfToday = getDay(today)
  const startDayOfMonth = getDay(startOfMonth(today))
  const numDaysInMonth = getDaysInMonth(today)
  const numDaysInLastMonth = getDaysInMonth(subMonths(today, 1))
  const todayDate = getDate(today)

  const dateInLastMonth = [...Array(startDayOfMonth).keys()].map((i) => numDaysInLastMonth - startDayOfMonth + 1 + i)
  const dateInMonth = [...Array(numDaysInMonth).keys()].map((i) => ++i)
  const dateInNextMonth = [...Array(42 - (dateInMonth.length + dateInLastMonth.length)).keys()].map((i) => ++i)

  const toDayStyle = {
    fontWeight: '500',
    color: theme.palette.primary.contrastText,
  }

  const toDayBgStyle = {
    backgroundColor: theme.palette.primary.light,
    borderRadius: '20%',
    borderRight: 4,
    borderLeft: 4,
  }

  const thisMonthStyle = {
    fontWeight: '400',
  }

  const notThisMonthStyle = {
    fontWeight: '300',
    opacity: 0.5,
  }

  const printDate = (day, isThisMonth) => {
    const bgStyle = day === todayDate && toDayBgStyle
    const printStyle = day === todayDate ? toDayStyle : isThisMonth ? thisMonthStyle : notThisMonthStyle
    return (
      <div style={{ width: '14.28%', px: '2px' }}>
        <div style={{ width: '30px', height: '20px', margin: 'auto', ...bgStyle }}>
          <Typography sx={{ fontSize: '0.8rem', ...printStyle }} key={day} align='center'>
            {day}
          </Typography>
        </div>
      </div>
    )
  }

  return (
    <Box sx={{ height: '100%', width: '100%', display: 'flex', flexWrap: 'wrap', py: 1.2, px: '12px', ml: '-2px' }}>
      {days.map((day, index) => {
        const toDayColor = index === dayOfToday && theme.palette.primary.main
        return (
          <Typography sx={{ width: '14.28%', fontSize: '0.72rem', fontWeight: '700', mb: '2px', color: toDayColor }} key={day} align='center'>
            {day}
          </Typography>
        )
      })}
      {dateInLastMonth.map((date) => printDate(date, false))}
      {dateInMonth.map((date) => printDate(date, true))}
      {dateInNextMonth.map((date) => printDate(date, false))}
    </Box>
  )
})
