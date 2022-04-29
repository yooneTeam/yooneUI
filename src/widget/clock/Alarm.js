import { useEffect, useState } from 'react'
import { Stack, Typography, CircularProgress, IconButton } from '@mui/material'
import {
  PlayCircleFilledWhite,
  PauseCircleFilled,
  StopCircle,
  HighlightOff,
  Settings,
  ArrowDropUp,
  ArrowDropDown,
  CheckCircle,
} from '@mui/icons-material'
import { format } from 'date-fns'
import useStopWatch from '../../common/hooks/useStopWatch'
import { useRecoilState, atomFamily } from 'recoil'
import { localForageEffect } from '../../common/effects/localForageEffect'

const alarmInitTimeState = atomFamily({
  key: 'AlarmInitTime',
  default: 10 * 1000,
  effects: [localForageEffect()],
})

const alarmIsEndState = atomFamily({
  key: 'AlarmIsEnd',
  default: false,
  effects: [localForageEffect()],
})

const zeroPadding = (num) => num.toString().padStart(2, '0')

const formatMilliseconds = (ms = 0) => {
  const secTmp = Math.trunc(ms / 1000)
  const hour = zeroPadding(Math.trunc(secTmp / 3600))
  const min = zeroPadding(Math.trunc((secTmp % 3600) / 60))
  const sec = zeroPadding(Math.trunc(secTmp % 60))
  return hour + ':' + min + ':' + sec
}

