/** @jsxImportSource @emotion/react */

import { Card, Stack, Typography, Box } from '@mui/material';
import { format } from 'date-fns'
import useTime from './useTime';
import AnarogClock from './AnarogClock';

export default function Clock() {

    const time = useTime()

    return (
        <Box >
            <Stack
                justifyContent="center"
                alignItems="center"
                sx={{ pt: 2, pb: 20 }}
            >
                <Typography variant="h2" fontWeight='300'>
                    {format(time, 'HH:mm')}
                </Typography>
                <Typography variant="subtitle1">
                    {format(time, 'yyyy/M/d')}
                </Typography>

                <AnarogClock time={time} />

            </Stack>
        </Box>
    );
}
