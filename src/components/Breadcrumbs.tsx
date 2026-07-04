import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const routeNames: Record<string, string> = {
  '/': 'Dashboard',
  '/patients': 'Patients',
  '/cases': 'Clinical Cases',
  '/review': 'Care Plan Review',
  '/drugs': 'KDI & Guidelines',
  '/assistant': 'Auto AI',
  '/knowledge': 'Knowledge Base',
  '/admin': 'Admin Dashboard',
  '/notifications': 'Notifications',
  '/settings': 'Settings',
};

export function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (location.pathname === '/') {
    return null;
  }

  return (
    <div className="px-4 md:px-8 py-3 border-b border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur-md sticky top-0 z-20 w-full flex items-center">
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 w-full overflow-hidden whitespace-nowrap">
          <li className="inline-flex items-center shrink-0">
            <Link to="/" className="inline-flex items-center text-sm font-medium text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors">
              <Home size={14} className="mr-1.5" />
              Home
            </Link>
          </li>
          {pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            const name = routeNames[to] || value.charAt(0).toUpperCase() + value.slice(1);

            return (
              <li key={to} className="flex items-center shrink-0">
                <ChevronRight size={14} className="text-[var(--text-muted)] mx-1 shrink-0" />
                {isLast ? (
                  <span className="text-sm font-semibold text-[var(--text)] truncate" aria-current="page">
                    {name}
                  </span>
                ) : (
                  <Link to={to} className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors truncate">
                    {name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
