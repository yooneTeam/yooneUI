/** @jsxImportSource @emotion/react */

import { Card, Stack, Typography, Box } from '@mui/material';
import { format } from 'date-fns'
import useNow from '../../common/hooks/useNow'
import AnarogClock from './AnarogClock';

export default function Clock() {

    const time = useNow()

    return (
        <Stack alignItems="center" sx={{ height: '100%', width: '100%' }} >
            <Typography variant="h2" fontWeight='300' >
                {format(time, 'HH:mm')}
            </Typography>
            <Typography variant="subtitle1">
                {format(time, 'yyyy/M/d')}
            </Typography>
            <AnarogClock time={time} />
        </Stack>
    );
}
