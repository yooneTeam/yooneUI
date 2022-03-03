import { IconButton, Avatar } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import CheckIcon from '@mui/icons-material/Check';
import { useIsSettingMode } from '../hooks/useIsSetting';


// ----------------------------------------------------------------------

export default function SettingModeButton() {

    const { isSettingMode, setIsSettingMode } = useIsSettingMode()

    const handleClick = () => {
        setIsSettingMode(!isSettingMode)
    }

    return (

        <IconButton onClick={handleClick}>
            <Avatar sx={{ bgcolor: 'white' }}>
                {isSettingMode ?
                    <CheckIcon color="primary" />
                    :
                    <SettingsIcon color="primary" />
                }
            </Avatar>
        </IconButton>
    );
}
