import { useSortable } from '@dnd-kit/sortable';
import { Grid, Card } from '@mui/material';

export default function MovableItem({ id, size, children }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id });

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
            <Card sx={{ height: ' clamp(180px, 100% , 320px)' }} ref={setNodeRef} {...attributes} {...listeners} style={style}>
                {children}
            </Card>
        </Grid >
    )
}
