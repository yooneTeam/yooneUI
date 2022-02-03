import {useContext } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }) {
  const theme = useTheme();

  // return <Box component="img"
  //             src={'static/logo.png'}
  //             sx={{ width: 150, ...sx }}
  //         />;

    return <Box component="img"
    // src={'static/logo.png'}
    sx={{ width: 150, ...sx }}
    />;

}
