/**
 * AdminLayout
 * Shell wrapping sidebar + topbar + page content.
 */

import type { CSSProperties, ReactNode } from 'react';
import theme from '../../styles/theme';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';

interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
}

function AdminLayout({ children, title }: AdminLayoutProps) {
  return (
    <div style={styles.shell}>
      <AdminSidebar />
      <div style={styles.contentArea}>
        <AdminTopbar title={title} />
        <main style={styles.main}>{children}</main>
      </div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  shell: {
    minHeight: '100vh',
    display: 'flex',
    background: theme.gradients.heroBackground,
  },
  contentArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
  },
  main: {
    flex: 1,
    padding: theme.spacing[8],
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing[6],
    overflowY: 'auto',
  },
};

export default AdminLayout;
