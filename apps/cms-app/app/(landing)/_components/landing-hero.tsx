import { Button } from "@repo/ui/components";
import Image from 'next/image';
import Link from "next/link";

export function LandingHero() {
  return (
    <section className="bg-white pt-20 pb-10 px-6">
      <div className="max-w-4xl mx-auto text-center">
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
      <div className="max-w-4xl mx-auto mt-16 relative aspect-video">
        <Image loading='eager' src={'/hero-image.jpg'} alt="Hero Image" fill className='rounded-lg' />
      </div>
    </section>
  );
}
