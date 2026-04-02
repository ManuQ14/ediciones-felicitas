import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  {
    to: '/admin',
    end: true,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
      </svg>
    ),
    label: 'Inventario',
  },
  {
    to: '/admin/nuevo',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
      </svg>
    ),
    label: 'Añadir Libro',
  },
];

export default function AdminSidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const activeClass =
    'flex items-center gap-3 bg-primary/10 text-primary rounded-r-full p-3 font-bold translate-x-1';
  const inactiveClass =
    'flex items-center gap-3 text-on-surface-variant p-3 hover:bg-surface-high rounded-r-full hover:translate-x-1 transition-transform duration-200';

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-surface flex flex-col py-8 pr-4 z-50 border-r border-outline-variant/20">
      {/* Logo */}
      <div className="px-6 mb-12">
        <h1 className="font-headline text-lg text-primary italic">Ediciones Felicitas</h1>
        <p className="text-xs uppercase tracking-widest text-outline mt-1">Panel Admin</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
          >
            {item.icon}
            <span className="text-xs uppercase tracking-widest font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-4 mt-auto space-y-2">
        <NavLink
          to="/"
          className="flex items-center gap-3 text-on-surface-variant p-3 hover:bg-surface-high rounded-r-full hover:translate-x-1 transition-transform duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          <span className="text-xs uppercase tracking-widest font-medium">Ver Catálogo</span>
        </NavLink>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 text-on-surface-variant p-3 hover:bg-surface-high rounded-r-full hover:translate-x-1 transition-transform duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          <span className="text-xs uppercase tracking-widest font-medium">Salir</span>
        </button>
      </div>
    </aside>
  );
}
