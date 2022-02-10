/** @jsxImportSource @emotion/react */

import { Card, Stack, Typography, Box } from '@mui/material';
import { format } from 'date-fns'
import useNow from '../../common/hooks/useNow'
import AnarogClock from './AnarogClock';

export default function Clock() {

    const time = useNow()

    return (
        <Box sx={{ pb: 1 }}
        >

            <Stack
                justifyContent="center"
                alignItems="center"
                sx={{ pt: 1 }}

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
