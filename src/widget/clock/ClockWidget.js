import { Card, Stack, IconButton, Typography, Box } from '@mui/material';
import { format } from 'date-fns'
import useTime from './useTime';
import './analogClock.css'

import { css } from '@emotion/react';

//bot test

export default function Clock() {

    const edge = css`
    background-color: #000;
    width: 122px;
    height: 122px;
    position: absolute;
    top: 65%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
`;

    const time = useTime()
    console.log(time)
    console.log(edge)
    const AnarogClock = (time) => {

        return (
            <div className="clock-container">
                <div css={edge}></div>
                <div className="base"></div>
                <div className="needle hour"></div>
                <div className="needle minute"></div>
                <div className="needle second"></div>
                <div className="center-point"></div>
            </div>
        )
    }

    return (
        <Card>
            <Box >

                <Stack
                    justifyContent="center"
                    alignItems="center"
                    sx={{ pt: 2, pb: 20 }}
                >
                    <Typography lineHeight="1.1" fontSize='2.5rem'>
                        {format(time, 'HH:mm')}
                    </Typography>
                    <Typography variant="subtitle1">
                        {format(time, 'yyyy/M/d')}
                    </Typography>

                    <AnarogClock>{time}</AnarogClock>

                </Stack>
            </Box>
        </Card>
    );
}
