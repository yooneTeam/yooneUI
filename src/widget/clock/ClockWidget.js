import { useState, memo, useMemo } from 'react'
import { Stack, Typography, Divider, Tabs, Tab } from '@mui/material'
import { useTheme } from '@emotion/react'
import AnarogClock from './AnarogClock'
import DigitalClock from './DigitalClock'
import Calendar from './Calendar'
import StopWatch from './StopWatch'
import { DateRange, HourglassTop, Timer } from '@mui/icons-material'

export default function Clock({ id }) {
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const TabPanel = function TabPanel({ children, isHidden }) {
    return (
      <div hidden={isHidden} style={{ height: '100%', width: '100%' }}>
        {children}
      </div>
    )
  }

  return (
    <Stack alignItems='center' sx={{ height: '100%', minHeight: '280px', width: '100%' }} divider={<Divider flexItem />}>
      <Stack direction='row' justifyContent='center' alignItems='center' sx={{ height: '100%', width: '100%', my: -2 }} spacing={3}>
        <AnarogClock />
        <DigitalClock />
      </Stack>
      <Stack direction='row' alignItems='center' sx={{ height: '100%', width: '100%' }}>
        <Tabs value={value} onChange={handleChange} orientation='vertical' sx={{ borderRight: 1, borderColor: 'divider', width: '80px' }}>
          <Tab icon={<DateRange />} style={{ minWidth: '25px', minHeight: '20px' }} />
          <Tab icon={<HourglassTop />} style={{ minWidth: '25px', minHeight: '20px' }} />
          <Tab icon={<Timer />} style={{ minWidth: '25px', minHeight: '20px' }} />
        </Tabs>
        <TabPanel isHidden={value !== 0}>
          <Calendar />
        </TabPanel>
        <TabPanel isHidden={value !== 1}>
          <Calendar />
        </TabPanel>
        <TabPanel isHidden={value !== 2}>
          <StopWatch id={id} isHidden={value !== 2} />
        </TabPanel>
      </Stack>
    </Stack>
  )
}
