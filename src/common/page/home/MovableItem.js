import { useRef } from 'react';
import { Grid } from '@mui/material';
import {useDrag, useDrop } from "react-dnd";

export default function MovableItem({index, sortItems, size, children}) {
    const ref = useRef(null)

    const [{canDrop, isOver}, drop] = useDrop({
        accept: 'Card',
        hover(item, monitor) {
            if (!ref.current) return
            const dragIndex = item.index
            const dropIndex = index
            if (dragIndex === dropIndex) return

            const dropItemRect = ref.current.getBoundingClientRect()
            const dropItemWidth = (dropItemRect.right - dropItemRect.left)
            const marginRatio = 0.6
            const mousePositionX = monitor.getClientOffset().x

            if (dropIndex > dragIndex && mousePositionX < dropItemRect.left + dropItemWidth * marginRatio) return
            if (dropIndex < dragIndex && mousePositionX > dropItemRect.left + dropItemWidth * marginRatio) return
            sortItems(dragIndex, dropIndex)
            item.index = dropIndex;
        },
        collect: monitor => ({
            isOver:monitor.isOver(),
            canDrop:monitor.canDrop(),
        })
    });

    const [{isDragging}, drag] = useDrag({
        type: 'Card',
        item: {index},
        collect: monitor => {
            return {isDragging: monitor.isDragging()}
        },
    });

    drag(drop(ref))

    const opacity = (canDrop && isOver) ? 0.4 : 1;

    return (
        <Grid item xs={size.xs} md={size.md} lg={size.lg} style={{opacity}} ref={ref}>
            {children}
        </Grid>
    )
}
