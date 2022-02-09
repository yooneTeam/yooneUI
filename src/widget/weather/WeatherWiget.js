import axios from 'axios'
import useSWR from 'swr';
import { Card, Stack, Typography, Box, Divider } from '@mui/material';
import { weatherCode } from './weatherCode';

const fetcher = url => axios.get(url).then(res => res.data)

export default function Weather() {

    const { data, error } = useSWR('https://www.jma.go.jp/bosai/jmatile/data/wdist/VPFD/140010.json', fetcher)

    if (error) return <div>error</div>
    if (!data) return <div>loading</div>

    return (
        <Box sx={{ px: 1, py: 1 }}>
            <Stack direction="row" >

                <Typography variant="h5" fontWeight='500' px={1}>
                    今の天気
                </Typography>

            </Stack>

            <Stack
                justifyContent="center"
                alignItems="center"
            >
                <img src='https://www.jma.go.jp/bosai/forecast/img/510.svg' width="180" />

                <Stack
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography variant="h5" fontWeight='700' lineHeight='2'>
                        {data.areaTimeSeries.weather[0]}
                    </Typography>
                    <Stack direction="row" sx={{ mb: 1.5 }}>
                        <Typography variant="h2" fontWeight='400' lineHeight='0.8'>
                            {data.pointTimeSeries.temperature[0]}
                        </Typography>
                        <Typography variant="h3" fontWeight='400' lineHeight='0.8'>
                            ℃
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>



        </Box>
    );
}