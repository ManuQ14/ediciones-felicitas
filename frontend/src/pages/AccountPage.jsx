import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import { useUser } from '../context/UserContext';

export default function AccountPage() {
  const { user, logout } = useUser();

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      <main className="max-w-screen-xl mx-auto px-8 py-16 pt-28">
        <header className="mb-10">
          <p className="text-tertiary font-bold tracking-widest uppercase text-xs mb-1">Mi cuenta</p>
          <h1 className="text-4xl font-headline text-on-surface tracking-tight">
            Hola, {user?.nombre}
          </h1>
          <p className="text-on-surface-variant mt-2 text-sm">{user?.email}</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar nav */}
          <aside className="lg:col-span-3">
            <nav className="space-y-1">
              <span className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary-container text-primary font-medium text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                Mis pedidos
              </span>
              <Link
                to="/"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-low hover:text-on-surface transition-colors text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                Catálogo
              </Link>
              <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-low hover:text-error transition-colors text-sm text-left"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                Cerrar sesión
              </button>
            </nav>
          </aside>

          {/* Main content */}
          <section className="lg:col-span-9">
            <div className="bg-surface-low rounded-xl p-8">
              <h2 className="text-xl font-headline text-on-surface mb-6">Historial de pedidos</h2>

              {/* Empty state — se reemplaza con pedidos reales cuando esté MercadoPago */}
              <div className="text-center py-16">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14 text-outline-variant mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                <p className="text-on-surface-variant font-medium mb-1">Todavía no realizaste ningún pedido</p>
                <p className="text-on-surface-variant/60 text-sm mb-6">Cuando completes una compra, aparecerá aquí con su estado.</p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-full font-bold text-sm uppercase tracking-widest hover:shadow-lg hover:shadow-primary/20 transition-all"
                >
                  Explorar el catálogo
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-outline-variant/30 py-12 mt-8">
        <div className="max-w-screen-xl mx-auto px-8 text-center text-on-surface-variant text-sm">
          <img src="/logo-ef.png" alt="Ediciones Felicitas" className="h-20 mx-auto mb-4 opacity-80" />
          <p>&copy; {new Date().getFullYear()} Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
