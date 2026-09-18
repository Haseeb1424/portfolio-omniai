'use client';
import { useEffect, useState } from 'react';
import Reveal from './Reveal';

const STAGES = [
  {
    n: '01',
    title: 'Build',
    focus: 'idea',
    outcome: 'a shipped system',
    summary: 'We turn the strongest solution into a working website, AI agent, automation, or product sprint.',
    badge: 'Build sprint',
    points: ['Product architecture', 'AI and automation', 'Frontend and backend'],
    stats: [{ value: '7d', label: 'First slice' }, { value: '3x', label: 'Faster launch' }, { value: '1', label: 'Owner' }],
    sideTitle: 'From plan to product',
    sideCopy: 'Clean builds with clear handoff, tracking, and room to scale.',
    metric: 'Live',
    metricLabel: 'Shipped work',
    progress: '72%',
  },
  {
    n: '02',
    title: 'Understand',
    focus: 'signal',
    outcome: 'a clear decision',
    summary: 'We read the funnel, systems, user behavior, and bottlenecks before recommending what to fix.',
    badge: 'Problem map',
    points: ['Funnel diagnosis', 'User journey review', 'System audit'],
    stats: [{ value: '2-3', label: 'Hidden blockers' }, { value: '24h', label: 'Fast read' }, { value: '0', label: 'Guesswork' }],
    sideTitle: 'Find the real issue',
    sideCopy: 'Your next move is based on evidence, not a prettier hunch.',
    metric: 'Audit',
    metricLabel: 'Clarity first',
    progress: '58%',
  },
  {
    n: '03',
    title: 'Improve',
    focus: 'result',
    outcome: 'compounding growth',
    summary: 'We measure what changed, tighten the experience, and keep improving the parts that move revenue.',
    badge: 'Growth loop',
    points: ['Conversion testing', 'Performance tracking', 'Iteration roadmap'],
    stats: [{ value: '+38%', label: 'Conversion lift' }, { value: '30h', label: 'Time saved' }, { value: '4x', label: 'Faster replies' }],
    sideTitle: 'Make wins repeatable',
    sideCopy: 'Every release becomes a stronger baseline for the next one.',
    metric: 'Loop',
    metricLabel: 'Measured gains',
    progress: '86%',
  },
];

