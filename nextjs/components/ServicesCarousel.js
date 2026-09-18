import Link from 'next/link';
import { SERVICES } from '@/lib/site';

const HOME_CHIPS = [
  ['Chatbots', 'RAG', 'Workflow Automation'],
  ['Python', 'Django', 'FastAPI', 'React', 'Next.js'],
  ['Research', 'Prototyping', 'Design Systems'],
  ['Pipelines', 'Warehousing', 'BI Dashboards'],
  ['Paid Social', 'UGC Creative', 'Funnels'],
];

export default function ServicesCarousel() {
  return (
    <section id="services" className="home-services">
      <div className="home-services-grid">
        <div className="home-services-intro">
          <div className="section-eyebrow">
            <span>(02)</span><i aria-hidden="true" /><span>What we do</span>
          </div>
          <h2>Simple workstreams. One accountable team.</h2>
          <p>We connect AI, product engineering, design, data, and growth so the fix does not get lost between vendors.</p>
          <Link href="/services" className="services-link">View services -&gt;</Link>
        </div>
        {SERVICES.map((service, i) => (
          <article key={service.n} className="home-service">
            <div className="home-service-copy">
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              <div className="home-service-chips">
                {HOME_CHIPS[i].map(chip => <span key={chip}>{chip}</span>)}
              </div>
            </div>
            <span className="home-service-number">{service.n}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
