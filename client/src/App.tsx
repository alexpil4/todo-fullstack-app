import { AppProvider } from '@toolpad/core/react-router-dom';

import DashboardIcon from '@mui/icons-material/Dashboard';
import { Outlet } from 'react-router-dom';
import type { Navigation } from '@toolpad/core';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import './App.css';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: '',
  },
  {
    title: 'Planned tasks',
    icon: <DashboardIcon />,
  },
];

const BRANDING = {
  title: 'TODOING!',
};

export default function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <AppProvider navigation={NAVIGATION} branding={BRANDING}>
        <Outlet />
      </AppProvider>
    </LocalizationProvider>
  );
}
