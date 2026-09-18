import Link from 'next/link';
import HeroNetwork from '@/components/HeroNetwork';
import ServicesCarousel from '@/components/ServicesCarousel';
import ProcessShowcase from '@/components/ProcessShowcase';
import ContactSection from '@/components/ContactSection';
import AuditModal from '@/components/AuditModal';
import Reveal from '@/components/Reveal';
import CaseCover from '@/components/CaseCover';
import { CASES } from '@/lib/site';

const PAINS = [
  { n: '01', title: 'Traffic, no sales', desc: 'People arrive, browse, and leave because the offer, message, or checkout never earns the next click.', tags: ['Conversion', 'Web audit', 'UX'], bg: 'linear-gradient(160deg, rgba(1,251,255,.10), rgba(255,255,255,.025)), #0b1114', border: 'rgba(1,251,255,.20)', numberColor: 'rgba(1,251,255,.42)', glow: 'rgba(1,251,255,.55)', rule: 'rgba(1,251,255,.16)', cardGlow: 'rgba(1,251,255,.05)' },
  { n: '02', title: 'Ops held together', desc: 'The business depends on spreadsheets, manual follow-ups, and tiny tasks that quietly eat the week.', tags: ['Automation', 'Internal tools', 'AI'], bg: 'linear-gradient(160deg, rgba(1,251,255,.075), rgba(255,255,255,.02)), #0c0e12', border: 'rgba(1,251,255,.18)', numberColor: 'rgba(1,251,255,.38)', glow: 'rgba(1,251,255,.50)', rule: 'rgba(1,251,255,.14)', cardGlow: 'rgba(1,251,255,.045)' },
  { n: '03', title: 'AI feels unclear', desc: 'You know AI should help, but the use cases, cost, and risk are still too fuzzy to bet on.', tags: ['AI strategy', 'RAG', 'Agents'], bg: 'linear-gradient(160deg, rgba(1,251,255,.06), rgba(255,255,255,.018)), #0a0d10', border: 'rgba(1,251,255,.22)', numberColor: 'rgba(1,251,255,.40)', glow: 'rgba(1,251,255,.54)', rule: 'rgba(1,251,255,.16)', cardGlow: 'rgba(1,251,255,.05)' },
  { n: '04', title: 'Built, then abandoned', desc: 'The last team shipped something, disappeared, and left you with bugs, loose ends, and no roadmap.', tags: ['Engineering', 'Recovery', 'Growth'], bg: 'linear-gradient(160deg, rgba(1,251,255,.045), rgba(255,255,255,.02)), #0b0d11', border: 'rgba(1,251,255,.16)', numberColor: 'rgba(1,251,255,.35)', glow: 'rgba(1,251,255,.48)', rule: 'rgba(1,251,255,.13)', cardGlow: 'rgba(1,251,255,.04)' },
];

const h2 = { margin: 0, fontWeight: 700, fontSize: 'clamp(28px,4vw,42px)', letterSpacing: 0, color: '#fff' };

