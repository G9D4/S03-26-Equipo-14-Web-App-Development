import { Card } from "@repo/ui/components";
import { File, FileText, Grid, Layout, Sparkles } from '@repo/ui/lib';

function ShareNetworkIcon() {
  return (
    <svg
      className="size-6 text-gray-400"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="18" cy="5" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="19" r="2.5" />
      <line x1="8.5" y1="10.8" x2="15.5" y2="6.2" />
      <line x1="8.5" y1="13.2" x2="15.5" y2="17.8" />
    </svg>
  );
}

function EditorialIcon() {
  return (
    <svg
      className="size-6 text-gray-400"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="9" y1="13" x2="15" y2="13" />
      <line x1="9" y1="17" x2="13" y2="17" />
      <polyline points="9 9 10 9" />
    </svg>
  );
}

function WidgetIcon() {
  return (
    <svg
      className="size-6 text-gray-400"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="8" height="8" rx="1" />
      <rect x="13" y="3" width="8" height="8" rx="1" />
      <rect x="3" y="13" width="8" height="8" rx="1" />
      <rect x="13" y="13" width="8" height="8" rx="1" />
    </svg>
  );
}

const features = [
  {
    icon: <Sparkles />,
    title: "Gestión Inteligente",
    description:
      "Centraliza textos, videos y casos de estudio en una única bóveda digital.",
  },
  {
    icon: <FileText />,
    title: "Curación Editorial",
    description:
      "Flujos de aprobación profesional para administradores y editores con control de versiones.",
  },
  {
    icon: <Grid />,
    title: "Widget Desplegable",
    description:
      "Muestra los éxitos con un componente de alto rendimiento que se adapta a cualquier web.",
  },
];

export function LandingFeatures() {
  return (
    <section id="funcionalidades" className="bg-gray-50 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="bg-white border-0 rounded-2xl p-8 shadow-none gap-0"
            >
              <div className="mb-5 bg-indigo-600/10 text-indigo-600 w-fit p-2 rounded-lg">{feature.icon}</div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
