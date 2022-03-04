import { useRecoilState, atomFamily } from 'recoil';
import { Stack, TextField, Input } from '@mui/material';

const memoState = atomFamily({
    key: 'memoState',
    default: ''
});

const memoTitleState = atomFamily({
    key: 'memoTitleState',
    default: 'Memo'
});

export default function Memo({ id }) {


    const [memo, setMemo] = useRecoilState(memoState(id));
    const [memoTitle, setMemoTitle] = useRecoilState(memoTitleState(id));

    const onChangeMemoTitle = (e) => {
        setMemoTitle(e.target.value)
    }

    const onChangeMemo = (e) => {
        setMemo(e.target.value)
    }

    return (
        <Stack alignItems="center" spacing='1' sx={{ maxHeight: '320px' }} >

            <Input
                value={memoTitle}
                onChange={onChangeMemoTitle}
                placeholder='Title'
                sx={{ fontSize: '22px', mx: '15px', my: '5px', textAlign: 'center' }}
            />

            <div style={{ position: 'relative', paddingTop: '130%', width: '100%', overflowY: 'auto', }}>
                <TextField
                    value={memo}
                    onChange={onChangeMemo}
                    placeholder='memo'
                    size='small'
                    multiline
                    variant="outlined"
                    sx={{
                        position: 'absolute', top: '0', left: '0',
                        fontSize: '22px', width: 'auto', mx: ' 4%', my: '2%'
                    }}
                />
            </div>
        </Stack >
    );
}