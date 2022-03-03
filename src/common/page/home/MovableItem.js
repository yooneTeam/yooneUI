import { useSortable } from '@dnd-kit/sortable';
import { useIsSettingMode } from '../../hooks/useIsSetting';
import { Grid, Card, Stack, Avatar, IconButton } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import OpenWithIcon from '@mui/icons-material/OpenWith';

import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';

export default function MovableItem({ id, size, children }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const { isSettingMode } = useIsSettingMode()

    const handleClick = () => {
        console.log('test')
    }

    const scale = attributes['aria-pressed'] ? 1.05 : 1
    const zIndex = attributes['aria-pressed'] ? 1000 : 1

    const style = {
        transform: transform && `translate3d(${transform.x}px, ${transform.y}px, 0) scaleX(${scale}) scaleY(${scale})`,
        transition,
        zIndex,
        touchAction: 'auto'
    };


    return (
        <Grid item xs={size.xs} md={size.md} lg={size.lg} >

            <Card sx={{ height: ' clamp(180px, 100% , 320px)' }} ref={setNodeRef} style={style}>
                {children}
                {isSettingMode &&
                    <Stack direction='row' sx={{
                        position: 'absolute', top: '2%', left: '1%',
                        width: '98%', height: '0%', justifyContent: 'space-between', direction: 'row'
                    }}>
                        <Avatar sx={{ bgcolor: 'grey', opacity: '1' }}  {...attributes} {...listeners}>
                            <OpenWithIcon />
                        </Avatar>
                        <Avatar sx={{ bgcolor: 'red' }}>
                            <CloseIcon />
                        </Avatar>
                    </Stack>
                }
            </Card>
        </Grid >
    )
}
