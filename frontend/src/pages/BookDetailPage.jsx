import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Spinner from '../components/ui/Spinner';
import api from '../services/api';
import { useCart } from '../context/CartContext';

const formatPeso = (n) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n);

export default function BookDetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    api.get(`/books/${id}`)
      .then(({ data }) => setBook(data))
      .catch(() => setBook(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    addToCart(book, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return <><Navbar /><div className="pt-24"><Spinner /></div></>;
  if (!book) return (
    <><Navbar />
      <div className="pt-32 text-center">
        <h2 className="text-2xl font-headline text-on-surface-variant">Libro no encontrado</h2>
        <Link to="/" className="text-primary mt-4 inline-block hover:underline">Volver al catálogo</Link>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      <main className="pt-28 pb-24 px-6 md:px-12 max-w-screen-xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-10 flex items-center gap-2 text-xs tracking-widest uppercase text-tertiary">
          <Link to="/" className="hover:text-primary transition-colors">Catálogo</Link>
          <span className="text-[10px]">/</span>
          {book.categoria && (
            <>
              <span>{book.categoria}</span>
              <span className="text-[10px]">/</span>
            </>
          )}
          <span className="text-on-surface font-semibold">{book.titulo}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
          {/* Book Cover */}
          <div className="lg:col-span-5 relative group">
            <div className="absolute -inset-4 bg-primary/5 rounded-xl -rotate-2 group-hover:rotate-0 transition-transform duration-700" />
            <div className="relative bg-surface-low p-8 shadow-2xl shadow-primary/10 rounded-sm">
              {book.imagen ? (
                <img
                  src={book.imagen}
                  alt={book.titulo}
                  className="w-full aspect-[2/3] object-contain rounded-sm"
                />
              ) : (
                <div className="w-full aspect-[2/3] bg-surface-high flex items-center justify-center rounded-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-primary/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Content Column */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-6">
              <div>
                {book.categoria && (
                  <span className="inline-block py-1 px-3 bg-tertiary-fixed/60 text-on-tertiary-container text-[10px] font-bold tracking-widest uppercase rounded-full mb-4">
                    {book.categoria}
                  </span>
                )}
                <h1 className="font-headline text-4xl md:text-5xl font-bold text-on-surface leading-tight tracking-tight mb-3">
                  {book.titulo}
                </h1>
                {book.autor && (
                  <p className="font-headline italic text-xl text-secondary opacity-80">{book.autor}</p>
                )}
              </div>
              <div className="md:text-right flex-shrink-0">
                <div className="font-headline text-4xl font-bold text-on-surface">{formatPeso(book.precio)}</div>
                <div className="text-[10px] text-tertiary tracking-widest uppercase mt-1">IVA incluido</div>
              </div>
            </div>

            <div className="h-px bg-outline-variant/20 my-6" />

            {/* Meta info */}
            <div className="flex flex-wrap gap-8 mb-8">
              {book.isbn && (
                <div className="flex flex-col">
                  <span className="text-[10px] text-tertiary uppercase tracking-widest font-bold mb-1">ISBN</span>
                  <span className="font-mono text-sm text-on-surface">{book.isbn}</span>
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-[10px] text-tertiary uppercase tracking-widest font-bold mb-1">Formato</span>
                <span className="font-headline text-lg text-on-surface">Tapa blanda</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-tertiary uppercase tracking-widest font-bold mb-1">Editorial</span>
                <span className="font-headline text-lg text-on-surface">Ediciones Felicitas</span>
              </div>
            </div>

            {/* Purchase section */}
            <div className="bg-surface-low p-8 rounded-xl border border-outline-variant/10">
              <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-end">
                {/* Quantity */}
                <div>
                  <label className="block text-[10px] font-bold text-tertiary uppercase tracking-widest mb-3">Cantidad</label>
                  <div className="flex items-center border-2 border-outline-variant/30 rounded-full p-1">
                    <button
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-variant transition-colors text-on-surface"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    </button>
                    <span className="font-headline text-xl font-bold w-10 text-center">{qty}</span>
                    <button
                      onClick={() => setQty((q) => q + 1)}
                      className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-variant transition-colors text-on-surface"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-grow bg-primary text-on-primary font-bold py-5 px-8 rounded-full flex items-center justify-center gap-3 hover:shadow-xl hover:shadow-primary/20 active:scale-95 transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                  </svg>
                  <span className="tracking-widest uppercase text-sm">
                    {added ? 'Agregado!' : 'Agregar al carrito'}
                  </span>
                </button>
              </div>
            </div>

            {/* Trust signals */}
            <div className="mt-6 flex items-center gap-6 text-xs text-on-surface-variant font-medium">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-tertiary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <span>Compra segura</span>
              </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-tertiary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                <span>Envío a todo el país</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-outline-variant/30 py-10 mt-8">
        <div className="max-w-screen-xl mx-auto px-8 text-center text-on-surface-variant text-sm">
          <p className="font-headline italic text-primary text-lg mb-2">Ediciones Felicitas</p>
          <p>&copy; {new Date().getFullYear()} Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