const soundBeep = () => {
  const beepBase64 =
    'UklGRjoVAABXQVZFZm10IBAAAAABAAEAESsAABErAAABAAgAZGF0YRUVAAB/f39/f39/f39/f39/ f35+UID2cAB39XROxwhp/0toYjT3jUCyAKn7EotVQf9vUI8P2NcanzF6/0J1ZTL3mDyYG7jqK5Q8 Yv9dZHoi5rsxnh+b+zSJU0P/gE6OGM7bKZ0ud/9Kc2wr8qY5nBqv8iySRVT/a1yEHN7KLKAljP89 gF44+pFFlhjC5imaOGj/WGl3JOu3M58eoPoyi1BH/3xSjRnT2CqfLXz/SHdqLvSiPJsatO8slUJZ /2dfgR7hxi6gJJH+OoNbO/2NSJQYxuMpmzZs/1RsdSbtszWfHaX4MY5NS/94VYsa1tQqnyqA/0R5 ZjD2nT6aGbjtK5Y/Xf9jYX8f5MIvoCKV/TiFWD7+iEqSGcngKZwzcP9Rb3Eo7643nhyp9S+PSk7/ c1eIG9nQK58phP9BfGMz+JhBmBm86iqXPGH/XmR7Iea9MJ8gmfw1h1RB/4JMkBnN3CmdMHT/TXJu KvGpOJwbrPMtkkZS/25ZhRvczCufJoj/Pn5gNvmTQ5YYv+cpmDpl/1pneSLpuTKfH536M4pRRf9+ T40Z0Nkpni55/0l0ayz0pDqbGrDxLJJDVf9pXIId3sgsnySN/zuAXDn6j0WVGMPkKZo2af9WaXYk 67Qznh2h+DGMTkj/eVKLGdPVKp4rff9Gd2cu9Z88mhm07iuUQFn/ZF+AHuHDLp8jkv45g1k8/IlI khjG4SmbNG3/Um1yJu2wNZ0cpfYwjktM/3VViRrW0SqeKoH/Q3llMfaaP5gYuOsqlj5e/2BifR/k vy+fIZb9NoVWP/6ESpAYyt4onDFy/05vbyjvqzecG6n0Lo9IT/9wV4Yb2c0qnieF/z98YTT4lUGX GLzoKZc7Yv9cZXoh57sxnx+a+zSIU0P/gE2OGc3bKZwvdv9Lcmwr8aY5mxqt8i2RRVT/bFqDHN3J LJ8liv89f19k/xhB/yw77GVKrotvgoaOd3aefGSgiGGWiW+Nf36Jd4iFco2EdIuAe4h9gYR8hYB7 hYB+hH9/gn+BgH+Bf3+Bf3+Bf39/f4CAgICAgICAgICAgH9/f3+Afn9+f39+fn9/f39/f39/f39/ f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f31+fn5/fn5/f39/f39/f39/f39/ f39/f39/fn9/f39/fn9+fn5+fn59fX19f35+fn5+fn5/f39/f39/f39/f39/f39/f35/fX1+fn5+ fX19fn5+fn5+fX19fn5+fn5+fn9/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/ f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/ f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/ f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/ f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/ f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/fn5+fn9+f39/gICAgICAgICAf39/f36A f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f3+Af39/f39/f39/ f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f4CAgIB/f4B/f4B/f4B/f39/fn9/f3+AgIB/ f35+gICAf39/f39/f1hw94QAX/WGQckWS/9iWnEn7KcxuQeL/yF7ZzD7ikGaEMToG5g/ZP9WZnQn 67EynCCj9zKLS07/dFaHG9fQLJ0ohP9CfGMz+JlBlxi76iuYPGD/X2R7Iea9MZ8gmPw2h1RB/oRN kBnM3SqdMHT/TnJuKvGqOZ0brPQvkUdS/29bhRzczS2fJ4n/QH9gNvqVRJcZv+grmTpk/1xneSPo ujOfH537NYpSRf+AUI4a0Norni55/0t1ay3zpjycG7HyLpNEV/9rXYMd3skuoCWN/z2BXTn6kEaV GMPlKpo3af9YanYl67Y0nx6h+TOMTkj/e1OLGtPWK54sff9Hd2gv9aA9mhq07yyVQVr/Zl+AHuHF LqAjkv46g1o8/ItIkxjG4iqbNW3/VGxzJu2xNp0dpfYxjktM/3ZViRrW0yueKoH/RHplMfacP5gZ uOwrlj5e/2JifSDkwC+fIZb9OIVWP/2GS5EZyt8qnDJx/1BvcCjvrDecHKn0L49IT/9xWIcb2c8s nyiF/0F8YTT4l0GWGbzpKpc7Yf9dZHoh5rsxnyCa/DWHU0L/gU2PGMzbKZwwdv9Mcm0r8ag5mxut 8i6RRVP/bVqDHNzKLJ8mif8+f143+pJElRi/5iqZOGb/WWd3I+i3Mp4envoziVFF/31QjRnQ2Cmd Lnr/SXRqLfOjO5oasfAsk0NX/2hdgR3fxy2fJI3+O4FbOvuNRpQZw+MpmjZq/1VqdCXrszSdHaL4 MYtNSf95U4oZ09Qqnit+/0Z3ZzD1nj2ZGrXtK5VAW/9kX34f4sMunyKS/TmEWT39iUmSGMfhKZsz bv9SbXIn7q82nRym9TCOS03/dFWIGtbRK54pgv9CemMy95k/mBm56iqWPV//YGN8IOS+MJ4hl/w2 hlVA/YRLkBjK3SmcMXP/TnBvTv8tJ/9GJ+p4QKqRb4GFjntym4NinI9gko5ujIJ8ineHiHKLhnOK g3qIfn+FfISCe4WBfIN/f4J/gYF/gYB/gYB/gX9/f3+Bf39/f4CAgICAgICAgICAf39/f36Afn5/ f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/fn5+ f399f39+f399fn5+f31+fn1+fX1+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn19fn9+fX5+fn5+ f39/f39/f39/f39/f35+fn5+f31/f31+fX59fn5+fn19fX5+fX5+fn9+fn5+f39/f39/f39/f39/ f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/ f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/ f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/ f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/ f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f35+fn9/fn5+ fn9/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/ f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39+fn9/f39/f39/f3+Af39/f4CA gICAgH+AgICAgIB/f39/gH+AgICAf39fYvSXAUjymDfGJzH/fEt+H9y/JrsVa/81Z3oi8aUxohSs 9x+NTk7/bVaDHt3JKZ0oiv89flw7+o1GkxnD4ymZNWv/VGt0JeyyNJ0dpPcwjUxK/3dUihrV1Cqf K4D/RHlmMPadPpoZt+0rlj9c/2Nhfx/jwi+gIpX9OIVYPv6ISpMZyeApnDRx/1FvcijvrjeeHKn2 MI9KT/9zV4kb2dAroCmE/0J8ZDP4mUGZGbzrKpg9Yf9fZXwh5r4woCGZ/DaHVUL+g02RGc3dKZ0x df9Ncm4q8ao5nRus9C6RR1L/blqGHNzMLKAnif8/f2E2+pRDlxnA6CqZOmX/W2h5I+m5Mp8fnfs0 ilJF/35PjhrQ2imeLnn/SnRrLfOlO5wbsfEtk0RW/2pdgx3eyC2gJY7/PIFdOfuPRZUZw+Upmjhp /1ZqdyTrtTSeHqH5MoxOSP96Uowa09Yqnyx9/0Z3aC/1oD2aGrTuK5VBWv9lX4Ae4cQuoCOS/jmD Wjz9ikiTGMfhKZs0bf9SbXMm7bA1nh2l9jCOS0z/dVWJGtbRKp4qgf9DeWUx95o/mRm57CqWPl7/ YWJ9IOS/L58hlvw3hVY//YVLkRjK3iicMnH/Tm9wKO+rN50bqfQukEhP/3BYhxvZziufKIb/QHxi NPiWQZcZvOkpmDti/1xleiHnuzGfIJr7NIhTQv+ATY8YztspnS92/0tybSvxpzmcG67yLZFFVP9r WoQc3cosnyaK/z1/Xjf5kUSVGcDmKZk5Zv9YaHcj6rcynx+e+TKKUEb/fFCMGdDXKZ4tev9HdWkt 86E7mhqx7yyTQlf/Z12BHd/GLZ8kj/46gVs6+41GkxjD4iiaNmr/VGt0JeuyNJ0dovgwjE1J/3dT ihrU1CqeK3//RXhnMPWdPpkZtu0rlUBb/2Ngfj3/RxL/ZBbkijikmG5/hY1+cJmIX5aVYIySbomF e4t5hIpyiIpyiIV4h4B+hX2Dg3uEgnyDgH6Cf4CBfoGAf4GAf4CAgH9/gX9/f3+AgICAgICAgICA gH9/f39+gH5+f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/ f39/f35/f39/f39/f39/f39/f39/fn9/fn5+f399fX5+fn5+fn5+fn5+fn5+fX19fn59f35+fX5/ f39/f39+fn5+fn59fX5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5/fn5+fn5+f39/f39/ f39/f39/f39/f39/f35+fn5/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/ f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/ f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/ f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/ f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f4CAgICAgH9/f39/f39/ f39/f39/f39/f39/f39/f39/f39/f39/f39+fn9/fn9/f35/f4CAf39/f4B/f39/gICAgIB/f4B/ fn9/f39/f39/f39/f39+f3+Afn5/f39/f35+fn5/f39/fn5+fn9/f39/foB+gH9/f3+AgICAgICA gICAgICAf4CAf35/f39+fn5+f39/f39/f39/f35/fn5/ZVbtqAUy7akwvzwd/pg+iRvL1SC2Jkz/ UFSLGeO/JqUckv8qf2A7/IZHjhrL3SWbNHP/TXBsLfGmOZocrvEtkURV/2pcgx3dyS2fJoz/PIBe OPqQRZYZwuUpmjho/1dpdyTrtjOfHqD5MotQR/97UY0a0tgpny18/0d3aS70oTybGrTwK5VCWf9n X4Ee4cYuoCSR/jqDWzz9jEiUGcbjKZw2bf9UbHUm7bI1nx6l+DGOTUz/d1WLG9bUKqArgf9EeWYx 9pw/mhq57SuWP13/YmJ/IOTBL6Ajlv04hlg//odLkhnK4CmdNHH/UG9xKO+tN54cqfUvj0pP/3JX iBvZ0CugKYX/QXxjNPmYQZgZvOoqlzxh/15lfCHmvDGgIZn8NYdVQv+CTZAYzdwpnTB1/0xybirx qDmdG63zLZFHU/9tWoUc3MssnyeJ/z5/YDb6k0OXGb/mKZk5Zf9ZaHgj6bgynx+e+jOKUUX/fVCO GdHZKZ4uef9JdGst86M7mxqx8CyUQ1f/aV2CHd/HLaAljv87gVw5+45GlRnE5CmbN2r/Vmp1Jey0 M54eovgxjE5J/3hSixnU1SqfLH7/RXdoL/afPZoate4rlUFa/2RfgB7iwy6gI5L+OINZPP2JSJMY x+EpmzRu/1JtcifurzWeHKb2L45LTP9zVYka19EqnyqC/0J6ZTL3mT+ZGbnrKpY+Xv9gY30g5b4v nyGW/TaGVkD+hEuQGcveKJwycv9OcHAp76o3nRuq9C6QSFD/cFiGG9rNK58nhv8/fGE0+JVBlxi9 6CmXO2P/W2V6Iue6MZ8gm/s0iFND/39OjhjN2imdL3b/SnNsK/KlOZsarvEskkVU/2pagxzdySyf Jor/PIBeN/mQRJUYwOUpmThn/1dodyPqtjKeHp/5MopQRv97UYww9WYE/YUH250ynZ5vfoSNgW+V j1+QmmGGlW+Gh3qKeoGMcoWMc4WHd4aBfYZ8goR7hIN8hIF+gn+AgX6BgX6BgH+Bf39/f4B/f39/ f39/f3+Af39/f36Af39+foB+fn9/fn9/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/ f39/f39/f39/f39/f39/f39/f39/f39/f35+fn1+fn59fX1+fn5+fn5+fn5+fn59fX19fX5+fn5+ fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5/fX9+fn9+fn5+f35+ fn5+fn5+f35+fn5/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/ f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/ f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/ f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/ f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/ f39/f39/f39/f39/f39/f39/f39/f39/f38A'
  const sound = new Audio('data:audio/wav;base64,' + beepBase64)
  sound.play()
}

