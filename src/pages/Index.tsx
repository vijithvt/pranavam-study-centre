import React from 'react';

import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import ModernCTASection from '../components/ModernCTASection';
import FloatingContactButtons from '../components/FloatingContactButtons';
import WhatsAppEnquiryPopup from '../components/WhatsAppEnquiryPopup';
import PopularCategories from '../components/PopularCategories';
import TrustSection from '../components/TrustSection';
import HomeEnquiryForm from '../components/HomeEnquiryForm';
import HomeSeo from '../components/HomeSeo';

const Index = () => {
  return (
    <>
      <HomeSeo />
      <main className="min-h-screen bg-background">
        <Hero />

        <section className="bg-background pb-16 sm:pb-20" aria-label="Homepage enquiry section">
          <div className="container">
            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <aside className="rounded-[2rem] border border-border bg-card p-6 shadow-sm sm:p-8">
                <p className="mb-3 inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  Malayalam-first support
                </p>
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  ഇന്ന് തന്നെ പഠനം തുടങ്ങാം
                </h2>
                <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
                  വിദ്യാർത്ഥിക്കും രക്ഷിതാവിനും ആശങ്കയില്ലാതെ enquiry അയയ്ക്കാൻ പറ്റുന്ന രീതിയിൽ Malayalam-first experience ഒരുക്കിയിരിക്കുന്നു.
                </p>
                <div className="mt-8 space-y-4">
                  <article className="rounded-[1.5rem] bg-muted/60 p-4">
                    <h3 className="font-semibold text-foreground">Fast response</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      WhatsApp enquiry അയച്ചാൽ ആവശ്യങ്ങൾ വേഗത്തിൽ review ചെയ്ത് tutor matching guide ചെയ്യുന്നു.
                    </p>
                  </article>
                  <article className="rounded-[1.5rem] bg-muted/60 p-4">
                    <h3 className="font-semibold text-foreground">Parent friendly</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      ഫോൺ, subject, location എന്നീ പ്രധാന വിവരങ്ങൾ മാത്രം നൽകി തുടക്കം കുറിക്കാം.
                    </p>
                  </article>
                </div>
              </aside>

              <HomeEnquiryForm />
            </div>
          </div>
        </section>

        <div id="popular-categories">
          <PopularCategories />
        </div>
        <HowItWorks />
        <TrustSection />
        <Features />
        <Testimonials />
        <ModernCTASection />
        <FloatingContactButtons />
        <WhatsAppEnquiryPopup phoneNumber="+919496315903" />
      </main>
    </>
  );
};

export default Index;
