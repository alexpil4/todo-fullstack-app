import { Outlet } from 'react-router-dom';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';

export default function Layout() {
  return (
    <DashboardLayout defaultSidebarCollapsed={true}>
      <PageContainer>
        <Outlet />
      </PageContainer>
    </DashboardLayout>
  );
}
