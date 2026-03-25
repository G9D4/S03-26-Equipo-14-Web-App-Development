import { LandingNavbar } from "./_components/landing-navbar";
import { LandingHero } from "./_components/landing-hero";
import { LandingFeatures } from "./_components/landing-features";
import { LandingTestimonials } from "./_components/landing-testimonials";
import { LandingFooter } from "./_components/landing-footer";

export default function Landing() {
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
