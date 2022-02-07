/** @jsxImportSource @emotion/react */
import { getHours, getMinutes, getSeconds } from 'date-fns'
import { css } from '@emotion/react';

const AnarogClock = ({ time }) => {

    const hourRotate = (parseFloat(getHours(time)) + parseFloat(getMinutes(time)) / 60) * (360.0 / 12.0)
    const minuteRotate = (parseFloat(getMinutes(time)) + parseFloat(getSeconds(time)) / 60) * (360.0 / 60.0)
    const secondsRotate = parseFloat(getSeconds(time)) * (360.0 / 60.0)

    const edge = css({
        backgroundColor: '#000',
        width: '122px',
        height: '122px',
        position: 'absolute',
        top: '68%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
    });

    const base = css({
        backgroundColor: '#fff',
        width: '120px',
        height: '120px',
        position: 'absolute',
        top: '68%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
    });

    const needle = css({
        backgroundColor: '#000',
        position: 'absolute',
        top: '68%',
        left: '50%',
        height: '65px',
        transformOrigin: 'bottom center',
    })

    const hour = css({
        transform: `translate(-50%, -100%) rotate(${hourRotate}deg)`,
        width: '3px',
        height: '45px'
    })

    const minute = css({
        transform: `translate(-50%, -100%) rotate(${minuteRotate}deg)`,
        width: '2px',
        height: '55px'
    })

    const second = css({
        backgroundColor: '#e74c3c',
        transform: `translate(-50%, -100%) rotate(${secondsRotate}deg)`,
        width: '1px',
        height: '58px'
    })

    const centerPoint = css({
        backgroundColor: '#000',
        width: '12px',
        height: '12px',
        position: 'absolute',
        top: '68%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '100%'
    })

    const centerPointTop = css({
        backgroundColor: '#e74c3c',
        width: '7px',
        height: '7px',
        position: 'absolute',
        top: '68%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '100%'
    })

    return (
        <div >
            <div css={edge}></div>
            <div css={base}></div>
            <div css={[needle, hour]}></div>
            <div css={[needle, minute]}></div>
            <div css={centerPoint}></div>
            <div css={centerPointTop}></div>
            <div css={[needle, second]}></div>
        </div>
    )
}

export default AnarogClock