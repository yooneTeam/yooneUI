import axios from 'axios'
import useSWR from 'swr';
import { Card, CardMedia, Typography, Box } from '@mui/material';

const fetcher = url => axios.get(url).then(res => res.data) //swr用のPromiseを返す関数

export default function Neko() {

    const { data, error } = useSWR('https://aws.random.cat/meow', fetcher)

    if (error) return <div>error</div>
    if (!data) return <div>loading</div>

    return (
        <Card>
            <Box sx={{ p: 1 }}>
                {/* <Typography variant="h6" >
                    Random Neko
                </Typography> */}
                <CardMedia
                    component="img"
                    image={data.file}
                />
            </Box>
        </Card>
    );
    }