import { useState, useEffect } from 'react';

const EMPTY = { titulo: '', isbn: '', precio: '', autor: '', categoria: '', imagen: '' };

const CATEGORIAS = [
  'Narrativa', 'Poesía', 'Historia', 'Biografía',
  'Infantil', 'Ensayo', 'Filosofía', 'Arte & Diseño', 'Otro',
];

const inputClass =
  'w-full bg-surface-high border-none rounded-lg px-6 py-4 text-on-surface focus:ring-2 focus:ring-primary/30 transition-all outline-none';
const labelClass =
  'block text-[10px] font-bold uppercase tracking-widest text-outline mb-3';

export default function BookForm({ book, onSubmit, onCancel, loading }) {
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState('');

  useEffect(() => {
    setForm(book
      ? { titulo: book.titulo || '', isbn: book.isbn || '', precio: book.precio || '', autor: book.autor || '', categoria: book.categoria || '', imagen: book.imagen || '' }
      : EMPTY
    );
    setError('');
  }, [book]);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.titulo.trim()) return setError('El título es obligatorio');
    if (!form.precio || isNaN(Number(form.precio))) return setError('Ingresá un precio válido');
    onSubmit({ ...form, precio: Number(form.precio) });
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-10">
      {/* Left: Cover preview */}
      <div className="col-span-12 lg:col-span-4 space-y-6">
        <div className="bg-surface-low p-6 rounded-lg">
          <p className={labelClass}>Portada actual</p>
          <div className="aspect-[3/4] rounded-sm shadow-lg overflow-hidden bg-surface-high flex items-center justify-center mb-4">
            {form.imagen ? (
              <img src={form.imagen} alt="Portada" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center text-outline">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mx-auto mb-2 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                </svg>
                <p className="text-xs">Sin imagen</p>
              </div>
            )}
          </div>
          <p className="text-[10px] text-outline text-center uppercase tracking-widest">
            Recomendado: 800 × 1200 px
          </p>
        </div>
      </div>

      {/* Right: Form fields */}
      <div className="col-span-12 lg:col-span-8 space-y-8 bg-surface-low p-8 rounded-xl">
        {/* Título */}
        <div className="col-span-2">
          <label className={labelClass}>Título de la Obra *</label>
          <input
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
            className={`${inputClass} font-headline text-xl text-primary`}
            placeholder="Ej. Macacha Güemes"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Autor */}
          <div>
            <label className={labelClass}>Autor</label>
            <input name="autor" value={form.autor} onChange={handleChange} className={inputClass} placeholder="Nombre del autor" />
          </div>
          {/* Categoría */}
          <div>
            <label className={labelClass}>Categoría</label>
            <select name="categoria" value={form.categoria} onChange={handleChange} className={`${inputClass} appearance-none`}>
              <option value="">Sin categoría</option>
              {CATEGORIAS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Precio */}
          <div>
            <label className={labelClass}>Precio (ARS) *</label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 font-headline text-outline">$</span>
              <input
                name="precio"
                type="number"
                min="0"
                value={form.precio}
                onChange={handleChange}
                className={`${inputClass} pl-9 font-headline text-xl`}
                placeholder="25000"
              />
            </div>
          </div>
          {/* ISBN */}
          <div>
            <label className={labelClass}>ISBN</label>
            <input
              name="isbn"
              value={form.isbn}
              onChange={handleChange}
              className="w-full bg-transparent border-b-2 border-outline-variant px-2 py-3 font-mono text-sm text-on-surface-variant focus:border-primary transition-colors outline-none"
              placeholder="978-987-..."
            />
          </div>
        </div>

        {/* Imagen URL */}
        <div>
          <label className={labelClass}>URL de portada</label>
          <input name="imagen" value={form.imagen} onChange={handleChange} className={inputClass} placeholder="https://..." />
        </div>

        {error && <p className="text-error text-sm">{error}</p>}

        {/* Actions */}
        <div className="flex items-center justify-between pt-6 border-t border-outline-variant/20">
          <button
            type="button"
            onClick={onCancel}
            className="px-8 py-3 text-sm font-bold uppercase tracking-widest text-on-surface-variant hover:text-on-surface transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-10 py-4 bg-primary text-on-primary rounded-full font-bold uppercase tracking-widest text-xs shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-3"
          >
            {book ? 'Actualizar Cambios' : 'Guardar Libro'}
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
            </svg>
          </button>
        </div>
      </div>
    </form>
  );
}
