import axios from 'axios'
import useSWR from 'swr';
import ReactPlayer from 'react-player/lazy'
import { useRecoilState, atomFamily } from 'recoil';
import { useState, useRef, useEffect, memo } from 'react';
import { Stack, Typography, Divider, Input } from '@mui/material';
import { addSeconds, format, startOfDay } from 'date-fns';

import YoutubeController from './YoutubeController';
import YoutubeSeekbar from './YoutubeSeekbar'
import YoutubePlayList from './YoutubePlayList';

const youtubeVideoURLBase = 'https://www.youtube.com/watch?v='
const youtubeDataAPIURLBaseChannel = 'https://www.googleapis.com/youtube/v3/search'
const youtubeDataAPIURLBasePlayList = 'https://www.googleapis.com/youtube/v3/playlistItems'

const youtubeVideoInfoState = atomFamily({
    key: 'youtubeVideoInfo',
    default: {
        title: 'URLを入力してください',
        channelTitle: ' チャンネル or プレイリスト',
        videoId: '',
        index: -1
    }
});

const youtubePlayListInfoState = atomFamily({
    key: 'youtubePlayListInfo',
    default: {
        type: false,
        id: '',
    }
});


function YoutubePlayer({ id }) {
    const playerRef = useRef(null)

    const [youtubePlayListInfo, setYoutubePlayListURLInfo] = useRecoilState(youtubePlayListInfoState(id))
    const [youtubeVideoInfo, setYoutubeInfo] = useRecoilState(youtubeVideoInfoState(id))
    const [youtubePlayListInfoTmp, setYoutubePlayListInfoTmp] = useState(youtubePlayListInfo.id)
    const [isPlaying, setIsPlaying] = useState(false);
    const [isShuffle, setIsShuffle] = useState(false);
    const [isLoop, setIsLoop] = useState(false);
    const [openVolume, setOpenVolume] = useState(false);
    const [openPlayList, setOpenPlayList] = useState(false);
    const [duration, setDuration] = useState(0);
    const [progeress, setProgeress] = useState(0);
    const [volume, setVolume] = useState(100);



    const fetcherChannel = ({ id }) => axios.get(youtubeDataAPIURLBaseChannel, {
        params: {
            key: 'AIzaSyBpm_Oyb3PvdLP56ByQ2wsacsP1Lf_exYA',
            channelId: id,
            part: 'id,snippet',
            fields: 'items(id(videoId),snippet(title,channelTitle))',
            maxResults: '50',
            order: 'date',
            type: 'video',
        }
    }).then(res => res.data.items
        .map((item) => {
            return {
                videoId: item.id.videoId, ...item.snippet
            }
        }))

    const fetcherPlayList = ({ id }) => axios.get(youtubeDataAPIURLBasePlayList, {
        params: {
            key: 'AIzaSyBpm_Oyb3PvdLP56ByQ2wsacsP1Lf_exYA',
            playlistId: id,
            part: 'snippet',
            fields: 'items(snippet(title,channelTitle,resourceId(videoId)))',
            maxResults: '50',
            order: 'date',
            type: 'video',
        }
    }).then(res => res.data.items
        .map((item) => {
            return {
                videoId: item.snippet.resourceId.videoId, ...item.snippet
            }
        }))


    const { data, error } = useSWR(youtubePlayListInfo,
        !youtubePlayListInfo.type ? null
            : (youtubePlayListInfo.type == 'channelId') ? fetcherChannel : fetcherPlayList)



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
        if (duration - progeress.playedSeconds < 1) {
            if (isLoop) {
                playerRef.current.seekTo(0)
                return
            }
            handleClickNext()
        }
    }
    const handleClickPlay = () => {
        setIsPlaying(!isPlaying)
    }
    const changeIndex = (diff) => {
        const index = youtubeVideoInfo.index + diff
        const indexChecked = (index + 1 > data.length || index < 0) ? 0 : index
        onClickVideoItem({ ...data[indexChecked], index: indexChecked })
    }
    const getRandomIndex = () => {
        const randomIndex = Math.floor(Math.random() * data.length) - youtubeVideoInfo.index
        return (randomIndex == 0) ? 1 : randomIndex
    }
    const handleClickNext = () => {
        if (isShuffle) {
            handleSeekChange(null, 0)
            return
        }
        const diff = isShuffle ? getRandomIndex() : 1
        changeIndex(diff)
    }
    const handleClickBack = () => {
        changeIndex(-1)
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
    const onClickVideoItem = ({ title, channelTitle, videoId, index }) => {
        setYoutubeInfo({ title, channelTitle, videoId, index })
    }
    const handleVolumeChange = (_, newValue) => {
        setVolume(newValue)
    }
    const handleSeekChange = (_, newValue) => {
        playerRef.current.seekTo(Number(newValue))
    }
    const handlePlayListURLChange = (newValue) => {
        const url = newValue.target.value
        setYoutubePlayListInfoTmp(url)

        const idPlayList = url.match(/PL[\w-]{32}/)
        const idChannel = url.match(/UC[\w-]{22}/)

        if (idChannel) {
            setYoutubePlayListURLInfo({
                type: 'channelId',
                id: idChannel[0],
            })
            setYoutubePlayListInfoTmp(idChannel[0])
        }
        if (idPlayList) {
            setYoutubePlayListURLInfo({
                type: 'playlistId',
                id: idPlayList[0],
            })
            setYoutubePlayListInfoTmp(idPlayList[0])
        }
    }

    const valueLabelFormat = (seconds) => {
        const helperDate = addSeconds(startOfDay(new Date(0)), Number(seconds));
        return (seconds > 3600) ? format(helperDate, 'H:mm:ss') : format(helperDate, 'm:ss');
    }


    useEffect(() => {
        if (data) {
            onClickVideoItem({ ...data[0], index: 0 })
        } else {
            setOpenPlayList(true)
        }
    }, [data]);

    return (
        <Stack sx={{ width: '100%', height: '100%', alignItems: 'center' }}>

            <Stack sx={{ width: '100%', height: openPlayList ? '33%' : '100%', maxWidth: '420px' }}>
                <div style={{ position: 'relative', paddingTop: '56.25%' }}>
                    <ReactPlayer url={youtubeVideoURLBase + youtubeVideoInfo.videoId}
                        ref={playerRef}
                        width={openPlayList ? '40%' : '100%'}
                        height={openPlayList ? '40%' : '100%'}
                        pip
                        volume={volume / 100}
                        progressInterval={500}
                        playing={isPlaying}
                        onPlay={onPlay}
                        onPause={onPause}
                        onDuration={onDuration}
                        onProgress={onProgress}
                        style={{ position: 'absolute', top: '0', left: '0' }}
                    />
                    {/* <div style={{ position: 'absolute', top: '0%', left: '0', width: '100%', height: '100% ' }} /> */}

                    {openPlayList &&
                        <Stack sx={{ position: 'absolute', top: '0%', left: '42%', width: '56%', height: '40%', justifyContent: 'space-around' }}>
                            <Typography noWrap variant='h6' fontWeight='500'>
                                {youtubeVideoInfo.title}
                            </Typography>
                            <Typography noWrap variant='caption' fontWeight='700' sx={{ opacity: 0.7, mt: -0.8, pl: 0.2 }}>
                                {youtubeVideoInfo.channelTitle}
                            </Typography>
                            <Divider />
                            <Input
                                size="small"
                                placeholder="ex. https://www.youtube.com/channel/..."
                                sx={{ my: 0, fontSize: '11px', opacity: (youtubePlayListInfoTmp == youtubePlayListInfo.id) ? 1 : 0.6 }}
                                value={youtubePlayListInfoTmp}
                                onChange={handlePlayListURLChange}
                            />
                        </Stack>
                    }
                </div>
            </Stack>
            {openPlayList && <YoutubePlayList onClickVideoItem={onClickVideoItem} data={data} indexPlaying={youtubeVideoInfo.index} />}

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
                handleClickNext={handleClickNext}
                handleClickBack={handleClickBack}
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

function Youtube({ id, index }) { //移動時再レンダリング用
    return <YoutubePlayer id={id} key={'youtubeKey' + index} />
}

export default memo(Youtube);
