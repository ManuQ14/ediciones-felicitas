import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function UserLoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Email o contraseña incorrectos');
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
            <img src="/logo-ef.png" alt="Ediciones Felicitas" className="h-24 mx-auto mb-6" />
          </Link>
          <p className="text-on-surface-variant text-sm">Iniciá sesión en tu cuenta</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-outline-variant p-8 space-y-5">
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
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-error text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-on-primary py-3 rounded-full font-bold hover:bg-secondary transition-colors disabled:opacity-50"
          >
            {loading ? 'Ingresando…' : 'Ingresar'}
          </button>

          <p className="text-center text-sm text-on-surface-variant">
            ¿No tenés cuenta?{' '}
            <Link to="/cuenta/registro" className="text-primary font-medium hover:underline">Registrate</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
