import { useRecoilState, atomFamily } from 'recoil';
import { Box, Stack, TextField, Divider, List, ListItem, ListItemText, ListItemButton } from '@mui/material';

const memoState = atomFamily({
    key: 'counterState',
    default: ''
});

const memoTitleState = atomFamily({
    key: 'counterState',
    default: 'Memo'
});

export default function Memo({ id }) {


    const [memo, setMemo] = useRecoilState(memoState(id));
    const [memoTitle, setMemoTitle] = useRecoilState(memoTitleState(id));


    const onChange = (e) => {
        console.log(e)
    }

    return (
        <Stack alignItems="center" spacing='1' sx={{ maxHeight: '320px' }} >
            <TextField defaultValue="Memo" />
            <div style={{ position: 'relative', paddingTop: '120%', width: '100%', overflowY: 'auto', }}>
                <TextField
                    multiline
                    defaultValue="body"
                    sx={{ position: 'absolute', top: '0', left: '0', width: '100%' }}
                />
            </div>
        </Stack >
    );
}