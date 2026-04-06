import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center text-center px-8">
      <img src="/logo-ef.png" alt="Ediciones Felicitas" className="h-20 mb-10 opacity-50" />
      <p className="text-[8rem] font-headline font-bold leading-none text-primary/10 select-none mb-4">404</p>
      <h1 className="text-2xl font-headline text-on-surface mb-3">Página no encontrada</h1>
      <p className="text-on-surface-variant max-w-xs mb-10">
        El contenido que buscás no existe o fue movido a otra dirección.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-3 bg-primary text-on-primary px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:shadow-lg hover:shadow-primary/20 active:scale-95 transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        Volver al catálogo
      </Link>
    </div>
  );
}
