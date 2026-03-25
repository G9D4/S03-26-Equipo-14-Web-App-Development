import { LandingNavbar } from "@/shared/components/landing/landing-navbar";
import { LandingHero } from "@/shared/components/landing/landing-hero";
import { LandingFeatures } from "@/shared/components/landing/landing-features";
import { LandingTestimonials } from "@/shared/components/landing/landing-testimonials";
import { LandingFooter } from "@/shared/components/landing/landing-footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar />
      <LandingHero />
      <LandingFeatures />
      <LandingTestimonials />
      <LandingFooter />
    </div>
  );
}
