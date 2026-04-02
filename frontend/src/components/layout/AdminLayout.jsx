import AdminSidebar from './AdminSidebar';

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-surface flex">
      <AdminSidebar />
      <main className="flex-1 ml-64 min-h-screen p-12 bg-surface">
        {children}
      </main>
    </div>
  );
}
