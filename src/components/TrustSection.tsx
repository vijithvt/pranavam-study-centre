import React from 'react';
import { BadgeCheck, MapPinned, MonitorSmartphone, UserRoundSearch } from 'lucide-react';

const trustItems = [
  {
    icon: MapPinned,
    title: 'കേരളത്തിലുടനീളം വിദ്യാർത്ഥികൾക്കായി',
    description: 'നഗരങ്ങളിലും ചെറിയ town-കളിലും ഒരുപോലെ പഠനസഹായം എത്തിക്കുന്നു.',
  },
  {
    icon: BadgeCheck,
    title: 'വിശ്വസ്തരായ അധ്യാപകർ',
    description: 'വിഷയപരിചയവും പഠിപ്പിക്കൽ കഴിവും പരിഗണിച്ച് match ചെയ്യുന്നു.',
  },
  {
    icon: MonitorSmartphone,
    title: 'ഓൺലൈൻ / ഓഫ്‌ലൈൻ ക്ലാസുകൾ',
    description: 'കുടുംബത്തിന്റെ സൗകര്യത്തിന് അനുസരിച്ച് mode തിരഞ്ഞെടുക്കാം.',
  },
  {
    icon: UserRoundSearch,
    title: 'വ്യക്തിഗത ശ്രദ്ധ',
    description: 'ഓരോ വിദ്യാർത്ഥിയുടെയും പഠനരീതിക്കും ലക്ഷ്യത്തിനും ഒത്ത പിന്തുണ.',
  },
];

const TrustSection = () => {
  return (
    <section id="trust" aria-labelledby="trust-title" className="bg-muted/40 py-16 sm:py-20">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="max-w-xl">
            <p className="mb-3 inline-flex rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              Trusted by Kerala families
            </p>
            <h2 id="trust-title" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Why Kerala families trust us
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
              ശരിയായ അധ്യാപകനെ കണ്ടെത്തുന്നത് ഒരു form fill മാത്രം അല്ല — വിശ്വാസം, quality, clarity ഇവയും equally പ്രധാനമാണ്.
            </p>
            <div className="mt-8 rounded-[1.75rem] border border-border bg-card p-6 shadow-sm">
              <dl className="grid gap-5 sm:grid-cols-3">
                <div>
                  <dt className="text-sm text-muted-foreground">Since</dt>
                  <dd className="mt-2 text-3xl font-bold text-foreground">2016</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Coverage</dt>
                  <dd className="mt-2 text-3xl font-bold text-foreground">14 ജില്ലകൾ</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Focus</dt>
                  <dd className="mt-2 text-3xl font-bold text-foreground">1-on-1 match</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {trustItems.map((item) => {
              const Icon = item.icon;

              return (
                <article key={item.title} className="rounded-[1.75rem] border border-border bg-card p-6 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
