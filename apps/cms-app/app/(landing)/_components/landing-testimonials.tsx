import { Avatar, AvatarFallback } from "@repo/ui/components";
import Image from 'next/image';

interface TestimonialAuthor {
  name: string;
  role: string;
  fallback: string;
  avatarColor: string;
}

function QuoteIcon() {
  return (
    <svg
      viewBox="0 0 40 32"
      className="size-8 text-indigo-600"
      fill="currentColor"
    >
      <path d="M0 32V20.8C0 14.4 1.6 9.6 4.8 6.4 8 3.2 12.8 1.2 19.2.8V6c-3.2.4-5.6 1.6-7.2 3.6C10.4 11.6 9.6 14.4 9.6 18h8V32H0zm22.4 0V20.8c0-6.4 1.6-11.2 4.8-14.4C30.4 3.2 35.2 1.2 41.6.8V6c-3.2.4-5.6 1.6-7.2 3.6C33 11.6 32 14.4 32 18h8.4V32H22.4z" />
    </svg>
  );
}

function TestimonialAuthorInfo({ author }: { author: TestimonialAuthor; }) {
  return (
    <div className="flex items-center gap-3 mt-auto pt-6">
      <Avatar className="size-9 shrink-0">
        <AvatarFallback
          className="text-white text-xs font-semibold"
          style={{ backgroundColor: author.avatarColor }}
        >
          {author.fallback}
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm font-semibold text-gray-900">{author.name}</p>
        <p className="text-xs text-gray-400 uppercase tracking-wide">
          {author.role}
        </p>
      </div>
    </div>
  );
}

export function LandingTestimonials() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Confianza en cada palabra
          </h2>
          <p className="text-gray-500">
            Testimonios que elevan la autoridad de tu institución.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-5 gap-4">
          {/* Row 1, Left: Sara Jenkins - large card */}
          <div className="col-span-5 md:col-span-3 bg-gray-50 border border-gray-100 rounded-2xl p-8 flex flex-col min-h-64">
            <QuoteIcon />
            <blockquote className="mt-5 text-xl font-semibold text-gray-900 leading-snug flex-1">
              &ldquo;Geist ha transformado radicalmente cómo comunicamos el
              éxito de nuestros alumnos de posgrado. La curación editorial es
              impecable.&rdquo;
            </blockquote>
            <TestimonialAuthorInfo
              author={{
                name: "Dr. Sara Jenkins",
                role: "Directora de Innovación, Global Uni",
                fallback: "SJ",
                avatarColor: "#c07844",
              }}
            />
          </div>

          {/* Row 1, Right: Marco Rivera - small card */}
          <div className="col-span-5 md:col-span-2 bg-gray-50 border border-gray-100 rounded-2xl p-6 flex flex-col h-fit">
            <blockquote className="text-sm text-gray-500 leading-relaxed flex-1 italic">
              &ldquo;El widget es increíblemente rápido. Instalación en
              segundos y una estética que grita calidad premium.&rdquo;
            </blockquote>
            <TestimonialAuthorInfo
              author={{
                name: "Marco Rivera",
                role: "Founder, EduStream",
                fallback: "MR",
                avatarColor: "#5a7ab5",
              }}
            />
          </div>

          {/* Row 2, Left: Elena Rossi - small card */}
          <div className="col-span-5 md:col-span-2 bg-gray-50 border border-gray-100 rounded-2xl p-6 flex flex-col min-h-48">
            <blockquote className="text-sm text-gray-500 leading-relaxed flex-1 italic">
              &ldquo;Logramos un 40% más de conversiones al mostrar casos de
              éxito reales estructurados con Geist.&rdquo;
            </blockquote>
            <TestimonialAuthorInfo
              author={{
                name: "Elena Rossi",
                role: "Marketing Director, TechAcademy",
                fallback: "ER",
                avatarColor: "#8b5c7a",
              }}
            />
          </div>

          {/* Row 2, Right: Image card */}
          <div className="col-span-5 md:col-span-3 rounded-2xl overflow-hidden relative min-h-48 bg-gradient-to-br from-amber-100 via-orange-200 to-amber-300 flex items-end">
            {/* Background decorative elements simulating people at work */}
            <Image src={'/testimonials-image.jpg'} alt="Testimonial Image" fill className='object-cover' />
            <div className="relative z-10 p-8">
              <p className="text-white font-bold text-xl leading-snug">
                Potenciando el impacto visual de tu educación.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
