import { IconButton, Avatar } from '@mui/material';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import CheckIcon from '@mui/icons-material/Check';
import { useIsSettingMode } from '../hooks/useIsSetting';


// ----------------------------------------------------------------------

export default function SettingModeButton() {

    const { isSettingMode, setIsSettingMode } = useIsSettingMode()

    const handleClick = () => {
        console.log(isSettingMode)
        setIsSettingMode(!isSettingMode)
    }

    return (

        <IconButton onClick={handleClick}>
            <Avatar sx={{ bgcolor: 'white' }}>
                {isSettingMode ?
                    <CheckIcon color="primary" />
                    :
                    <DashboardCustomizeIcon color="primary" />
                }
            </Avatar>
        </IconButton>
    );
}
