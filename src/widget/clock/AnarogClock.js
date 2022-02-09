/** @jsxImportSource @emotion/react */
import { getHours, getMinutes, getSeconds } from 'date-fns'
import { css } from '@emotion/react';

const AnarogClock = ({ time }) => {

    const hourRotate = (parseFloat(getHours(time)) + parseFloat(getMinutes(time)) / 60) * (360.0 / 12.0)
    const minuteRotate = (parseFloat(getMinutes(time)) + parseFloat(getSeconds(time)) / 60) * (360.0 / 60.0)
    const secondsRotate = parseFloat(getSeconds(time)) * (360.0 / 60.0)


    const rerative = css({
        position: 'rerative',
        width: '100%',
        paddingBottom: 'min(100%, 200px)',
    });

    const body = css({
        position: 'absolute',
        marginTop: '8%',
        alignItems: 'center',
        paddingLeft: 'min(80%, 160px)',
        paddingTop: 'min(80%, 160px)',
        left: '50%',
        transform: 'translateX(-50%)',
    });

    const edge = css({
        backgroundColor: '#000',
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
    });

    const base = css({
        backgroundColor: '#fff',
        width: '98%',
        height: '98%',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
    });

    const needle = css({
        backgroundColor: '#000',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transformOrigin: 'bottom center',
    })

    const hour = css({
        transform: `translate(-50%, -100%) rotate(${hourRotate}deg)`,
        width: '3%',
        height: '37%'
    })

    const minute = css({
        transform: `translate(-50%, -100%) rotate(${minuteRotate}deg)`,
        width: '1.5%',
        height: '42%'
    })

    const second = css({
        backgroundColor: '#e74c3c',
        transform: `translate(-50%, -100%) rotate(${secondsRotate}deg)`,
        width: '1%',
        height: '47%'
    })

    const centerPoint = css({
        backgroundColor: '#000',
        width: '12px',
        height: '12px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '100%'
    })

    const centerPointTop = css({
        backgroundColor: '#e74c3c',
        width: '7px',
        height: '7px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '100%'
    })

    return (

        <div css={rerative}>
            <div css={body}>
                <div css={edge}></div>
                <div css={base}></div>
                <div css={[needle, hour]}></div>
                <div css={[needle, minute]}></div>
                <div css={centerPoint}></div>
                <div css={centerPointTop}></div>
                <div css={[needle, second]}></div>
            </div>
        </div>

    )
}

export default AnarogClock