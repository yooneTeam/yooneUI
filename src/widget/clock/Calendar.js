import { Box, Typography } from '@mui/material'
import { useTheme } from '@emotion/react'
import { format, getDaysInMonth, getDay, startOfMonth, subMonths, getDate } from 'date-fns'
import useNow from '../../common/hooks/useNow'

export default function Calendar() {
  const time = useNow()
  const theme = useTheme()
  const days = ['日', '月', '火', '水', '木', '金', '土']

  const startDayOfMonth = getDay(startOfMonth(time))
  const numDaysInMonth = getDaysInMonth(time)
  const numDaysInLastMonth = getDaysInMonth(subMonths(time, 1))
  const todayDate = getDate(time)

  const dateInLastMonth = [...Array(startDayOfMonth).keys()].map((i) => numDaysInLastMonth - startDayOfMonth + 1 + i)
  const dateInMonth = [...Array(numDaysInMonth).keys()].map((i) => ++i)
  const dateInNextMonth = [...Array(42 - (dateInMonth.length + dateInLastMonth.length)).keys()].map((i) => ++i)

  const toDayStyle = {
    fontWeight: '700',
    color: theme.palette.primary.main,
  }

  const thisMonthStyle = {
    fontWeight: '400',
  }

  const notThisMonthStyle = {
    fontWeight: '300',
    opacity: 0.5,
  }

  const printDate = (day, isThisMonth) => {
    const printStyle = day === todayDate ? toDayStyle : isThisMonth ? thisMonthStyle : notThisMonthStyle
    return (
      <Typography sx={{ width: '14.28%', fontSize: '0.85rem', ...printStyle }} key={day} align='center'>
        {day}
      </Typography>
    )
  }

  return (
    <Box sx={{ height: '100%', width: '80%', display: 'flex', flexWrap: 'wrap', py: 1.2 }}>
      {days.map((day) => (
        <Typography sx={{ width: '14.28%', fontSize: '0.72rem', fontWeight: '700', mb: '2px' }} key={day} align='center'>
          {day}
        </Typography>
      ))}
      {dateInLastMonth.map((date) => printDate(date, false))}
      {dateInMonth.map((date) => printDate(date, true))}
      {dateInNextMonth.map((date) => printDate(date, false))}
    </Box>
  )
}
