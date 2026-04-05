import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import { CartProvider } from './context/CartContext';
import CatalogPage from './pages/CatalogPage';
import BookDetailPage from './pages/BookDetailPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import UserLoginPage from './pages/UserLoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminBooksPage from './pages/AdminBooksPage';
import AccountPage from './pages/AccountPage';

function PrivateRoute({ children }) {
  const { isAuth } = useAuth();
  return isAuth ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<CatalogPage />} />
      <Route path="/libro/:id" element={<BookDetailPage />} />
      <Route path="/carrito" element={<CartPage />} />

      {/* User auth */}
      <Route path="/cuenta/login" element={<UserLoginPage />} />
      <Route path="/cuenta/registro" element={<RegisterPage />} />
      <Route path="/cuenta" element={<AccountPage />} />

      {/* Admin auth */}
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <AdminBooksPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/nuevo"
        element={
          <PrivateRoute>
            <AdminBooksPage openForm />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
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
