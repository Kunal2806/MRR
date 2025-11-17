import Navigation from "@/components/oldComponent/Navigation";
import Hero from "@/components/oldComponent/Hero";
import ExploreSection from "@/components/oldComponent/ExploreSection";
import Events from "@/components/oldComponent/Events";
import Courses from "@/components/oldComponent/Courses";
import CTASection from "@/components/oldComponent/CTASection";
import FAQ from "@/components/oldComponent/FAQ";
import ContactForm from "@/components/oldComponent/ContactForm";
import WhatsAppFloat from "@/components/oldComponent/WhatsAppFloat";
import Footer from "@/components/oldComponent/Footer";
import SEO from "@/components/oldComponent/SEO";
// import { useHeroImagePreload } from "@/hooks/useImagePreload";111
const Index = () => {
  // Preload critical hero images
  // useHeroImagePreload();111
  return <div className="min-h-screen">
      <SEO title="Ravi Rautela Mentorship Hub | Tech Education & Career Growth" description="Transform your tech career with expert mentorship, hands-on projects, and real-world internships. Join our community of learners and innovators." keywords="tech mentorship, programming courses, internships, hackathons, career development, coding bootcamp, tech education" />
      <Navigation />
      <main>
        <section id="home">
          <Hero />
        </section>
        <section id="explore">
          <ExploreSection />
        </section>
        <section id="events">
          <Events />
        </section>
        <section id="courses">
          <Courses />
        </section>
        
        <section id="faq-contact" className="py-16 px-4 bg-gradient-subtle">
          <div className="container mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="order-2 lg:order-1">
                <FAQ />
              </div>
              <div className="order-1 lg:order-2">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <WhatsAppFloat />
      <Footer />
    </div>;
};
export default Index;