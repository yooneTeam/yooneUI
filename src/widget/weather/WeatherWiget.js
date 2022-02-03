import axios from 'axios'
import useSWR from 'swr';
import { Card, CardMedia, Typography, Box } from '@mui/material';

const fetcher = url => axios.get(url).then(res => res.data)
export default function Weather() {

    const { data, error } = useSWR('https://weather.tsukumijima.net/api/forecast/city/140010', fetcher)

    if (error) return <div>error</div>
    if (!data) return <div>loading</div>

    return (
        <Card>
            <Box sx={{ p: 1 }}>
                <Typography variant="h6" >
                    {data.forecasts[0].telop}
                </Typography>

            </Box>
        </Card>
    );
}