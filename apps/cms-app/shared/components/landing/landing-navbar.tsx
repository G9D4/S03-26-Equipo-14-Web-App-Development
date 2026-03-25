import { Button } from "@repo/ui/components";
import Link from "next/link";

export function LandingNavbar() {
  return (
    <header className="border-b border-gray-100 bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="size-7 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0">
            <svg
              viewBox="0 0 24 24"
              className="size-4"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
          </div>
          <span className="font-semibold text-gray-900 text-sm">
            Geist EdTech
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#funcionalidades"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Funcionalidades
          </Link>
          <Link
            href="#precios"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Precios
          </Link>
        </nav>

        {/* Auth buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-sm text-gray-700 font-medium"
            asChild
          >
            <Link href="/auth/login">Iniciar Sesión</Link>
          </Button>
          <Button
            size="sm"
            className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white"
            asChild
          >
            <Link href="/auth/login">Registrarse</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