export default function Alarm({ id, handleChange }) {
  const [initTime, setInitTime] = useRecoilState(alarmInitTimeState(id))
  const [isEnd, setIsEnd] = useRecoilState(alarmIsEndState(id))
  const [isSetting, setIsSetting] = useState(false)

  const { clickStart, clickStop, clickReset, isWatching, elapsedTime } = useStopWatch(id + '_Alarm')

  const formatPercentOfMinutes = (ms) => {
    return isEnd ? 0 : (100 * Math.trunc(ms / 1000)) / (initTime / 1000)
  }

  const clickPlay = () => {
    if (isEnd) {
      clickReset()
      setIsEnd(false)
    } else {
      isWatching ? clickStop() : clickStart()
    }
  }

  const clickSetting = () => {
    setIsSetting(!isSetting)
  }

  useEffect(() => {
    console.log('test')
    if (!isEnd && Math.trunc((initTime - elapsedTime) / 1000) <= 0) {
      console.log('zero')
      clickStop()
      setIsEnd(true)
      handleChange(null, 1)
      soundBeep()
      setTimeout(soundBeep, 1000)
    }
  }, [elapsedTime])

  return (
    <div style={{ height: '100%', width: '100%', display: 'grid', placeItems: 'center' }}>
      {isSetting ? (
        <AlarmSetting initTime={initTime} clickSetting={clickSetting} setInitTime={setInitTime} />
      ) : (
        <Stack alignItems='center' spacing={1}>
          <style>
            {`@keyframes flash {
              0%,100% {
                opacity: 1;
              }
              50% {
                opacity: 0;
              }
            }`}
          </style>
          <Typography fontSize='2.8rem' fontWeight='300' sx={{ m: '-5px', animation: isEnd && 'flash 2s linear infinite' }}>
            {formatMilliseconds(isEnd ? 0 : initTime - elapsedTime)}
          </Typography>
          <Stack direction='row' spacing={1} alignItems='center'>
            {!isWatching && elapsedTime === 0 ? (
              <IconButton onClick={clickSetting} sx={{ fontSize: 30, width: '50px', height: '50px' }} size='small'>
                <Settings fontSize='inherit' />
              </IconButton>
            ) : (
              <div style={{ width: '50px' }} />
            )}
            <div style={{ position: 'relative', display: 'grid', placeItems: 'center' }}>
              <IconButton onClick={clickPlay} sx={{ fontSize: 70, position: 'rerative' }} size='small'>
                {isEnd ? (
                  <StopCircle fontSize='inherit' color='error' />
                ) : isWatching ? (
                  <PauseCircleFilled fontSize='inherit' />
                ) : (
                  <PlayCircleFilledWhite fontSize='inherit' color='primary' />
                )}
              </IconButton>
              <CircularProgress
                size={80}
                thickness={4}
                variant='determinate'
                value={formatPercentOfMinutes(initTime - elapsedTime)}
                sx={{
                  position: 'absolute',
                  zIndex: -1,
                  color: (theme) => (isWatching ? theme.palette.primary.main : theme.palette.grey[500]),
                }}
              />
              <CircularProgress
                size={80}
                thickness={4}
                variant='determinate'
                value={100}
                sx={{
                  position: 'absolute',
                  zIndex: -2,
                  color: (theme) => theme.palette.grey[300],
                }}
              />
            </div>
            {!isEnd && !isWatching && elapsedTime !== 0 ? (
              <IconButton onClick={clickReset} sx={{ fontSize: 30, width: '50px', height: '50px' }} size='small'>
                <HighlightOff fontSize='inherit' />
              </IconButton>
            ) : (
              <div style={{ width: '50px' }} />
            )}{' '}
          </Stack>
        </Stack>
      )}
    </div>
  )
}

