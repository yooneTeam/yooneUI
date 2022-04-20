/** @jsxImportSource @emotion/react */
import { memo } from 'react'
import { getHours, getMinutes, getSeconds } from 'date-fns'
import { css, useTheme } from '@emotion/react'
import useNow from '../../common/hooks/useNow'

function AnarogClock() {
  const time = useNow()

  const rerative = css({
    display: 'grid',
    placeItems: 'center',
    width: 'auto',
    height: '130px',
    // backgroundColor: '#777',
  })

  const body = css({
    // backgroundColor: '#777',

    height: '75%',
    aspectRatio: '1 / 1',
    display: 'grid',
    placeItems: 'center',
    position: 'relative',
  })

  const edge = css({
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: '100%',
  })

  const base = css({
    width: '96%',
    height: '96%',
    position: 'absolute',
    borderRadius: '100%',
  })

  const needle = css({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transformOrigin: 'bottom center',
  })

  const hour = css({
    width: '3.5%',
    height: '35%',
  })

  const minute = css({
    width: '2%',
    height: '43%',
  })

  const second = css({
    width: '1.4%',
    height: '47%',
  })

  const centerPoint = css({
    width: '10%',
    height: '10%',
    position: 'absolute',
    borderRadius: '100%',
  })

  const centerPointTop = css({
    width: '5.5%',
    height: '5.5%',
    position: 'absolute',
    borderRadius: '100%',
  })

  const hourRotate = (parseFloat(getHours(time)) + parseFloat(getMinutes(time)) / 60) * (360.0 / 12.0)
  const minuteRotate = (parseFloat(getMinutes(time)) + parseFloat(getSeconds(time)) / 60) * (360.0 / 60.0)
  const secondsRotate = parseFloat(getSeconds(time)) * (360.0 / 60.0)

  const theme = useTheme()

  return (
    <div css={rerative}>
      <div css={body}>
        <div css={edge} style={{ backgroundColor: theme.palette.text.primary }} />
        <div css={base} style={{ backgroundColor: theme.palette.background.paper }} />
        <div
          css={[needle, hour]}
          style={{ transform: `translate(-50%, -100%) rotate(${hourRotate}deg)`, backgroundColor: theme.palette.text.primary }}
        />
        <div
          css={[needle, minute]}
          style={{ transform: `translate(-50%, -100%) rotate(${minuteRotate}deg)`, backgroundColor: theme.palette.text.primary }}
        />
        <div css={centerPoint} style={{ backgroundColor: theme.palette.text.primary }} />
        <div
          css={centerPointTop}
          style={{
            backgroundColor: theme.palette.primary.main,
          }}
        />
        <div
          css={[needle, second]}
          style={{
            transform: `translate(-50%, -100%) rotate(${secondsRotate}deg)`,
            backgroundColor: theme.palette.primary.main,
          }}
        />
      </div>
    </div>
  )
}

export default AnarogClock
