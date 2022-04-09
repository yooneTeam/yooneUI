import axios from 'axios'
import useSWR from 'swr'
import ReactPlayer from 'react-player/lazy'
import { useState, useRef, useEffect, memo } from 'react'
import { Stack, Typography, Divider, Input } from '@mui/material'
import { addSeconds, format, startOfDay } from 'date-fns'

import YoutubeController from './YoutubeController'
import YoutubeSeekbar from './YoutubeSeekbar'
import YoutubePlayList from './YoutubePlayList'
import { usePlayListInfoState, useVideoInfoState } from './YoutubeStates'

const youtubeVideoURLBase = 'https://www.youtube.com/watch?v='
const youtubeDataAPIURLBaseChannel = 'https://www.googleapis.com/youtube/v3/search'
const youtubeDataAPIURLBasePlayList = 'https://www.googleapis.com/youtube/v3/playlistItems'

function YoutubePlayer({ id }) {
  const playerRef = useRef(null)

  const { playListInfo, setPlayListInfo } = usePlayListInfoState(id)
  const { videoInfo, setVideoInfo } = useVideoInfoState(id)
  const [playListInfoTmp, setPlayListInfoTmp] = useState(playListInfo.id)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isShuffle, setIsShuffle] = useState(false)
  const [isLoop, setIsLoop] = useState(false)
  const [openVolume, setOpenVolume] = useState(false)
  const [openPlayList, setOpenPlayList] = useState(true)
  const [duration, setDuration] = useState(0)
  const [progeress, setProgeress] = useState(0)
  const [volume, setVolume] = useState(100)

  const fetcherChannel = ({ id }) =>
    axios
      .get(youtubeDataAPIURLBaseChannel, {
        params: {
          key: 'AIzaSyBpm_Oyb3PvdLP56ByQ2wsacsP1Lf_exYA',
          channelId: id,
          part: 'id,snippet',
          fields: 'items(id(videoId),snippet(title,channelTitle))',
          maxResults: '50',
          order: 'date',
          type: 'video',
        },
      })
      .then((res) =>
        res.data.items.map((item) => ({
          videoId: item.id.videoId,
          ...item.snippet,
        })),
      )

  const fetcherPlayList = ({ id }) =>
    axios
      .get(youtubeDataAPIURLBasePlayList, {
        params: {
          key: 'AIzaSyBpm_Oyb3PvdLP56ByQ2wsacsP1Lf_exYA',
          playlistId: id,
          part: 'snippet',
          fields: 'items(snippet(title,channelTitle,resourceId(videoId)))',
          maxResults: '50',
          order: 'date',
          type: 'video',
        },
      })
      .then((res) =>
        res.data.items.map((item) => ({
          videoId: item.snippet.resourceId.videoId,
          ...item.snippet,
        })),
      )

  const { data, error } = useSWR(playListInfo, !playListInfo.type ? null : playListInfo.type === 'channelId' ? fetcherChannel : fetcherPlayList)

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
    const index = videoInfo.index + diff
    const indexChecked = index + 1 > data.length || index < 0 ? 0 : index
    onClickVideoItem({ ...data[indexChecked], index: indexChecked })
  }
  const getRandomIndex = () => {
    const randomIndex = Math.floor(Math.random() * data.length) - videoInfo.index
    return randomIndex === 0 ? 1 : randomIndex
  }
  const handleClickNext = () => {
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
    channelTitle && setVideoInfo({ title, channelTitle, videoId, index })
  }
  const handleVolumeChange = (_, newValue) => {
    setVolume(newValue)
  }
  const handleSeekChange = (_, newValue) => {
    playerRef.current.seekTo(Number(newValue))
  }
  const handlePlayListURLChange = (newValue) => {
    const url = newValue.target.value
    setPlayListInfoTmp(url)

    const idPlayList = url.match(/PL[\w-]{32}/)
    const idChannel = url.match(/UC[\w-]{22}/)

    if (idChannel) {
      setPlayListInfo({
        type: 'channelId',
        id: idChannel[0],
      })
      setPlayListInfoTmp(idChannel[0])
    }
    if (idPlayList) {
      setPlayListInfo({
        type: 'playlistId',
        id: idPlayList[0],
      })
      setPlayListInfoTmp(idPlayList[0])
    }
  }

  const valueLabelFormat = (seconds) => {
    const helperDate = addSeconds(startOfDay(new Date(0)), Number(seconds))
    return seconds > 3600 ? format(helperDate, 'H:mm:ss') : format(helperDate, 'm:ss')
  }

  useEffect(() => {
    data || setOpenPlayList(true)
  }, [data])

  return (
    <Stack sx={{ width: '100%', height: '100%', alignItems: 'center' }}>
      <Stack sx={{ width: '100%', height: openPlayList ? '32%' : '100%', maxWidth: '420px' }}>
        <div style={{ position: 'relative', paddingTop: '56.25%' }}>
          <ReactPlayer
            url={youtubeVideoURLBase + videoInfo.videoId}
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
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              backgroundColor: isPlaying ? 'rgba(100,100,100,0)' : '#333',
            }}
          />

          {openPlayList && (
            <Stack
              sx={{
                position: 'absolute',
                top: '0%',
                left: '42%',
                width: '56%',
                height: '40%',
                justifyContent: 'space-around',
              }}
            >
              <Typography noWrap variant='h6' fontWeight='500'>
                {videoInfo.title}
              </Typography>
              <Typography noWrap variant='caption' fontWeight='700' sx={{ opacity: 0.7, mt: -0.8, pl: 0.2 }}>
                {videoInfo.channelTitle}
              </Typography>
              <Divider />
              <Input
                size='small'
                placeholder='https://www.youtube.com/channel/...'
                sx={{
                  my: 0,
                  fontSize: '11px',
                  opacity: playListInfoTmp === playListInfo.id ? 1 : 0.6,
                }}
                value={playListInfoTmp}
                onChange={handlePlayListURLChange}
              />
            </Stack>
          )}
        </div>
      </Stack>
      {openPlayList && <YoutubePlayList onClickVideoItem={onClickVideoItem} data={data} titlePlaying={videoInfo.title} />}

      <YoutubeSeekbar progeress={progeress} valueLabelFormat={valueLabelFormat} duration={duration} handleSeekChange={handleSeekChange} />
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
  )
}

export default function Youtube({ id, index }) {
  // 移動時再レンダリング用
  return <YoutubePlayer id={id} key={index + 'Youtube'} />
}
