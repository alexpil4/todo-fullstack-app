import { AppProvider } from '@toolpad/core/react-router-dom';

import './App.css';

import * as React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BiotechIcon from '@mui/icons-material/Biotech';
import { Outlet } from 'react-router-dom';
import type { Navigation } from '@toolpad/core';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: '',
  },
  {
    title: 'Planned tasks',
    icon: <DashboardIcon />,
  },
  {
    segment: 'empty',
    title: 'Empty',
    icon: <BiotechIcon />,
  },
];

const BRANDING = {
  title: 'TODOING!',
};

export default function App() {
  return (
    <AppProvider navigation={NAVIGATION} branding={BRANDING}>
      <Outlet />
    </AppProvider>
  );
}
