import ReactPlayer from 'react-player/lazy'
import { useRecoilState, atomFamily } from 'recoil';
import { useState, useRef } from 'react';
import { Stack, Typography } from '@mui/material';
import { addSeconds, format } from 'date-fns';

import YoutubeController from './YoutubeController';
import YoutubeSeekbar from './YoutubeSeekbar'
import YoutubePlayList from './YoutubePlayList';

const youtubeURLState = atomFamily({
    key: 'youtubeURL',
    default: ''
});

function YoutubePlayer({ id }) {

    const playerRef = useRef(null)

    const [youtubeURL, setYoutubeURL] = useRecoilState(youtubeURLState(id))
    const [isPlaying, setIsPlaying] = useState(false);
    const [isShuffle, setIsShuffle] = useState(false);
    const [isLoop, setIsLoop] = useState(false);
    const [openVolume, setOpenVolume] = useState(false);
    const [openPlayList, setOpenPlayList] = useState(false);
    const [duration, setDuration] = useState(0);
    const [progeress, setProgeress] = useState(0);
    const [volume, setVolume] = useState(100);

    setYoutubeURL('https://www.youtube.com/watch?v=Dr4FL3lnxlA')

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
    const handleClickPlay = () => {
        setIsPlaying(!isPlaying)
    }
    const handleClickShuffle = () => {
        setIsShuffle(!isShuffle)
    }
    const handleClickLoop = () => {
        setIsLoop(!isLoop)
    }
    const handleClickVolume = () => {
        setOpenVolume(!openVolume)
    }
    const handleClickPlayList = () => {
        setOpenPlayList(!openPlayList)
    }
    const handleVolumeChange = (_, newValue) => {
        setVolume(newValue)
    }
    const handleSeekChange = (_, newValue) => {
        playerRef.current.seekTo(Number(newValue))
    }

    const valueLabelFormat = (seconds) => {
        const helperDate = addSeconds(new Date(0), Number(seconds));
        return format(helperDate, 'm:ss');
    }

    return (
        <Stack sx={{ width: '100%', height: '100%', alignItems: 'center' }}>

            <Stack sx={{ width: '100%', height: openPlayList ? '30%' : '100%', maxWidth: '420px' }}>
                <div style={{ position: 'relative', paddingTop: '56.25%' }}>
                    <ReactPlayer url={youtubeURL}
                        ref={playerRef}
                        width={openPlayList ? '40%' : '100%'}
                        height={openPlayList ? '40%' : '100%'}
                        pip
                        volume={volume / 100}
                        loop={isLoop}
                        progressInterval={250}
                        playing={isPlaying}
                        onPlay={onPlay}
                        onPause={onPause}
                        onDuration={onDuration}
                        onProgress={onProgress}
                        style={{ position: 'absolute', top: '0', left: '0' }}
                    />
                    {openPlayList &&
                        <Stack sx={{ position: 'absolute', top: '0', left: '43%', width: '55%', height: '20%' }}>
                            <Typography >
                                日本に数店舗しかない全品90％オフのヴィレヴァン
                            </Typography>

                        </Stack>
                    }
                </div>
            </Stack>

            {openPlayList && <YoutubePlayList setYoutubeURL={setYoutubeURL} />}

            <YoutubeSeekbar
                progeress={progeress}
                valueLabelFormat={valueLabelFormat}
                duration={duration}
                handleSeekChange={handleSeekChange}
            />

            <YoutubeController
                handleClickShuffle={handleClickShuffle}
                isShuffle={isShuffle}
                handleClickLoop={handleClickLoop}
                isLoop={isLoop}
                handleClickPlay={handleClickPlay}
                isPlaying={isPlaying}
                handleClickVolume={handleClickVolume}
                openVolume={openVolume}
                volume={volume}
                handleVolumeChange={handleVolumeChange}
                openPlayList={openPlayList}
                handleClickPlayList={handleClickPlayList}
            />

        </Stack>
    );
}

export default function Youtube({ id, index }) { //移動時再レンダリング用
    return <YoutubePlayer id={id} key={'youtubeKey' + index} />
}