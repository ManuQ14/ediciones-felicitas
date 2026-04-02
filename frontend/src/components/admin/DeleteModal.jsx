export default function DeleteModal({ book, onConfirm, onCancel, loading }) {
  if (!book) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4">
        <h3 className="text-xl font-headline font-bold text-on-surface mb-2">¿Desactivar libro?</h3>
        <p className="text-on-surface-variant text-sm mb-6">
          El libro <span className="font-semibold text-on-surface">"{book.titulo}"</span> dejará de aparecer en el catálogo público. Podés reactivarlo editándolo.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-5 py-2 rounded-full border border-outline-variant text-on-surface-variant text-sm font-medium hover:bg-surface-high transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-6 py-2 rounded-full bg-error text-white text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? 'Desactivando…' : 'Desactivar'}
          </button>
        </div>
      </div>
    </div>
  );
}
