import ReactPlayer from 'react-player/lazy'
import { useRecoilState, atomFamily } from 'recoil';
import { useState, useRef } from 'react';
import { Box, Typography, Slider, IconButton, Stack } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { addSeconds, format } from 'date-fns';

import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';

const youtubeURLState = atomFamily({
    key: 'youtubeURL',
    default: ''
});

const TinyText = styled(Typography)({
    fontSize: '0.75rem',
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
});

export default function Youtube({ id }) {

    const [youtubeURL, setYoutubeURL] = useRecoilState(youtubeURLState(id))
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [progeress, setProgeress] = useState(0);

    setYoutubeURL('https://www.youtube.com/watch?v=Atvsg_zogxo')

    const handleClickPlay = () => {
        setIsPlaying(!isPlaying)
    }

    const onPlay = () => {
        setIsPlaying(true)
    }

    const onPause = () => {
        setIsPlaying(false)
    }

    const onDuration = (duration) => {
        setDuration(duration)
    }

    const onProgress = (progeress) => {
        setProgeress(progeress.playedSeconds)
    }

    const handleSliderChange = (_, newValue) => {
        playerRef.current.seekTo(Number(newValue))
    }

    const valueLabelFormat = (seconds) => {
        const helperDate = addSeconds(new Date(0), Number(seconds));
        return format(helperDate, 'mm:ss');

    }

    const playerRef = useRef(null)

    return (
        <Stack sx={{ width: '100%', height: '100%', minHeight: '240px', alignItems: 'center' }}>
            <Box sx={{ width: '90%', height: '100%', mt: '3%' }}>
                <ReactPlayer url={youtubeURL}
                    ref={playerRef}
                    width='100%'
                    height='100%'
                    pip
                    progressInterval='250'
                    playing={isPlaying}
                    onPlay={onPlay}
                    onPause={onPause}
                    onDuration={onDuration}
                    onProgress={onProgress}
                />
            </Box>

            <Slider
                valueLabelDisplay="auto"
                valueLabelFormat={valueLabelFormat}
                size="small"
                max={duration}
                value={progeress}
                sx={{ width: '90%', mb: '-3%' }}
                onChange={handleSliderChange}
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