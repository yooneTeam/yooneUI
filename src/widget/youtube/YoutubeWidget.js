import ReactPlayer from 'react-player/lazy'
import { useRecoilState, atomFamily } from 'recoil';
import { useState, useRef } from 'react';
import { Box, Typography, Slider, IconButton, Stack, Divider } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { addSeconds, format } from 'date-fns';

import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import ShuffleRoundedIcon from '@mui/icons-material/ShuffleRounded';
import LoopRoundedIcon from '@mui/icons-material/LoopRounded';
import PlaylistPlayRoundedIcon from '@mui/icons-material/PlaylistPlayRounded';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';

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
    const [isShuffle, setIsShuffle] = useState(false);
    const [isLoop, setIsLoop] = useState(false);
    const [duration, setDuration] = useState(0);
    const [progeress, setProgeress] = useState(0);

    setYoutubeURL('https://www.youtube.com/watch?v=-VKIqrvVOpo')

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

    const handleClickShuffle = () => {
        setIsShuffle(!isShuffle)
    }

    const handleClickLoop = () => {
        setIsLoop(!isLoop)
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
                    loop={isLoop}
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
                sx={{ width: '90%', mb: '-2%' }}
                onChange={handleSliderChange}
            />

            <Stack direction="row" justifyContent="space-around" alignItems="center" sx={{ width: '95%' }}>

                <Stack direction="row" justifyContent="center" spacing={-0.4}>
                    <IconButton sx={{ fontSize: 22 }} onClick={handleClickShuffle} size="small">
                        <ShuffleRoundedIcon fontSize="inherit" color={isShuffle ? "primary" : "default"} />
                    </IconButton>
                    <IconButton sx={{ fontSize: 22 }} onClick={handleClickLoop} size="small">
                        <LoopRoundedIcon fontSize="inherit" color={isLoop ? "primary" : "default"} />
                    </IconButton>
                </Stack>

                <Divider orientation="vertical" variant="middle" flexItem />

                <Stack direction="row" justifyContent="center" spacing={-0.6} >
                    <IconButton size="small">
                        <FastRewindRounded />
                    </IconButton>
                    <IconButton sx={{ fontSize: 44 }} onClick={handleClickPlay} size="small">
                        {isPlaying
                            ? <PauseRounded fontSize="inherit" color="primary" />
                            : <PlayArrowRounded fontSize="inherit" color="primary" />}
                    </IconButton>
                    <IconButton size="small">
                        <FastForwardRounded />
                    </IconButton>
                </Stack>

                <Divider orientation="vertical" variant="middle" flexItem />

                <Stack direction="row" justifyContent="center" spacing={-0.4}>
                    <IconButton sx={{ fontSize: 22 }} size="small">
                        <VolumeUpRoundedIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton sx={{ fontSize: 22 }} size="small">
                        <PlaylistPlayRoundedIcon fontSize="inherit" />
                    </IconButton>
                </Stack>


            </Stack>


        </Stack>
    );
}