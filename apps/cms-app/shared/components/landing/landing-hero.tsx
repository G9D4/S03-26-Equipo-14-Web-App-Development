import { Button } from "@repo/ui/components";
import Link from "next/link";

export function LandingHero() {
  return (
    <section className="bg-white pt-20 pb-10 px-6">
      <div className="max-w-3xl mx-auto text-center">
        {/* Tag */}
        <p className="text-indigo-600 text-xs font-semibold uppercase tracking-widest mb-5">
          El CMS Editorial para el Éxito
        </p>

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
          Cura tu narrativa educativa.
        </h1>

        {/* Subtitle */}
        <p className="text-gray-500 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
          La plataforma líder para capturar, gestionar y mostrar el impacto de
          tus estudiantes a través de testimonios estructurados.
        </p>

        {/* CTA */}
        <Button
          size="lg"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 text-base"
          asChild
        >
          <Link href="/auth/login">Comenzar gratis</Link>
        </Button>
      </div>

      {/* Hero image */}
      <div className="max-w-4xl mx-auto mt-16">
        <div className="w-full h-96 md:h-[480px] rounded-2xl overflow-hidden bg-gradient-to-b from-stone-100 to-stone-200 relative flex items-end justify-center">
          {/* Architectural interior placeholder */}
          <div className="absolute inset-0 flex flex-col items-center justify-start pt-8 gap-3">
            {/* Columns row */}
            <div className="flex gap-8 items-end h-full pb-0">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="w-3 bg-stone-300/60 rounded-sm"
                  style={{ height: `${75 + (i % 2) * 10}%` }}
                />
              ))}
            </div>
          </div>
          {/* Window light effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-300/40 via-transparent to-stone-50/80 rounded-2xl" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-full bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </div>
    </section>
  );
}
