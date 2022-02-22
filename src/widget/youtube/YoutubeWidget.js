import { Box, Typography, Slider, IconButton, Stack } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import ReactPlayer from 'react-player/lazy'
import { useRecoilState, atomFamily } from 'recoil';
import { useState } from 'react';

import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded';
import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded';

// const isPlayingMovieState = atomFamily({
//     key: 'isPlayingMovie',
//     default: false
// });

const TinyText = styled(Typography)({
    fontSize: '0.75rem',
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
});

export default function Youtube({ id }) {

    const [isPlaying, setIsPlaying] = useState(false);

    const handleClickPlay = () => {
        setIsPlaying(!isPlaying)
    }

    return (
        <Stack sx={{ width: '100%', height: '100%', minHeight: '250px', alignItems: 'center' }}>
            {/* <Typography variant="subtitle1" fontWeight='700' align='center'>
                今日
            </Typography> */}
            <Box sx={{ width: '90%', height: '70%', mt: '3%' }}>
                <ReactPlayer url='https://www.youtube.com/watch?v=0BMd3E8Gkcc'
                    width='100%'
                    height='100%'
                    pip
                    playing={isPlaying}
                />
            </Box>

            <Slider
                // valueLabelDisplay="auto"
                size="small"
                step={1}
                sx={{ width: '90%', mb: '-4%' }}
            />

            <Stack direction="row" justifyContent="center" sx={{ width: '90%' }} >

                <IconButton >
                    <FastRewindRounded />
                </IconButton>
                <IconButton sx={{ fontSize: 40 }} onClick={handleClickPlay}>
                    {isPlaying
                        ? <PauseRounded fontSize="inherit" color="primary" />
                        : <PlayArrowRounded fontSize="inherit" color="primary" />}
                </IconButton>
                <IconButton >
                    <FastForwardRounded />
                </IconButton>

            </Stack>

        </Stack>




    );
}