export default function ProcessShowcase() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % STAGES.length), 3400);
    return () => clearInterval(id);
  }, []);

  const current = STAGES[active];

  return (
    <section id="process" style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(78px,11vh,128px) clamp(20px,5vw,64px)', background: 'radial-gradient(ellipse 68% 86% at 78% 48%, rgba(1,251,255,.08), transparent 64%), #050607', borderTop: '1px solid rgba(1,251,255,.10)' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.028) 1px, transparent 1px)', backgroundSize: '72px 72px', opacity: .22 }} />
      <div className="process-layout" style={{ position: 'relative', zIndex: 1, maxWidth: 1160, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: 56, alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18, fontFamily: 'var(--font-grotesk)', fontSize: 12, fontWeight: 700, letterSpacing: 0, textTransform: 'uppercase', color: '#8e98a2' }}>
            <span style={{ color: '#01FBFF' }}>(04)</span>
            <span style={{ width: 42, height: 1, background: 'rgba(1,251,255,.44)' }} />
            <span>Process</span>
          </div>
          <h2 style={{ margin: 0, maxWidth: 520, fontFamily: 'var(--font-grotesk)', fontWeight: 700, fontSize: 48, lineHeight: 1.02, color: '#fff' }}>Bespoke systems, smart AI agents, and measurable growth loops.</h2>
          <p style={{ margin: '20px 0 0', maxWidth: 480, color: '#a7adb6', fontSize: 16.5, lineHeight: 1.68 }}>A focused loop for turning a business problem into a working product, then improving it with real data.</p>
          <div role="group" aria-label="Team OmniAI process" style={{ display: 'flex', flexDirection: 'column', gap: 0, marginTop: 42, maxWidth: 360 }}>
            {STAGES.map((s, i) => {
              const isActive = i === active;
              return (
                <button
                  key={s.n}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 16,
                    padding: '17px 0',
                    border: 'none',
                    borderTop: i === 0 ? '1px solid rgba(255,255,255,.12)' : '1px solid rgba(255,255,255,.08)',
                    borderBottom: i === STAGES.length - 1 ? '1px solid rgba(255,255,255,.08)' : 'none',
                    background: 'transparent',
                    color: isActive ? '#01FBFF' : 'rgba(255,255,255,.34)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontFamily: 'var(--font-grotesk)',
                    transition: 'color .2s ease, opacity .2s ease, transform .2s ease',
                    transform: isActive ? 'translateX(8px)' : 'none',
                  }}
                >
                  <span style={{ minWidth: 34, fontSize: 12, fontWeight: 700, letterSpacing: 0, color: isActive ? '#01FBFF' : 'rgba(255,255,255,.28)' }}>{s.n}</span>
                  <span style={{ fontSize: 32, lineHeight: 1, fontWeight: 700, color: isActive ? '#01FBFF' : 'rgba(255,255,255,.34)', textShadow: isActive ? '0 0 26px rgba(1,251,255,.30)' : 'none' }}>{s.title}</span>
                </button>
              );
            })}
          </div>
          <p style={{ margin: '22px 0 0', maxWidth: 380, minHeight: 52, color: '#dfe2e6', fontSize: 15, lineHeight: 1.6 }}>{current.summary}</p>
        </div>

        <Reveal>
          <div className="process-stage" style={{ position: 'relative', minHeight: 500 }}>
            <div style={{ position: 'relative', width: 'min(100%, 660px)', marginLeft: 'auto', borderRadius: 8, border: '1px solid rgba(255,255,255,.08)', background: 'linear-gradient(160deg, rgba(255,255,255,.055), rgba(255,255,255,.018)), #080a0c', boxShadow: '0 32px 90px rgba(0,0,0,.52), 0 0 72px rgba(1,251,255,.13)', overflow: 'hidden', animation: 'processMockupFloat 7s ease-in-out infinite' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 52% 62% at 55% 46%, rgba(1,251,255,.13), transparent 70%)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', top: 74, bottom: 58, width: '46%', background: 'linear-gradient(90deg, transparent, rgba(1,251,255,.20), transparent)', filter: 'blur(12px)', animation: 'processScan 3.4s ease-in-out infinite', pointerEvents: 'none' }} />
              <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 8, padding: '13px 16px', borderBottom: '1px solid rgba(255,255,255,.08)' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff6b4a' }} />
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ffd166' }} />
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#01FBFF' }} />
                <span style={{ marginLeft: 12, width: '42%', height: 8, borderRadius: 999, background: 'rgba(255,255,255,.08)' }} />
                <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-grotesk)', fontSize: 11, fontWeight: 700, letterSpacing: 0, color: '#01FBFF', textTransform: 'uppercase' }}>{current.badge}</span>
              </div>
              <div className="process-content" style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'minmax(170px, .85fr) minmax(240px, 1.2fr)', gap: 22, padding: 34 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <img src="/logo-mark.png" alt="" style={{ width: 74, height: 74, objectFit: 'contain', filter: 'drop-shadow(0 0 18px rgba(1,251,255,.45))' }} />
                  <div className="process-stats" style={{ display: 'grid', gap: 10 }}>
                    {current.stats.map((stat) => (
                      <div key={stat.label} style={{ padding: '12px 13px', borderRadius: 8, border: '1px solid rgba(255,255,255,.08)', background: 'rgba(0,0,0,.28)' }}>
                        <div style={{ fontFamily: 'var(--font-grotesk)', fontSize: 20, fontWeight: 700, color: '#01FBFF' }}>{stat.value}</div>
                        <div style={{ marginTop: 4, fontSize: 11, letterSpacing: 0, textTransform: 'uppercase', color: '#8e98a2' }}>{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 270 }}>
                  <p style={{ margin: '0 0 12px', fontFamily: 'var(--font-grotesk)', fontSize: 12, fontWeight: 700, letterSpacing: 0, textTransform: 'uppercase', color: '#8e98a2' }}>Team OmniAI / {current.title}</p>
                  <h3 style={{ margin: 0, maxWidth: 330, fontFamily: 'var(--font-grotesk)', fontWeight: 700, fontSize: 42, lineHeight: 1.02, color: '#fff' }}>Turn every <span style={{ color: '#01FBFF', textShadow: '0 0 26px rgba(1,251,255,.36)' }}>{current.focus}</span> into {current.outcome}.</h3>
                  <div style={{ height: 1, background: 'rgba(255,255,255,.09)', margin: '26px 0 16px' }} />
                  <div style={{ display: 'grid', gap: 10 }}>
                    {current.points.map((pt) => (
                      <div key={pt} style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#dfe2e6', fontSize: 13.5 }}>
                        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#01FBFF', boxShadow: '0 0 14px rgba(1,251,255,.58)', flexShrink: 0 }} />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 24, height: 8, borderRadius: 999, background: 'rgba(255,255,255,.08)', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: current.progress, borderRadius: 'inherit', background: 'linear-gradient(90deg, rgba(1,251,255,.18), #01FBFF)', boxShadow: '0 0 20px rgba(1,251,255,.35)', transformOrigin: 'left center', animation: 'processLineFill 3.4s ease-in-out infinite' }} />
                  </div>
                </div>
              </div>
            </div>
            <div className="process-side" style={{ position: 'absolute', right: -10, top: 82, width: 188, padding: 14, borderRadius: 8, border: '1px solid rgba(1,251,255,.24)', background: 'rgba(3,6,7,.88)', boxShadow: '0 18px 46px rgba(0,0,0,.38), 0 0 34px rgba(1,251,255,.12)', animation: 'processPanelPulse 3.4s ease-in-out infinite' }}>
              <div style={{ fontFamily: 'var(--font-grotesk)', fontSize: 11, fontWeight: 700, letterSpacing: 0, textTransform: 'uppercase', color: '#01FBFF' }}>{current.sideTitle}</div>
              <div style={{ marginTop: 8, color: '#dfe2e6', fontSize: 13, lineHeight: 1.45 }}>{current.sideCopy}</div>
            </div>
            <div className="process-metric" style={{ position: 'absolute', right: 28, bottom: 78, width: 150, padding: 12, borderRadius: 8, border: '1px solid rgba(255,255,255,.10)', background: 'rgba(255,255,255,.045)', backdropFilter: 'blur(10px)' }}>
              <div style={{ fontFamily: 'var(--font-grotesk)', fontSize: 22, fontWeight: 700, color: '#fff' }}>{current.metric}</div>
              <div style={{ marginTop: 5, fontSize: 11, letterSpacing: 0, textTransform: 'uppercase', color: '#8e98a2' }}>{current.metricLabel}</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
