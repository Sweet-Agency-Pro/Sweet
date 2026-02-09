/**
 * AdminLayout
 * Shell wrapping sidebar + topbar + page content.
 * Responsive: collapsible sidebar on mobile, scaled on 4K.
 */

import { createContext, useContext, useState, type CSSProperties, type ReactNode } from 'react';
import theme from '../../styles/theme';
import { useWindowSize } from '../../hooks/useWindowSize';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';

// ── Sidebar toggle context ──────────────────────────────────────────────────
interface SidebarCtx { open: boolean; toggle: () => void; close: () => void }
const SidebarContext = createContext<SidebarCtx>({ open: false, toggle: () => {}, close: () => {} });
export const useSidebar = () => useContext(SidebarContext);

interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
}

function AdminLayout({ children, title }: AdminLayoutProps) {
  const { isMobile, is4K } = useWindowSize();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggle = () => setSidebarOpen((p) => !p);
  const close = () => setSidebarOpen(false);

  const shellStyle: CSSProperties = {
    minHeight: '100vh',
    display: 'flex',
    background: theme.gradients.heroBackground,
    position: 'relative',
  };

  const overlayStyle: CSSProperties = {
    position: 'fixed',
    inset: 0,
    zIndex: 40,
    background: theme.hexToRgba(theme.colors.black, 0.5),
    backdropFilter: 'blur(4px)',
  };

  const contentStyle: CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
  };

  const mainStyle: CSSProperties = {
    flex: 1,
    padding: isMobile ? theme.spacing[4] : is4K ? theme.spacing[12] : theme.spacing[8],
    display: 'flex',
    flexDirection: 'column',
    gap: isMobile ? theme.spacing[4] : is4K ? theme.spacing[8] : theme.spacing[6],
    overflowY: 'auto',
  };

  return (
    <SidebarContext.Provider value={{ open: sidebarOpen, toggle, close }}>
      <div style={shellStyle}>
        {/* Mobile overlay */}
        {isMobile && sidebarOpen && (
          <div style={overlayStyle} onClick={close} />
        )}

        <AdminSidebar />

        <div style={contentStyle}>
          <AdminTopbar title={title} />
          <main style={mainStyle}>{children}</main>
        </div>
      </div>
    </SidebarContext.Provider>
  );
}

export default AdminLayout;