export default function Home() {
  return (
    <main className="home-page">
      <HeroNetwork />

      <section id="problems" style={{ background: 'radial-gradient(ellipse 72% 90% at 50% 8%, rgba(1,251,255,.10), transparent 62%), linear-gradient(180deg, #060708 0%, #0b0d10 100%)', padding: 'clamp(78px,11vh,124px) clamp(20px,5vw,64px)', borderTop: '1px solid rgba(1,251,255,.10)', borderBottom: '1px solid rgba(1,251,255,.10)' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(26px,5vw,64px)', alignItems: 'end', marginBottom: 'clamp(34px,5vw,56px)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, fontFamily: 'var(--font-grotesk)', fontSize: 12, fontWeight: 700, letterSpacing: 0, textTransform: 'uppercase', color: '#8e98a2' }}>
                <span style={{ color: '#01FBFF' }}>(01)</span>
                <span style={{ width: 42, height: 1, background: 'rgba(1,251,255,.44)' }} />
                <span>What breaks growth</span>
              </div>
              <h2 style={{ margin: 0, maxWidth: 720, fontFamily: 'var(--font-grotesk)', fontWeight: 700, fontSize: 58, lineHeight: 1.02, color: '#fff', textShadow: '0 0 36px rgba(1,251,255,.14)' }}>Sound familiar?</h2>
            </div>
            <p style={{ margin: 0, maxWidth: 430, fontSize: 18, lineHeight: 1.68, color: '#a7adb6' }}>Most growth problems are visible once the right team looks at the funnel, the system, and the user journey together.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(245px, 1fr))', gap: 16 }}>
            {PAINS.map((p, i) => (
              <Reveal key={p.n} delay={i * 80}>
                <article style={{ minHeight: 270, padding: 'clamp(24px,3vw,32px)', borderRadius: 8, background: p.bg, border: `1px solid ${p.border}`, boxShadow: `0 18px 50px rgba(0,0,0,.24), 0 0 34px ${p.cardGlow}`, color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 24, height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 18 }}>
                    <span style={{ fontFamily: 'var(--font-grotesk)', fontSize: 28, lineHeight: 1, color: p.numberColor }}>{p.n}</span>
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#01FBFF', boxShadow: `0 0 18px ${p.glow}`, flexShrink: 0 }} />
                  </div>
                  <div>
                    <h3 style={{ margin: '0 0 12px', fontFamily: 'var(--font-grotesk)', fontWeight: 700, fontSize: 28, lineHeight: 1.08, color: '#fff' }}>{p.title}</h3>
                    <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.6, color: '#a7adb6' }}>{p.desc}</p>
                  </div>
                  <div>
                    <div style={{ height: 1, background: p.rule, marginBottom: 16 }} />
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {p.tags.map((tag) => (
                        <span key={tag} style={{ fontFamily: 'var(--font-grotesk)', fontSize: 11, fontWeight: 700, letterSpacing: 0, color: '#7DFFFF', textTransform: 'uppercase' }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ServicesCarousel />

      <section id="work" style={{ padding: 'clamp(64px,10vh,110px) clamp(20px,5vw,64px)', background: 'linear-gradient(180deg,transparent,rgba(1,251,255,.025),transparent)' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18, fontFamily: 'var(--font-grotesk)', fontSize: 12, fontWeight: 700, letterSpacing: 0, textTransform: 'uppercase', color: '#8e98a2' }}>
            <span style={{ color: '#01FBFF' }}>(03)</span>
            <span style={{ width: 42, height: 1, background: 'rgba(1,251,255,.44)' }} />
            <span>Proof</span>
          </div>
          <h2 style={{ ...h2, marginBottom: 12, fontSize: 38 }}>Problems we&apos;ve solved.</h2>
          <p style={{ margin: '0 0 40px', color: '#a7adb6', fontSize: 17, maxWidth: 560 }}>A few examples of what happens when you diagnose before you build.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: 20 }}>
            {CASES.slice(0, 3).map((c, i) => (
              <Reveal key={c.slug} delay={i * 80}>
                <Link className="work-card" href={`/work/${c.slug}`} style={{ display: 'flex', flexDirection: 'column', borderRadius: 8, background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', overflow: 'hidden', color: 'inherit', height: '100%' }}>
                  <div style={{ aspectRatio: '16 / 10', background: 'linear-gradient(160deg,rgba(1,251,255,.06),rgba(255,255,255,.02))' }}>
                    <CaseCover caseStudy={c} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '22px 24px 24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                      <span style={{ padding: '4px 11px', borderRadius: 999, border: '1px solid rgba(255,255,255,.14)', fontSize: 11, letterSpacing: 0, fontWeight: 600, color: '#9aa0a8' }}>{c.industry}</span>
                      <span style={{ fontFamily: 'var(--font-grotesk)', fontWeight: 700, fontSize: 19, color: '#01FBFF' }}>{c.metric}</span>
                    </div>
                    <h3 style={{ margin: 0, fontWeight: 700, fontSize: 19, color: '#fff' }}>{c.title}</h3>
                    <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: '#a7adb6' }}>{c.problem}</p>
                    <span style={{ marginTop: 4, fontSize: 13, fontWeight: 600, color: '#6ee7f5' }}>View case study -&gt;</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <div style={{ marginTop: 32, textAlign: 'center' }}>
            <Link href="/work" style={{ padding: '12px 26px', borderRadius: 10, border: '1px solid rgba(1,251,255,.45)', color: '#01FBFF', fontWeight: 600, fontSize: 14.5, background: 'rgba(1,251,255,.05)' }}>See all case studies -&gt;</Link>
          </div>
        </div>
      </section>

      <ProcessShowcase />

      <section id="contact" style={{ background: 'radial-gradient(ellipse 70% 90% at 50% 100%, rgba(1,251,255,.06), transparent)' }}>
        <ContactSection />
      </section>

      <AuditModal />
    </main>
  );
}
