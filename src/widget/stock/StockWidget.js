import axios from 'axios'
import useSWR from 'swr';
import { useRecoilState, atomFamily } from 'recoil';
import ReactApexChart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { fromUnixTime, format, isSameDay, startOfDay, subDays, formatISO, parseISO } from 'date-fns';
import { Box, Typography, Stack, Card } from '@mui/material';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const stockURLState = atomFamily({
    key: 'stockURL',
    default: '44192'
});


const fetcher = url => axios.get(url).then(res => res.data) //swr用のPromiseを返す関数

export default function Stock({ id }) {   //44192

    const theme = useTheme();
    const [stockURL, setStockURL] = useRecoilState(stockURLState(id));

    // setStockURL('945629')
    const { data: candlesticks, error } = useSWR('https://api.investing.com/api/financialdata/' + stockURL + '/historical/chart/?interval=PT30M&pointscount=120', fetcher)

    if (error) return <div>error</div>
    if (!candlesticks) return <div>loading</div>

    const timeDefinesAll = candlesticks.data.map(candlestick => fromUnixTime(candlestick[0] / 1000))
    const closingPricesAll = candlesticks.data.map(candlestick => candlestick[4])

    const allDays = [...new Set(timeDefinesAll.map(time => formatISO(startOfDay(time))))];

    const lastDay = parseISO(allDays.slice(-2)[0])
    const beforeLastDay = parseISO(allDays.slice(-3)[0])

    const startLastDayIndex = timeDefinesAll.reduce((preindex, day, index) => isSameDay(day, lastDay) ? index : preindex)
    const startBeforeLastDayIndex = timeDefinesAll.reduce((preindex, day, index) => isSameDay(day, beforeLastDay) ? index : preindex)
    const mediumBeforeLastDayIndex = startBeforeLastDayIndex + (startLastDayIndex - startBeforeLastDayIndex) / 2

    const timeDefines = timeDefinesAll.map(time => format(time, 'M/d HH:mm')).slice(mediumBeforeLastDayIndex)
    const closingPrices = closingPricesAll.slice(mediumBeforeLastDayIndex)

    const closingPricesStart = closingPricesAll[startLastDayIndex]
    const closingPricesNow = closingPricesAll.slice(-1)[0]

    const increaseRate = (100 * (closingPricesNow - closingPricesStart) / closingPricesNow)



    const chartOptions = {
        labels: timeDefines,
        stroke: {
            curve: 'smooth',
            width: 2
        },
        chart: {
            toolbar: { show: false },
            zoom: { enabled: false },
            animations: { enabled: false },
        },
        xaxis: {
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: { show: false, },
            tooltip: { enabled: false, },
        },
        yaxis: {
            show: false,
            // min: Math.min(...closingPrices),
            // max: Math.max(...closingPrices),
        },
        tooltip: { x: { show: true } },
        legend: { show: false, },
        grid: { show: false },
        fill: {
            type: "gradient",
            gradient: {
                type: 'vertical',
                shadeIntensity: 0,
                opacityFrom: 0.55,
                opacityTo: 0,
                stops: [0, 90]
            }
        },

    };

    const chartData = [{
        name: '価格',
        type: 'area',
        data: closingPrices
    }]

    return (
        <Box sx={{ mb: -4 }} >
            <Stack justifyContent="center" alignItems="center"   >

                <Typography variant="h6" sx={{ mt: 0.5 }} fontWeight='700' >
                    リコー
                </Typography>
                <Typography variant="h3" sx={{ mt: -1 }} fontWeight='500'>
                    {closingPricesNow.toLocaleString()}
                </Typography>

                <Stack direction="row" alignItems="flex-end" sx={{ mt: -0.5, mb: -3 }}>
                    {(increaseRate < 0) ?
                        <ArrowDownwardIcon color="error" />
                        :
                        <ArrowUpwardIcon color='success' />
                    }
                    <Typography variant="h5" fontWeight='400' sx={{ pl: 0.5 }}>
                        {(100 * (closingPricesNow - closingPricesStart) / closingPricesNow).toFixed(1)}
                    </Typography>
                    <Typography variant="subtitle2" fontWeight='400' sx={{ pl: 0.5 }}>
                        %
                    </Typography>
                </Stack>

            </Stack>

            <ReactApexChart
                type="line"
                series={chartData}
                options={chartOptions}
                height={'100%'}
            />


        </ Box >
    );
}