import React, { useState, createElement } from 'react';
import { atom, useRecoilState } from 'recoil';
import { Grid, Container } from '@mui/material';
import MovableItem from './MovableItem';

import Counter from '../../../widget/counter/CounteWidget';
import Neko from '../../../widget/neko/Neko';
import Clock from '../../../widget/clock/ClockWidget';
import WeatherToday from '../../../widget/weather/WeatherTodayWiget';
import WeatherTommorow from '../../../widget/weather/WeatherTommorowWiget';
import Stock from '../../../widget/stock/StockWidget';

const small = { xs: 4, md: 3, lg: 2, heightRatio: '170%' }
const medium = { xs: 8, md: 6, lg: 4, heightRatio: '85%' }
const large = { xs: 12, md: 12, lg: 6, heightRatio: '56.6%' }

const itemsState = atom({
    key: "items",
    default: [
        { id: 1, component: Clock, size: small },
        { id: 2, component: WeatherToday, size: small },
        { id: 3, component: WeatherTommorow, size: small },
        { id: 4, component: Stock, size: small },
        { id: 5, component: Neko, size: medium },
        // { id: 5, component: Counter, size: small },
        // { id: 6, component: Counter, size: small },
        // { id: 7, component: Counter, size: medium },
    ]
});

export default function Home() {

    const [items, setItems] = useRecoilState(itemsState);

    const sortItems = (dragIndex, dropIndex) => {
        const preItems = [...items]
        const dragItem = preItems.splice(dragIndex, 1)
        preItems.splice(dropIndex, 0, dragItem[0])
        setItems(preItems)
    }

    return (
        <Container >
            <Grid container spacing={1} alignItems="center">
                {items.map(({ size, component, id }, index) => (
                    <MovableItem index={index} sortItems={sortItems} size={size} key={index}>
                        {createElement(component, { id })}
                    </MovableItem>))}
            </Grid>
        </Container>
    );

}
