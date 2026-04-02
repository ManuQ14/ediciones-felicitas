import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function RegisterPage() {
  const [form, setForm] = useState({ nombre: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form.nombre, form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Error al registrarse');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = 'w-full border border-outline-variant rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors';

  return (
    <div className="min-h-screen bg-surface-low flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link to="/">
            <img src="/logo-ef.png" alt="Ediciones Felicitas" className="h-12 mx-auto mb-4" />
          </Link>
          <p className="text-on-surface-variant text-sm">Creá tu cuenta para guardar tus compras y favoritos</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-outline-variant p-8 space-y-5">
          <div>
            <label className="block text-xs font-medium text-on-surface-variant mb-1 uppercase tracking-wider">Nombre</label>
            <input
              type="text"
              value={form.nombre}
              onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
              className={inputClass}
              placeholder="Tu nombre"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-on-surface-variant mb-1 uppercase tracking-wider">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className={inputClass}
              placeholder="tu@email.com"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-on-surface-variant mb-1 uppercase tracking-wider">Contraseña</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              className={inputClass}
              placeholder="Mínimo 6 caracteres"
              required
              minLength={6}
            />
          </div>

          {error && <p className="text-error text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-on-primary py-3 rounded-full font-bold hover:bg-secondary transition-colors disabled:opacity-50"
          >
            {loading ? 'Registrando…' : 'Crear Cuenta'}
          </button>

          <p className="text-center text-sm text-on-surface-variant">
            ¿Ya tenés cuenta?{' '}
            <Link to="/cuenta/login" className="text-primary font-medium hover:underline">Iniciá sesión</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
