import axios from 'axios'
import useSWR from 'swr';
import { Card, Stack, Typography, Box } from '@mui/material';
import { weatherCode } from './weatherCode';

const fetcher = url => axios.get(url).then(res => res.data)

export default function Weather() {

    const { data, error } = useSWR('https://www.jma.go.jp/bosai/jmatile/data/wdist/VPFD/140010.json', fetcher)

    if (error) return <div>error</div>
    if (!data) return <div>loading</div>

    return (
        <Box sx={{ px: 1, py: 1 }}>
            <Typography variant="h5" px={1}>
                現在の天気
            </Typography>



            <Stack
                justifyContent="center"
                alignItems="center"
            >
                <img src='https://www.jma.go.jp/bosai/forecast/img/510.svg' width="120" />
                <Stack
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography variant="h5" fontWeight='700' lineHeight='80 / 64'>
                        {data.areaTimeSeries.weather[0]}
                    </Typography>
                    <Typography variant="h2" fontWeight='400'>
                        {data.pointTimeSeries.temperature[0] + ' ℃'}
                    </Typography>
                </Stack>
            </Stack>



        </Box>
    );
}