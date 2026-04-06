import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [form, setForm] = useState({ usuario: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.usuario, form.password);
      navigate('/admin');
    } catch {
      setError('Usuario o contraseña incorrectos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-low flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <img src="/logo-ef.png" alt="Ediciones Felicitas" className="h-24 mx-auto mb-4" />
          <p className="text-on-surface-variant text-xs font-bold uppercase tracking-widest">Panel de administración</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-outline-variant p-8 space-y-5">
          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-1">Usuario</label>
            <input
              type="text"
              value={form.usuario}
              onChange={(e) => setForm((f) => ({ ...f, usuario: e.target.value }))}
              className="w-full border border-outline-variant rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
              placeholder="admin"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-1">Contraseña</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              className="w-full border border-outline-variant rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
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
        </form>
      </div>
    </div>
  );
}
