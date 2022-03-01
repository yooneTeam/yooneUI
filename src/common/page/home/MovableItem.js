import { useSortable } from '@dnd-kit/sortable';
import { Grid, Card, Stack } from '@mui/material';
import { CSS } from '@dnd-kit/utilities';

export default function MovableItem({ index, sortItems, id, size, children }) {

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <Grid item xs={size.xs} md={size.md} lg={size.lg} style={style} ref={setNodeRef}{...attributes} {...listeners}>
            <Card sx={{ height: ' clamp(180px, 100% , 320px)' }} >
                {children}
            </Card>
        </Grid >
    )
}
