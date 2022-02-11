import axios from 'axios'
import useSWR from 'swr';
import ReactApexChart from 'react-apexcharts';
import { fromUnixTime, formatISO } from 'date-fns';
import { Box, Typography } from '@mui/material';

const fetcher = url => axios.get(url).then(res => res.data) //swr用のPromiseを返す関数

export default function Stock({ id }) {

    const { data: candlesticks, error } = useSWR('https://api.investing.com/api/financialdata/44192/historical/chart/?interval=PT30M&pointscount=60', fetcher)

    if (error) return <div>error</div>
    if (!candlesticks) return <div>loading</div>

    const timeDefines = candlesticks.data.map(candlestick => formatISO(fromUnixTime(candlestick[0] / 1000)))
    const closingPrices = candlesticks.data.map(candlestick => candlestick[4])


    console.log(timeDefines)
    console.log(closingPrices)


    const chartOptions = {


        labels: timeDefines,
        // xaxis: { type: 'datetime' },
        stroke: {
            curve: 'straight',
            width: 2
        },
        chart: {
            toolbar: { show: false },
            zoom: { enabled: false },
            animations: { enabled: false },
            // foreColor: 'text.disabled',
        },
        xaxis: {
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: {
                show: false,

            }
        },
        yaxis: {
            show: false,
        },
        markers: {
            size: 0,
        },
        tooltip: {
            x: {
                show: false
            }
        },
        legend: {
            show: false,
        },

    };

    const chartData = [{
        name: '価格',
        type: 'line',
        data: closingPrices
    }]




    return (
        <Box sx={{ p: 1 }}>
            <Typography variant="h3" >
                stock
            </Typography>
            <ReactApexChart type="line" series={chartData} options={chartOptions} height={200} />

        </Box>
    );
}