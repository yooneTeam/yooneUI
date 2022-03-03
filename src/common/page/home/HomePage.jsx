import React, { createElement } from 'react';
import { atom, useRecoilState } from 'recoil';
import {
    DndContext,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
} from '@dnd-kit/sortable';

import { Grid, Container } from '@mui/material';
import { useHasTouchScreen } from '../../hooks/useHasTouchScreen';

import MovableItem from './MovableItem';

import Counter from '../../../widget/counter/CounteWidget';
import Neko from '../../../widget/neko/Neko';
import Clock from '../../../widget/clock/ClockWidget';
import WeatherToday from '../../../widget/weather/WeatherTodayWiget';
import WeatherTommorow from '../../../widget/weather/WeatherTommorowWiget';
import Stock from '../../../widget/stock/StockWidget';
import Youtube from '../../../widget/youtube/YoutubeWidget';

const small = { xs: 4, md: 3, lg: 2, }
const medium = { xs: 12, md: 6, lg: 4, }
const large = { xs: 12, md: 12, lg: 6, }

const widgetItemsState = atom({
    key: "widgetItems",
    default: [
        { id: 1, component: Clock, size: small },
        { id: 2, component: WeatherToday, size: small },
        { id: 3, component: WeatherTommorow, size: small },
        { id: 4, component: Stock, size: small },
        { id: 5, component: Stock, size: small },
        { id: 6, component: Stock, size: small },
        { id: 7, component: Neko, size: medium },
        { id: 8, component: Youtube, size: medium },
    ]
});

export default function Home() {

    const [items, setItems] = useRecoilState(widgetItemsState);
    const { hasTouchScreen } = useHasTouchScreen();

    const sensors = useSensors(
        useSensor(hasTouchScreen ? TouchSensor : MouseSensor, hasTouchScreen && {
            activationConstraint: { delay: 150, tolerance: 5, },
        }),
    );

    function handleDragEnd(event) {
        const { active, over } = event;
        if (active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.findIndex((item) => active.id == item.id)
                const newIndex = items.findIndex((item) => over.id == item.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }


    return (
        <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
            <SortableContext items={items}>
                <Container >
                    <Grid container spacing={1} alignItems="stretch"  >
                        {items.map(({ size, component, id }, index) => (
                            <MovableItem key={id} id={id} size={size} >
                                {createElement(component, { id, index })}
                            </MovableItem>))}
                    </Grid>
                </Container>
            </SortableContext>
        </DndContext>
    );

}
