import { useState } from 'react';
import axios from 'axios'
import { Stack, TextField, Divider, List, ListItem, ListItemText, ListItemButton } from '@mui/material';
import useStockInfoState from './useStockInfoState';

export default function StockSelector({ id }) {   //44192　

    const { setStockInfo } = useStockInfoState(id);
    const [timerID, setTimerID] = useState('');
    const [queryList, setQueryList] = useState([]);

    const fetcher = searchValue => searchValue ?
        axios.get('https://api.investing.com/api/search/v2/search?q=' + encodeURI(searchValue), { headers: { 'domain-id': 'jp' } })
            .then(res => {
                const queryResult = res.data.quotes
                console.log(queryResult)
                setQueryList(queryResult)
            })
        :
        setQueryList([])

    const onChange = (e) => {
        const searchValue = e.target.value
        clearTimeout(timerID)
        setTimerID(setTimeout(() => fetcher(searchValue), 1000))
    }

    const onClick = (info) => {
        console.log(info)
        console.log(setStockInfo(info))
    }

    return (
        <Stack alignItems="center" sx={{ maxHeight: '320px' }}  >
            <TextField
                size="small"
                label="銘柄名"
                onChange={onChange}
                sx={{ mx: 1, mt: 2 }}
            />
            <div style={{ position: 'relative', paddingTop: '120%', width: '100%', overflowY: 'auto', overflowX: 'hidden' }}>
                <List dense={true} sx={{ position: 'absolute', top: '0', left: '0', width: '100%' }}>
                    <Divider />
                    {queryList.map(item =>
                        <span key={item.id}>
                            <ListItem disablePadding  >
                                <ListItemButton onClick={() => onClick(item)}>
                                    <ListItemText
                                        primary={item.symbol}
                                        secondary={item.description}
                                        secondaryTypographyProps={{
                                            noWrap: true,
                                            fontSize: 11,
                                            lineHeight: '15px',
                                        }} />
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                        </span>
                    )}
                </List>
            </div>
        </Stack>
    );
}