import Link from 'next/link';
import { SERVICES } from '@/lib/site';

export const metadata = { title: 'Services - Team OmniAI' };

export default function ServicesPage() {
  return (
    <main>
      <header style={{ position: 'relative', padding: 'clamp(70px,11vh,120px) clamp(20px,5vw,64px) clamp(50px,8vh,90px)', textAlign: 'center' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
          <h1 style={{ margin: 0, fontWeight: 700, fontSize: 'clamp(34px,5.4vw,60px)', lineHeight: 1.08, letterSpacing: '-.025em', color: '#fff' }}>Solutions, <span style={{ color: '#00e5ff', textShadow: '0 0 32px rgba(0,229,255,.45)' }}>not just services.</span></h1>
          <p style={{ margin: 0, maxWidth: 580, fontSize: 'clamp(16px,2vw,18px)', lineHeight: 1.6, color: '#a7adb6' }}>Every service below exists to fix a specific kind of problem. Start with the problem - we&apos;ll bring the right tools.</p>
        </div>
      </header>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(20px,5vw,64px) clamp(70px,10vh,120px)', display: 'flex', flexDirection: 'column', gap: 'clamp(56px,8vh,96px)' }}>
        {SERVICES.map((s, i) => (
          <div key={s.n} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'clamp(28px,4vw,56px)', flexDirection: i % 2 ? 'row-reverse' : 'row' }}>
            <div style={{ flex: '1 1 300px', minHeight: 220, borderRadius: 18, background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 60%, rgba(0,229,255,.10), transparent 70%)' }} />
              <div style={{ position: 'relative', fontFamily: 'var(--font-grotesk)', fontWeight: 700, fontSize: 76, color: 'rgba(0,229,255,.5)', textShadow: '0 0 40px rgba(0,229,255,.35)' }}>{s.n}</div>
            </div>
            <div style={{ flex: '1 1 380px', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <span style={{ fontSize: 12, letterSpacing: '.12em', fontWeight: 600, color: '#6ee7f5' }}>{s.label}</span>
              <h2 style={{ margin: 0, fontWeight: 700, fontSize: 'clamp(24px,3vw,32px)', letterSpacing: '-.02em', color: '#fff' }}>{s.headline}</h2>
              <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.65, color: '#b9bec6' }}>{s.long}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {s.chips.map(c => <span key={c} style={{ padding: '5px 12px', borderRadius: 999, border: '1px solid rgba(0,229,255,.25)', background: 'rgba(0,229,255,.05)', fontSize: 12, fontWeight: 500, color: '#7df3ff' }}>{c}</span>)}
              </div>
              <Link href="/contact" style={{ alignSelf: 'flex-start', marginTop: 6, padding: '12px 24px', borderRadius: 10, border: '1px solid rgba(0,229,255,.45)', color: '#00e5ff', fontWeight: 600, fontSize: 14.5, background: 'rgba(0,229,255,.05)' }}>Discuss this problem -&gt;</Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
