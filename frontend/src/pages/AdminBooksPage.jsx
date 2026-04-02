import { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import BookTable from '../components/admin/BookTable';
import BookForm from '../components/admin/BookForm';
import DeleteModal from '../components/admin/DeleteModal';
import Spinner from '../components/ui/Spinner';
import api from '../services/api';

const formatPeso = (n) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n);

export default function AdminBooksPage({ openForm: openFormProp = false }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showForm, setShowForm] = useState(openFormProp);
  const [editingBook, setEditingBook] = useState(null);
  const [deletingBook, setDeletingBook] = useState(null);
  const [search, setSearch] = useState('');

  const fetchBooks = useCallback(async () => {
    try {
      const { data } = await api.get('/books/admin');
      setBooks(data);
    } catch {
      alert('Error al cargar los libros');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchBooks(); }, [fetchBooks]);

  const handleEdit = (book) => { setEditingBook(book); setShowForm(true); };
  const handleDelete = (book) => setDeletingBook(book);

  const handleFormSubmit = async (formData) => {
    setSaving(true);
    try {
      if (editingBook) {
        await api.put(`/books/${editingBook.id}`, formData);
      } else {
        await api.post('/books', formData);
      }
      setShowForm(false);
      setEditingBook(null);
      await fetchBooks();
    } catch (err) {
      alert(err.response?.data?.error || 'Error al guardar');
    } finally {
      setSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    setSaving(true);
    try {
      await api.delete(`/books/${deletingBook.id}`);
      setDeletingBook(null);
      await fetchBooks();
    } catch {
      alert('Error al desactivar el libro');
    } finally {
      setSaving(false);
    }
  };

  const activeBooks = books.filter((b) => b.activo);
  const totalValuation = activeBooks.reduce((sum, b) => sum + Number(b.precio), 0);

  const filtered = books.filter(
    (b) =>
      b.titulo.toLowerCase().includes(search.toLowerCase()) ||
      (b.autor || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      {/* Header */}
      <header className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-5xl font-headline font-bold tracking-tight text-on-surface">Inventario</h2>
          <p className="text-on-surface-variant mt-2">Gestioná el catálogo de libros de Ediciones Felicitas.</p>
        </div>
        <button
          onClick={() => { setEditingBook(null); setShowForm(true); }}
          className="flex items-center gap-3 bg-primary text-on-primary px-8 py-4 rounded-full font-bold hover:shadow-lg hover:shadow-primary/20 active:scale-95 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          <span>Añadir Libro</span>
        </button>
      </header>

      {/* Stats bar */}
      <div className="grid grid-cols-12 gap-6 mb-10">
        <div className="col-span-12 md:col-span-8 flex gap-12 p-8 bg-surface-low rounded-xl">
          <div>
            <span className="block text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">Total títulos</span>
            <span className="text-3xl font-headline italic text-primary">{books.length}</span>
          </div>
          <div>
            <span className="block text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">Activos</span>
            <span className="text-3xl font-headline italic text-on-surface">{activeBooks.length}</span>
          </div>
          <div>
            <span className="block text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">Valuación</span>
            <span className="text-3xl font-headline italic text-on-surface">{formatPeso(totalValuation)}</span>
          </div>
        </div>
        <div className="col-span-12 md:col-span-4 flex items-center justify-center p-8 bg-tertiary text-on-tertiary rounded-xl relative overflow-hidden group">
          <div className="relative z-10 text-center">
            <p className="text-xs uppercase tracking-widest opacity-80 mb-1">Editorial</p>
            <p className="text-xl font-headline italic leading-tight">Ediciones Felicitas</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por título o autor…"
          className="w-full pl-10 pr-4 py-2.5 border border-outline-variant rounded-full text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
        />
      </div>

      {/* Table */}
      {loading ? <Spinner /> : <BookTable books={filtered} onEdit={handleEdit} onDelete={handleDelete} />}

      {/* Pagination hint */}
      {!loading && filtered.length > 0 && (
        <div className="flex justify-between items-center mt-8 pb-4">
          <span className="text-sm text-on-surface-variant">
            Mostrando {filtered.length} de {books.length} libros
          </span>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-4 max-h-[92vh] overflow-y-auto">
            <div className="p-10">
              {/* Modal header */}
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-4xl font-headline font-bold tracking-tight text-primary">
                    {editingBook ? editingBook.titulo : 'Añadir Nuevo Libro'}
                  </h3>
                  {editingBook && (
                    <p className="text-on-surface-variant mt-1 italic text-sm">
                      ID: BK-{String(editingBook.id).padStart(5, '0')}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => { setShowForm(false); setEditingBook(null); }}
                  className="text-on-surface-variant hover:text-on-surface p-2 rounded-full hover:bg-surface-low transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
              <BookForm
                book={editingBook}
                onSubmit={handleFormSubmit}
                onCancel={() => { setShowForm(false); setEditingBook(null); }}
                loading={saving}
              />
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      <DeleteModal
        book={deletingBook}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingBook(null)}
        loading={saving}
      />
    </AdminLayout>
  );
}
