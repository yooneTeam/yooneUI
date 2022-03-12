import { Typography, Slider, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

const TinyText = styled(Typography)({
    fontSize: '0.72rem',
    opacity: 0.7,
    fontWeight: 500,
    letterSpacing: 0.2,
});

export default function YoutubeSeekbar({ progeress, valueLabelFormat, duration, handleSeekChange }) {

    return (
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1.8} sx={{ width: '93%', mb: '-2%' }}>
            <TinyText>
                {valueLabelFormat(progeress)}
            </TinyText>
            <Slider
                valueLabelDisplay="auto"
                valueLabelFormat={valueLabelFormat}
                size="small"
                max={duration}
                value={progeress}
                onChange={handleSeekChange}
            />
            <TinyText>
                {valueLabelFormat(duration)}
            </TinyText>
        </Stack>
    );
}