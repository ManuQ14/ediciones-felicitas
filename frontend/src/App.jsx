import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { UserProvider, useUser } from './context/UserContext';
import { CartProvider } from './context/CartContext';
import CatalogPage from './pages/CatalogPage';
import BookDetailPage from './pages/BookDetailPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import AuthPage from './pages/AuthPage';
import AdminBooksPage from './pages/AdminBooksPage';
import AccountPage from './pages/AccountPage';
import Spinner from './components/ui/Spinner';
import NotFoundPage from './pages/NotFoundPage';

// Admin: muestra el login si no está autenticado, el panel si sí
function AdminRoute({ children }) {
  const { isAuth } = useAuth();
  if (!isAuth) return <LoginPage />;
  return children;
}

// Usuario: redirige a /login si no está autenticado
function UserRoute({ children }) {
  const { isLoggedIn, loading } = useUser();
  if (loading) return <div className="min-h-screen flex items-center justify-center"><Spinner /></div>;
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<CatalogPage />} />
      <Route path="/libro/:slug" element={<BookDetailPage />} />
      <Route path="/carrito" element={<CartPage />} />

      {/* User auth — una sola URL con tabs login/registro */}
      <Route path="/login" element={<AuthPage />} />
      {/* Redirects para URLs viejas */}
      <Route path="/cuenta/login" element={<Navigate to="/login" replace />} />
      <Route path="/cuenta/registro" element={<Navigate to="/login" replace />} />

      {/* User account */}
      <Route path="/cuenta" element={<UserRoute><AccountPage /></UserRoute>} />

      {/* Admin — /admin muestra login o panel según auth */}
      <Route path="/admin" element={<AdminRoute><AdminBooksPage /></AdminRoute>} />
      <Route path="/admin/nuevo" element={<AdminRoute><AdminBooksPage openForm /></AdminRoute>} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default function App() {
  return (
    <UserProvider>
      <CartProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </CartProvider>
    </UserProvider>
  );
}
