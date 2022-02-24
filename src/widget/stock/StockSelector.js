import { useState } from 'react';
import axios from 'axios'
import { Box, Stack, TextField, InputAdornment, Divider, List, ListItem, ListItemText, ListItemButton, Paper } from '@mui/material';
import useStockInfoState from './useStockInfoState';
import SearchIcon from '@mui/icons-material/Search';

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
        <Box >
            <Stack alignItems="center" sx={{ height: '100%', width: '100%' }}  >

                <TextField
                    size="small"
                    type="search"
                    onChange={onChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ width: '17px' }} />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ px: 1, pt: 2 }}
                />

                <Paper sx={{ height: '100%', width: '100%', maxHeight: '230px', overflowY: 'auto', overflowX: 'hidden', mt: 1 }}>
                    <div style={{ position: 'relative', paddingTop: '120%' }}>
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
                </Paper>
            </Stack>
        </ Box >
    );
}