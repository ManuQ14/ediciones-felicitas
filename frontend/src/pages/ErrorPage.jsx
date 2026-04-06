import { Link } from 'react-router-dom';

export default function ErrorPage({ message, onRetry }) {
  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center text-center px-8">
      <img src="/logo-ef.png" alt="Ediciones Felicitas" className="h-20 mb-10 opacity-50" />
      <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-error" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      </div>
      <h1 className="text-2xl font-headline text-on-surface mb-3">
        {message || 'No se pudo conectar al servidor'}
      </h1>
      <p className="text-on-surface-variant max-w-xs mb-10 text-sm">
        Verificá tu conexión a internet o intentá de nuevo en unos momentos.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:shadow-lg hover:shadow-primary/20 active:scale-95 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
            Reintentar
          </button>
        )}
        <Link
          to="/"
          className="inline-flex items-center gap-2 border border-outline-variant text-on-surface-variant px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-surface-low transition-colors"
        >
          Volver al catálogo
        </Link>
      </div>
    </div>
  );
}
