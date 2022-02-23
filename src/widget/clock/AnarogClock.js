/** @jsxImportSource @emotion/react */
import { getHours, getMinutes, getSeconds } from 'date-fns'
import { css } from '@emotion/react';
import { useTheme } from '@emotion/react';

const AnarogClock = ({ time }) => {

    const rerative = css({
        position: 'rerative',
        width: '100%',
        height: '100%',
        paddingBottom: 'min(100%, 200px)',
    });

    const body = css({
        position: 'absolute',
        marginTop: '10%',
        alignItems: 'center',
        paddingLeft: 'min(85%, 160px)',
        paddingTop: 'min(85%, 160px)',
        left: '50%',
        transform: 'translateX(-50%)',
    });

    const edge = css({
        backgroundColor: '#222',
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
        width: '97%',
        height: '97%',
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
        borderRadius: '100% 100% 0% 0%'
    })

    const hour = css({
        width: '2.5%',
        height: '35%'
    })

    const minute = css({
        width: '1.8%',
        height: '43%'
    })

    const second = css({
        width: '1%',
        height: '47%'
    })

    const centerPoint = css({
        backgroundColor: '#000',
        width: '10%',
        height: '10%',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '100%'
    })

    const centerPointTop = css({
        width: '5.5%',
        height: '5.5%',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '100%'
    })

    const hourRotate = (parseFloat(getHours(time)) + parseFloat(getMinutes(time)) / 60) * (360.0 / 12.0)
    const minuteRotate = (parseFloat(getMinutes(time)) + parseFloat(getSeconds(time)) / 60) * (360.0 / 60.0)
    const secondsRotate = parseFloat(getSeconds(time)) * (360.0 / 60.0)

    const theme = useTheme()

    return (
        <div css={rerative}>
            <div css={body}>
                <div css={edge}></div>
                <div css={base}></div>
                <div css={[needle, hour]} style={{ transform: `translate(-50%, -100%) rotate(${hourRotate}deg)` }}></div>
                <div css={[needle, minute]} style={{ transform: `translate(-50%, -100%) rotate(${minuteRotate}deg)` }}></div>
                <div css={centerPoint} ></div>
                <div css={centerPointTop} style={{
                    backgroundColor: theme.palette.primary.main
                }}></div>
                <div css={[needle, second]} style={{
                    transform: `translate(-50%, -100%) rotate(${secondsRotate}deg)`,
                    backgroundColor: theme.palette.primary.main
                }}></div>
            </div>
        </div>

    )
}

export default AnarogClock