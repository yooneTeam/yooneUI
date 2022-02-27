import { IconButton, Stack, Divider, Popover, Slider } from '@mui/material';
import { useState } from 'react';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import ShuffleRoundedIcon from '@mui/icons-material/ShuffleRounded';
import LoopRoundedIcon from '@mui/icons-material/LoopRounded';
import PlaylistPlayRoundedIcon from '@mui/icons-material/PlaylistPlayRounded';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';

export default function YoutubeController({ handleClickShuffle, isShuffle, handleClickLoop,
    isLoop, handleClickPlay, isPlaying, handleClickVolume, openVolume, volume,
    handleVolumeChange, openPlayList, handleClickPlayList, handleClickBack, handleClickNext }) {

    const [anchorEl, setAnchorEl] = useState(null);

    const handleVolumeOpen = (event) => {
        handleClickVolume()
        setAnchorEl(event.currentTarget);
    };

    const handleVolumeClose = () => {
        handleClickVolume()
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'popover' : undefined;

    return (
        <Stack direction="row" justifyContent="space-around" alignItems="center" sx={{ width: '100%', my: '1%' }}>

            <Stack direction="row" justifyContent="center" >
                <IconButton sx={{ fontSize: 22 }} onClick={handleClickShuffle} size="small">
                    <ShuffleRoundedIcon fontSize="inherit" color={isShuffle ? "primary" : "default"} />
                </IconButton>
                <IconButton sx={{ fontSize: 22 }} onClick={handleClickLoop} size="small">
                    <LoopRoundedIcon fontSize="inherit" color={isLoop ? "primary" : "default"} />
                </IconButton>
            </Stack>

            <Divider orientation="vertical" variant="middle" flexItem />

            <Stack direction="row" justifyContent="center" spacing={-0.5} >
                <IconButton size="small" onClick={handleClickBack} >
                    <FastRewindRounded />
                </IconButton>
                <IconButton sx={{ fontSize: 46, height: 40, width: 40 }} onClick={handleClickPlay} size="small">
                    {isPlaying
                        ? <PauseRounded fontSize="inherit" color="primary" />
                        : <PlayArrowRounded fontSize="inherit" color="primary" />}
                </IconButton>
                <IconButton size="small" onClick={handleClickNext}>
                    <FastForwardRounded />
                </IconButton>
            </Stack>

            <Divider orientation="vertical" variant="middle" flexItem />

            <Stack direction="row" justifyContent="center" >
                <IconButton sx={{ fontSize: 22 }} size="small" aria-describedby={id} onClick={handleVolumeOpen}>
                    <VolumeUpRoundedIcon fontSize="inherit" color={openVolume ? "primary" : "default"} />
                </IconButton>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleVolumeClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                >
                    <Slider
                        orientation="vertical"
                        sx={{ height: '65px', my: '20px', mx: '5px' }}
                        value={volume}
                        onChange={handleVolumeChange}
                    />
                </Popover>
                <IconButton sx={{ fontSize: 22 }} size="small" onClick={handleClickPlayList}>
                    <PlaylistPlayRoundedIcon fontSize="inherit" color={openPlayList ? "primary" : "default"} />
                </IconButton>

            </Stack>

        </Stack>

    );
}