import React, { createElement } from 'react';
import { atom, useRecoilState } from 'recoil';
import { Grid, Container } from '@mui/material';
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
        // { id: 9, component: Neko, size: medium },
        // { id: 10, component: Neko, size: medium },

    ]
});

export default function Home() {

    const [items, setItems] = useRecoilState(widgetItemsState);

    const sortItems = (dragIndex, dropIndex) => {
        const preItems = [...items]
        const dragItem = preItems.splice(dragIndex, 1)
        preItems.splice(dropIndex, 0, dragItem[0])
        setItems(preItems)
    }

    return (
        <Container >
            <Grid container spacing={1} alignItems="stretch"  >
                {items.map(({ size, component, id }, index) => (
                    <MovableItem key={id} index={index} sortItems={sortItems} size={size} >
                        {createElement(component, { id, index })}
                    </MovableItem>))}
            </Grid>
        </Container>
    );

}
