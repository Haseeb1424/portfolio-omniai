import Link from 'next/link';
import { notFound } from 'next/navigation';
import CaseCover from '@/components/CaseCover';
import { CASES } from '@/lib/site';

export function generateStaticParams() {
  return CASES.map(c => ({ slug: c.slug }));
}

export function generateMetadata({ params }) {
  const c = CASES.find(x => x.slug === params.slug);
  return { title: c ? `${c.title} - Team OmniAI` : 'Case study' };
}

const frame = { borderRadius: 14, border: '1px solid rgba(255,255,255,.1)', background: 'rgba(255,255,255,.03)', overflow: 'hidden' };
const dots = ['', '', ''].map((_, i) => <span key={i} style={{ width: 9, height: 9, borderRadius: '50%', background: 'rgba(255,255,255,.14)' }} />);

export default function CaseStudy({ params }) {
  const c = CASES.find(x => x.slug === params.slug);
  if (!c) notFound();

  const idx = CASES.findIndex(x => x.slug === c.slug);
  const next = CASES[(idx + 1) % CASES.length];
  const full = !!c.heroStats;
  const detail = c.detailAssets;

  return (
    <main>
      <header style={{ position: 'relative', padding: 'clamp(56px,9vh,100px) clamp(20px,5vw,64px) 0' }}>
        <div style={{ maxWidth: 1060, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center', textAlign: 'center' }}>
          <Link href="/work" style={{ fontSize: 13.5, fontWeight: 600, color: '#6ee7f5' }}>&larr; All case studies</Link>
          <span style={{ padding: '5px 14px', borderRadius: 999, border: '1px solid rgba(255,255,255,.14)', fontSize: 11.5, letterSpacing: '.1em', fontWeight: 600, color: '#9aa0a8' }}>{c.industry}</span>
          <h1 style={{ margin: 0, fontWeight: 700, fontSize: 'clamp(32px,5vw,56px)', lineHeight: 1.08, letterSpacing: 0, color: '#fff' }}>{full ? <>Checkout that stopped <span style={{ color: '#00e5ff', textShadow: '0 0 32px rgba(0,229,255,.45)' }}>leaking sales.</span></> : c.title}</h1>
          {full && (
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'clamp(24px,5vw,64px)', padding: '18px 32px', borderRadius: 14, border: '1px solid rgba(0,229,255,.2)', background: 'rgba(0,229,255,.04)' }}>
              {c.heroStats.map(s => (
                <div key={s.l}>
                  <div style={{ fontFamily: 'var(--font-grotesk)', fontWeight: 700, fontSize: 'clamp(24px,3vw,32px)', color: '#00e5ff' }}>{s.v}</div>
                  <div style={{ fontSize: 12.5, color: '#8b9098', marginTop: 2 }}>{s.l}</div>
                </div>
              ))}
            </div>
          )}
          <div style={{ width: '100%', borderRadius: '16px 16px 0 0', border: '1px solid rgba(255,255,255,.1)', borderBottom: 'none', background: 'rgba(255,255,255,.04)', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
              {dots}
              {full && <span style={{ flex: 1, minWidth: 0, marginLeft: 12, padding: '5px 14px', borderRadius: 7, background: 'rgba(255,255,255,.05)', fontSize: 12, color: '#6a7078', textAlign: 'left', overflowWrap: 'anywhere' }}>store.example.com/checkout</span>}
            </div>
            <div style={{ aspectRatio: '16 / 10', background: 'linear-gradient(160deg,rgba(0,229,255,.05),rgba(255,255,255,.02))' }}>
              <CaseCover caseStudy={c} />
            </div>
          </div>
        </div>
      </header>

      {full && detail && (
        <>
          <section style={{ borderTop: '1px solid rgba(0,229,255,.25)', borderBottom: '1px solid rgba(255,255,255,.07)', background: 'rgba(255,255,255,.02)' }}>
            <div style={{ maxWidth: 1060, margin: '0 auto', padding: '28px clamp(20px,5vw,64px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px,1fr))', gap: 24 }}>
              {[['CLIENT', c.client], ['INDUSTRY', c.industryFull], ['TIMELINE', c.timeline]].map(([k, v]) => (
                <div key={k}>
                  <div style={{ fontSize: 11.5, letterSpacing: '.1em', fontWeight: 600, color: '#6a7078', marginBottom: 6 }}>{k}</div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#dfe2e6' }}>{v}</div>
                </div>
              ))}
              <div>
                <div style={{ fontSize: 11.5, letterSpacing: '.1em', fontWeight: 600, color: '#6a7078', marginBottom: 6 }}>SERVICES</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {c.services.map(s => <span key={s} style={{ padding: '4px 10px', borderRadius: 999, border: '1px solid rgba(0,229,255,.25)', background: 'rgba(0,229,255,.05)', fontSize: 11.5, color: '#7df3ff' }}>{s}</span>)}
                </div>
              </div>
            </div>
          </section>

          <section style={{ maxWidth: 1060, margin: '0 auto', padding: 'clamp(56px,8vh,90px) clamp(20px,5vw,64px)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'clamp(28px,4vw,56px)' }}>
            <div style={{ flex: '1 1 340px', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <span style={{ fontSize: 12, letterSpacing: '.12em', fontWeight: 600, color: '#6ee7f5' }}>THE PROBLEM</span>
              <h2 style={{ margin: 0, fontWeight: 700, fontSize: 'clamp(24px,3vw,32px)', letterSpacing: '-.02em', color: '#fff' }}>{c.problemHeadline}</h2>
              <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.7, color: '#b9bec6' }}>{c.problemBody}</p>
            </div>
            <div style={{ flex: '1 1 340px', ...frame }}>
              <div style={{ padding: '9px 14px', borderBottom: '1px solid rgba(255,255,255,.07)', fontSize: 11.5, letterSpacing: '.08em', fontWeight: 600, color: '#6a7078' }}>BEFORE</div>
              <div style={{ aspectRatio: '16 / 10' }}><img src={detail.before} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
            </div>
          </section>

          <section style={{ borderTop: '1px solid rgba(255,255,255,.07)', background: 'linear-gradient(180deg,rgba(0,229,255,.02),transparent)' }}>
            <div style={{ maxWidth: 1060, margin: '0 auto', padding: 'clamp(56px,8vh,90px) clamp(20px,5vw,64px)', display: 'flex', flexDirection: 'column', gap: 'clamp(48px,7vh,80px)' }}>
              <div style={{ maxWidth: 620, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <span style={{ fontSize: 12, letterSpacing: '.12em', fontWeight: 600, color: '#6ee7f5' }}>THE SOLUTION</span>
                <h2 style={{ margin: 0, fontWeight: 700, fontSize: 'clamp(24px,3vw,32px)', letterSpacing: '-.02em', color: '#fff' }}>{c.solutionHeadline}</h2>
                <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.7, color: '#b9bec6' }}>{c.solutionBody}</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <h3 style={{ margin: 0, fontWeight: 600, fontSize: 19, color: '#fff' }}>The new checkout, desktop</h3>
                <p style={{ margin: 0, maxWidth: 620, fontSize: 14.5, lineHeight: 1.65, color: '#a7adb6' }}>Shipping, taxes, and delivery date visible before a single field is filled. Every removed field was a measured decision - we A/B tested the form down to seven inputs.</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(420px,100%),1fr))', gap: 20 }}>
                  {detail.desktop.map(src => (
                    <div key={src} style={frame}>
                      <div style={{ display: 'flex', gap: 7, padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,.07)' }}>{dots}</div>
                      <div style={{ aspectRatio: '16 / 10' }}><img src={src} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'clamp(28px,4vw,56px)', flexDirection: 'row-reverse' }}>
                <div style={{ flex: '1 1 320px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <h3 style={{ margin: 0, fontWeight: 600, fontSize: 19, color: '#fff' }}>Mobile first, since 70% of buyers are</h3>
                  <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.65, color: '#a7adb6' }}>Thumb-reach payment buttons, autofilled address lookup, and Apple Pay / Google Pay as the first option - not buried under a card form. The AI sizing assistant lives in a sheet, one tap away on every product.</p>
                </div>
                <div style={{ flex: '1 1 380px', display: 'flex', justifyContent: 'center', gap: 20, flexWrap: 'wrap' }}>
                  {detail.mobile.map(src => (
                    <div key={src} style={{ width: 'clamp(130px,16vw,170px)', borderRadius: 26, border: '1px solid rgba(255,255,255,.14)', background: 'rgba(255,255,255,.04)', padding: 8 }}>
                      <div style={{ aspectRatio: '9 / 19.5', borderRadius: 19, overflow: 'hidden' }}>
                        <img src={src} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <h3 style={{ margin: 0, fontWeight: 600, fontSize: 19, color: '#fff' }}>The full system</h3>
                <div style={{ borderRadius: 16, border: '1px solid rgba(0,229,255,.2)', overflow: 'hidden' }}>
                  <div style={{ aspectRatio: '21 / 9' }}><img src={detail.collage} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
                </div>
              </div>
            </div>
          </section>

          <section style={{ borderTop: '1px solid rgba(255,255,255,.07)', background: 'radial-gradient(ellipse 70% 100% at 50% 0%, rgba(0,229,255,.07), transparent)' }}>
            <div style={{ maxWidth: 860, margin: '0 auto', padding: 'clamp(56px,9vh,100px) clamp(20px,5vw,64px)', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 30, alignItems: 'center' }}>
              <span style={{ fontSize: 12, letterSpacing: '.12em', fontWeight: 600, color: '#6ee7f5' }}>THE RESULT</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'clamp(32px,6vw,72px)' }}>
                {c.resultStats.map(r => (
                  <div key={r.l}>
                    <div style={{ fontFamily: 'var(--font-grotesk)', fontWeight: 700, fontSize: 'clamp(40px,6vw,64px)', color: '#00e5ff', lineHeight: 1 }}>{r.v}</div>
                    <div style={{ fontSize: 13.5, color: '#8b9098', marginTop: 8 }}>{r.l}</div>
                  </div>
                ))}
              </div>
              <p style={{ margin: 0, maxWidth: 620, fontSize: 16, lineHeight: 1.7, color: '#b9bec6' }}>{c.resultBody}</p>
            </div>
          </section>
        </>
      )}

      <section style={{ borderTop: '1px solid rgba(255,255,255,.07)' }}>
        <div style={{ maxWidth: 1060, margin: '0 auto', padding: 'clamp(48px,7vh,80px) clamp(20px,5vw,64px)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 28 }}>
          <Link href={`/work/${next.slug}`} style={{ display: 'flex', flexDirection: 'column', gap: 6, color: 'inherit' }}>
            <span style={{ fontSize: 12, letterSpacing: '.1em', fontWeight: 600, color: '#6a7078' }}>NEXT PROJECT</span>
            <span style={{ fontFamily: 'var(--font-grotesk)', fontWeight: 700, fontSize: 'clamp(20px,2.6vw,28px)', color: '#fff' }}>{next.title} <span style={{ color: '#00e5ff' }}>-&gt;</span></span>
          </Link>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12 }}>
            <span style={{ fontSize: 15, color: '#a7adb6' }}>Have a similar problem?</span>
            <Link href="/contact" style={{ padding: '13px 26px', borderRadius: 10, background: '#00e5ff', color: '#06171a', fontWeight: 600, fontSize: 15, boxShadow: '0 0 26px rgba(0,229,255,.4)' }}>Book a Free Audit</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
