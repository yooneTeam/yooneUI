import { useSortable } from '@dnd-kit/sortable';
import { Grid, Card, Stack } from '@mui/material';
import { CSS } from '@dnd-kit/utilities';

export default function MovableItem({ id, size, children }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const scale = attributes['aria-pressed'] ? 1.03 : 1
    const zIndex = attributes['aria-pressed'] ? 1000 : 1

    const style = {
        transform: transform && `translate3d(${transform.x}px, ${transform.y}px, 0) scaleX(${scale}) scaleY(${scale})`,
        transition,
        zIndex
    };

    return (
        <Grid item xs={size.xs} md={size.md} lg={size.lg} >
            <Card sx={{ height: ' clamp(180px, 100% , 320px)' }} ref={setNodeRef} {...attributes} {...listeners} style={style}>
                {children}
            </Card>
        </Grid >
    )
}
