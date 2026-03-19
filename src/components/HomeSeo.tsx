import { useEffect } from 'react';

const HomeSeo = () => {
  useEffect(() => {
    const title = 'Home Tuition Kerala | Pranavam Study Centre';
    const description = 'കേരളത്തിലെ വിദ്യാർത്ഥികൾക്കും രക്ഷിതാക്കൾക്കും അനുയോജ്യമായ home tuition, music, drawing, school tuition, online and offline classes കണ്ടെത്താൻ Pranavam Study Centre സഹായിക്കുന്നു.';
    const canonicalUrl = `${window.location.origin}/`;

    document.title = title;

    const upsertMeta = (selector: string, attributes: Record<string, string>) => {
      let element = document.head.querySelector(selector) as HTMLMetaElement | null;

      if (!element) {
        element = document.createElement('meta');
        document.head.appendChild(element);
      }

      Object.entries(attributes).forEach(([key, value]) => {
        element?.setAttribute(key, value);
      });
    };

    const upsertLink = (selector: string, attributes: Record<string, string>) => {
      let element = document.head.querySelector(selector) as HTMLLinkElement | null;

      if (!element) {
        element = document.createElement('link');
        document.head.appendChild(element);
      }

      Object.entries(attributes).forEach(([key, value]) => {
        element?.setAttribute(key, value);
      });
    };

    upsertMeta('meta[name="description"]', { name: 'description', content: description });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    upsertLink('link[rel="canonical"]', { rel: 'canonical', href: canonicalUrl });

    const jsonLdId = 'home-jsonld';
    const existingScript = document.getElementById(jsonLdId);
    if (existingScript) existingScript.remove();

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = jsonLdId;
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      name: 'Pranavam Study Centre',
      url: canonicalUrl,
      logo: `${window.location.origin}/lovable-uploads/f1375cac-1988-4227-98e7-d4a89e68c1af.png`,
      telephone: '+91 94963 15903',
      areaServed: 'Kerala',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Vilappilsala',
        addressRegion: 'Kerala',
        postalCode: '695573',
        addressCountry: 'IN',
      },
      sameAs: [canonicalUrl],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Learning categories',
        itemListElement: [
          'Violin',
          'Carnatic music',
          'Drawing',
          'School tuition',
          'College subjects',
          'Skill-based learning',
          'Maths',
          'Science',
          'English',
          'Programming',
        ].map((name) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name,
          },
        })),
      },
    });

    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return null;
};

export default HomeSeo;
