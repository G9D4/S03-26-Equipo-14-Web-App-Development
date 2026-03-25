import Link from "next/link";

const footerLinks = [
  { label: "Twitter", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Privacidad", href: "#" },
  { label: "Términos", href: "#" },
];

export function LandingFooter() {
  return (
    <footer className="border-t border-gray-100 bg-white py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="size-6 rounded-md bg-indigo-600 flex items-center justify-center shrink-0">
            <svg
              viewBox="0 0 24 24"
              className="size-3"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-gray-900">
            Geist EdTech
          </span>
        </div>

        {/* Links */}
        <nav className="flex items-center gap-6">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs text-gray-400 hover:text-gray-600 uppercase tracking-widest transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Copyright */}
        <p className="text-xs text-gray-400 uppercase tracking-wide">
          © 2024 Geist EdTech. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