const formatInitTime = (ms = 0) => {
  const secTmp = Math.trunc(ms / 1000)
  const hour = zeroPadding(Math.trunc(secTmp / 3600))
  const min = zeroPadding(Math.trunc((secTmp % 3600) / 60))
  const sec = zeroPadding(Math.trunc(secTmp % 60))
  return hour + min + sec
}

function AlarmSetting({ clickSetting, initTime, setInitTime }) {
  const initTimeString = formatInitTime(initTime)

  const addTime = (time) => {
    return () => {
      setInitTime(initTime + time * 1000)
    }
  }

  console.log(initTimeString)

  return (
    <Stack alignItems='center'>
      <Stack direction='row' alignItems='center' spacing={0.5}>
        <SettingUnit num={initTimeString.charAt(0)} maxNum={'9'} addTime={addTime(36000)} subTime={addTime(-36000)} />
        <SettingUnit num={initTimeString.charAt(1)} maxNum={'9'} addTime={addTime(3600)} subTime={addTime(-3600)} />
        <Typography fontSize='3.5rem' fontWeight='300' sx={{ my: '-15px' }}>
          :
        </Typography>
        <SettingUnit num={initTimeString.charAt(2)} maxNum={'5'} addTime={addTime(600)} subTime={addTime(-600)} />
        <SettingUnit num={initTimeString.charAt(3)} maxNum={'9'} addTime={addTime(60)} subTime={addTime(-60)} />
        <Typography fontSize='3.5rem' fontWeight='300' sx={{ my: '-15px' }}>
          :
        </Typography>
        <SettingUnit num={initTimeString.charAt(4)} maxNum={'5'} addTime={addTime(10)} subTime={addTime(-10)} />
        <SettingUnit num={initTimeString.charAt(5)} maxNum={'9'} addTime={addTime(1)} subTime={addTime(-1)} />
      </Stack>
      <IconButton sx={{ fontSize: 40, width: '40px', height: '40px' }} size='small' onClick={clickSetting}>
        <CheckCircle fontSize='inherit' color='primary' />
      </IconButton>
    </Stack>
  )
}

function SettingUnit({ num, maxNum, addTime, subTime }) {
  const isMax = num === maxNum
  const isZero = num === '0'

  return (
    <Stack alignItems='center'>
      <IconButton onClick={addTime} disabled={isMax} sx={{ fontSize: 50, width: '30px', height: '30px' }} size='small'>
        <ArrowDropUp fontSize='inherit' />
      </IconButton>
      <Typography fontSize='3.2rem' fontWeight='300' sx={{ m: '-15px' }}>
        {num}
      </Typography>
      <IconButton onClick={subTime} disabled={isZero} sx={{ fontSize: 50, width: '30px', height: '30px' }} size='small'>
        <ArrowDropDown fontSize='inherit' />
      </IconButton>
    </Stack>
  )
}
