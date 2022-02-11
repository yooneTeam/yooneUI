import axios from 'axios'
import useSWR from 'swr';
import { isSameDay, parseISO } from 'date-fns'
import { Stack, Typography, Box, } from '@mui/material';
import { weatherCode } from './weatherCode';
import useToday from '../../common/hooks/useToday'
import useLocation from '../../common/hooks/useLocation';

const fetcher = url => axios.get(url).then(res => res.data)

export default function WeatherTommorow() {

    const today = useToday()
    const location = useLocation()
    const { data: dataWeek, error: errorWeek } = useSWR('https://www.jma.go.jp/bosai/forecast/data/forecast/' + location + '0000.json', fetcher)
    const { data: data24, error: error24 } = useSWR('https://www.jma.go.jp/bosai/jmatile/data/wdist/VPFD/' + location + '0010.json', fetcher)

    if (error24 || errorWeek) return <div>error</div>
    if (!data24 || !dataWeek) return <div>loading</div>

    const code = dataWeek[0].timeSeries[0].areas[0].weatherCodes[1]

    const [minTemp, maxtemp] = dataWeek[0].timeSeries[2].areas[0].temps

    const maxColor = '#cc3333'
    const minColor = '#3333cc'

    const rainyPercents = dataWeek[0].timeSeries[1].areas[0].pops
    const timeSeries = dataWeek[0].timeSeries[1].timeDefines

    const todayRainyPercents = timeSeries
        .map((time, index) => isSameDay(today, parseISO(time)) ? 0 : Number(rainyPercents[index]))

    const maxRainyPercents = Math.max(...todayRainyPercents)

    return (
        <Box sx={{ py: 1 }}>
            <Stack justifyContent="center" alignItems="center"   >
                <Typography variant="subtitle1" fontWeight='700' align='center'>
                    明日の天気
                </Typography>
                <Typography variant="h5" fontWeight='400' lineHeight='2' sx={{ mb: -1 }}>
                    {weatherCode[code][3]}
                </Typography>
                <img
                    src={'https://www.jma.go.jp/bosai/forecast/img/'
                        + weatherCode[code][0]}
                    width="200"
                />

                <Stack direction="row" sx={{ mb: 1.8 }}>
                    <Stack alignItems="flex-end" direction="row" >
                        <Typography variant="h3" fontWeight='500' lineHeight='0.8' color={maxColor}>
                            {maxtemp}
                        </Typography>
                        <Typography variant="h3" fontWeight='300' lineHeight='0.8'>
                            /
                        </Typography>
                        <Typography variant="h3" fontWeight='500' lineHeight='0.8' color={minColor}>
                            {minTemp}
                        </Typography>
                        <Typography variant="h6" fontWeight='500' lineHeight='0.8' sx={{ ml: 0.3 }} >
                            ℃
                        </Typography>
                    </Stack>
                </Stack>

                <Stack direction="row" sx={{ mb: 1 }}>
                    <Stack alignItems="flex-end" direction="row" >
                        <Typography variant="subtitle2" fontWeight='400' lineHeight='0.8' sx={{ mr: 0.4 }}>
                            降水確率
                        </Typography>
                        <Typography variant="h4" fontWeight='500' lineHeight='0.8'>
                            {maxRainyPercents}
                        </Typography>
                        <Typography variant="subtitle1" fontWeight='600' lineHeight='0.8' sx={{ ml: 0.3 }}>
                            %
                        </Typography>
                    </Stack>
                </Stack>

            </Stack>
        </Box >
    );
}