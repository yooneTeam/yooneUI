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

    const onClickClose = () => {
        console.log('close')
    }

    const scale = attributes['aria-pressed'] ? 1.08 : 1
    const zIndex = attributes['aria-pressed'] ? 1500 : 1

    const style = {
        transform: transform && `translate3d(${transform.x}px, ${transform.y}px, 0) scaleX(${scale}) scaleY(${scale})`,
        transition,
        zIndex,
        touchAction: 'auto'
    };


    return (
        <Grid item {...size} >

            <Card sx={{ height: ' clamp(180px, 100% , 320px)' }} ref={setNodeRef} style={style}>
                {children}
                {isSettingMode &&
                    <Stack direction='row' sx={{
                        position: 'absolute', top: '1%', left: '1%', zIndex: '2000',
                        width: '98%', height: '20%', justifyContent: 'space-between', direction: 'row',
                    }}>
                        <Avatar sx={{ bgcolor: 'back.main' }}  {...attributes} {...listeners}>
                            <OpenWithIcon />
                        </Avatar>
                        <Avatar sx={{ bgcolor: 'error.main' }} onClickClose={onClickClose}>
                            <CloseIcon />
                        </Avatar>
                    </Stack>
                }
            </Card>
        </Grid >
    )
}
