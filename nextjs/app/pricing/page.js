'use client';
import { useState } from 'react';
import Link from 'next/link';

const TIERS = [
  { name: 'Fix', popular: false, desc: "For a single, well-defined problem - a landing page that won't convert, one automation, one integration.", price: 'Starting at $2,500', note: 'One-time project pricing', items: ['One clearly scoped problem', 'Fixed price, fixed timeline', 'Senior engineer or designer on the work', 'Handover docs included', '30 days of post-launch support'], cta: 'Start with a Fix' },
  { name: 'Build', popular: true, desc: 'A full product or system build - web app, AI system, e-commerce platform - scoped after your free audit.', price: 'Custom quote', note: 'Scoped after the free audit', items: ['Full diagnosis before we build', 'Cross-functional team: AI, dev, design', 'Weekly demos, no surprises', 'Launch support and training', 'You own all code and assets'], cta: 'Book the Free Audit' },
  { name: 'Grow', popular: false, desc: 'An ongoing partnership - continuous development, marketing, and optimization as your embedded team.', price: 'Monthly retainer', note: 'From $4,000/month, cancel anytime', items: ['Dedicated team hours each month', 'Development + marketing in one retainer', 'Monthly reporting against your goals', 'Priority response times', 'Quarterly strategy reviews'], cta: 'Talk About Growth' },
];

const FAQS = [
  { q: 'How do you scope projects?', a: 'Every project starts with the free audit call, then a short paid or free diagnosis depending on complexity. You get a written scope with deliverables, timeline, and a fixed price before any build work starts - no open-ended hourly billing.' },
  { q: "What if I don't know what I need?", a: "That's the most common starting point, and exactly what the audit is for. Describe the symptom - 'sales are flat', 'ops are chaos' - and we'll identify the likely causes and what we'd investigate first. You leave the call with clarity even if you never hire us." },
  { q: 'Do you work with our existing team?', a: 'Yes. We regularly embed alongside in-house developers, designers, and marketers - filling gaps rather than replacing people. We document everything so your team owns the result.' },
  { q: "What's the audit call?", a: "A free 20-minute video call where you describe the problem and we tell you honestly what we'd look at, what it might cost, and whether we're the right fit. No slides, no pitch deck, no obligation." },
];

export default function PricingPage() {
  const [open, setOpen] = useState(0);
  return (
    <main>
      <header style={{ padding: 'clamp(70px,11vh,120px) clamp(20px,5vw,64px) clamp(50px,8vh,90px)', textAlign: 'center' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
          <h1 style={{ margin: 0, fontWeight: 700, fontSize: 'clamp(34px,5.4vw,60px)', lineHeight: 1.08, letterSpacing: '-.025em', color: '#fff' }}>Pricing that matches <span style={{ color: '#00e5ff', textShadow: '0 0 32px rgba(0,229,255,.45)' }}>the problem.</span></h1>
          <p style={{ margin: 0, maxWidth: 580, fontSize: 'clamp(16px,2vw,18px)', lineHeight: 1.6, color: '#a7adb6' }}>One-off fix, full build, or ongoing partner - you pay for the size of the problem, not the size of the agency.</p>
        </div>
      </header>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(20px,5vw,64px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px,1fr))', gap: 22 }}>
        {TIERS.map(t => (
          <div key={t.name} style={{ position: 'relative', padding: '34px 30px', borderRadius: 18, background: 'rgba(255,255,255,.03)', border: `1px solid ${t.popular ? 'rgba(0,229,255,.55)' : 'rgba(255,255,255,.09)'}`, boxShadow: t.popular ? '0 0 40px rgba(0,229,255,.15)' : 'none', display: 'flex', flexDirection: 'column', gap: 18 }}>
            {t.popular && <span style={{ position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)', padding: '5px 16px', borderRadius: 999, background: '#00e5ff', color: '#06171a', fontSize: 12, fontWeight: 700, letterSpacing: '.05em' }}>MOST POPULAR</span>}
            <h2 style={{ margin: 0, fontWeight: 700, fontSize: 26, color: '#fff' }}>{t.name}</h2>
            <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: '#a7adb6', minHeight: 46 }}>{t.desc}</p>
            <div>
              <div style={{ fontFamily: 'var(--font-grotesk)', fontWeight: 700, fontSize: 30, color: '#00e5ff' }}>{t.price}</div>
              <div style={{ fontSize: 13, color: '#6a7078', marginTop: 2 }}>{t.note}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11, flex: 1 }}>
              {t.items.map(i => (
                <div key={i} style={{ display: 'flex', gap: 10, fontSize: 14.5, lineHeight: 1.5, color: '#c8ccd2' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="2.4" style={{ flexShrink: 0, marginTop: 3 }}><path d="M20 6L9 17l-5-5" /></svg>
                  <span>{i}</span>
                </div>
              ))}
            </div>
            <Link href="/contact" style={{ textAlign: 'center', padding: '13px 24px', borderRadius: 10, fontWeight: 600, fontSize: 15, background: t.popular ? '#00e5ff' : 'rgba(0,229,255,.05)', color: t.popular ? '#06171a' : '#00e5ff', border: `1px solid ${t.popular ? 'transparent' : 'rgba(0,229,255,.45)'}` }}>{t.cta}</Link>
          </div>
        ))}
      </div>
      <section style={{ maxWidth: 760, margin: '0 auto', padding: 'clamp(64px,9vh,100px) clamp(20px,5vw,64px) clamp(70px,10vh,110px)' }}>
        <h2 style={{ margin: '0 0 30px', fontWeight: 700, fontSize: 'clamp(24px,3.4vw,34px)', letterSpacing: '-.02em', color: '#fff', textAlign: 'center' }}>Questions people ask.</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {FAQS.map((f, i) => (
            <div key={f.q} style={{ border: '1px solid rgba(255,255,255,.08)', borderRadius: 14, background: 'rgba(255,255,255,.02)', overflow: 'hidden' }}>
              <button aria-expanded={open === i} aria-controls={`faq-${i}`} onClick={() => setOpen(open === i ? -1 : i)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', gap: 16, padding: '18px 22px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--font-grotesk)', fontWeight: 600, fontSize: 16, color: '#fff' }}>
                <span>{f.q}</span><span style={{ color: '#00e5ff', fontSize: 20 }}>{open === i ? '-' : '+'}</span>
              </button>
              {open === i && <p id={`faq-${i}`} style={{ margin: 0, padding: '0 22px 20px', fontSize: 14.5, lineHeight: 1.65, color: '#a7adb6' }}>{f.a}</p>}
            </div>
          ))}
        </div>
        <p style={{ margin: '34px 0 0', textAlign: 'center', fontSize: 15, color: '#7df3ff' }}>Every engagement starts with a free 20-minute problem audit - no commitment.</p>
      </section>
    </main>
  );
}
