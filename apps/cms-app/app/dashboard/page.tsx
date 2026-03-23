import { LogoutButton } from '../../shared/components/logout-button';

export default async function DashboardPage() {
  return (
    <main>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Vista para usuarios autenticados.</p>
          <LogoutButton />
        </div>
      </div>
    </main>
  );
}
