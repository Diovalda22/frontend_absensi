import * as React from 'react';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import getDashboardTheme from './theme/getDashboardTheme';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
  backgroundImage: 'none',
  zIndex: theme.zIndex.drawer + 1,
  flex: '0 0 auto',
}));

function TemplateFrame({
  showCustomTheme,
  toggleCustomTheme,
  mode,
  toggleColorMode,
  children,
}) {
  const handleChange = (event) => {
    toggleCustomTheme(event.target.value === 'custom');
  };

  const dashboardTheme = createTheme(getDashboardTheme(mode));

  return (
    <ThemeProvider theme={dashboardTheme}>
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

TemplateFrame.propTypes = {
  children: PropTypes.node,
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  showCustomTheme: PropTypes.bool.isRequired,
  toggleColorMode: PropTypes.func.isRequired,
  toggleCustomTheme: PropTypes.func.isRequired,
};

export default TemplateFrame;
