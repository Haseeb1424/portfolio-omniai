import Link from 'next/link';
import CaseCover from '@/components/CaseCover';
import { CASES } from '@/lib/site';

export const metadata = { title: 'Work - Team OmniAI' };

export default function WorkPage() {
  return (
    <main>
      <header style={{ padding: 'clamp(70px,11vh,120px) clamp(20px,5vw,64px) clamp(50px,8vh,90px)', textAlign: 'center' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
          <h1 style={{ margin: 0, fontWeight: 700, fontSize: 'clamp(34px,5.4vw,60px)', lineHeight: 1.08, letterSpacing: '-.025em', color: '#fff' }}>Problems <span style={{ color: '#00e5ff', textShadow: '0 0 32px rgba(0,229,255,.45)' }}>we&apos;ve solved.</span></h1>
          <p style={{ margin: 0, maxWidth: 580, fontSize: 'clamp(16px,2vw,18px)', lineHeight: 1.6, color: '#a7adb6' }}>Every project starts as a diagnosis. Here&apos;s what happened after.</p>
        </div>
      </header>
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 clamp(20px,5vw,64px) clamp(70px,10vh,120px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(440px,100%), 1fr))', gap: 28 }}>
        {CASES.map(c => (
          <Link key={c.slug} className="work-card" href={`/work/${c.slug}`} style={{ display: 'flex', flexDirection: 'column', borderRadius: 18, background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', overflow: 'hidden', color: 'inherit' }}>
            <div style={{ aspectRatio: '16 / 10', background: 'linear-gradient(160deg,rgba(0,229,255,.06),rgba(255,255,255,.02))' }}>
              <CaseCover caseStudy={c} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '24px 26px 26px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                <span style={{ padding: '4px 12px', borderRadius: 999, border: '1px solid rgba(255,255,255,.14)', fontSize: 11, letterSpacing: '.08em', fontWeight: 600, color: '#9aa0a8' }}>{c.industry}</span>
                <span style={{ fontFamily: 'var(--font-grotesk)', fontWeight: 700, fontSize: 22, color: '#00e5ff' }}>{c.metric}</span>
              </div>
              <h2 style={{ margin: 0, fontWeight: 700, fontSize: 22, color: '#fff' }}>{c.title}</h2>
              <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.55, color: '#a7adb6' }}>{c.problem}</p>
              <span style={{ marginTop: 6, fontSize: 13.5, fontWeight: 600, color: '#6ee7f5' }}>View case study -&gt;</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
