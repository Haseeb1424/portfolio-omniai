import { CONTACT } from '@/lib/site';

const FOUNDERS = [
  { photo: '/team/haseeb.png', name: 'Haseeb Ahmed', role: 'CO-FOUNDER & LEAD AI ENGINEER', bio: '5+ years building backend and AI systems - RAG pipelines, LLM integrations, and cloud infrastructure on AWS & GCP.' },
  { photo: '/team/danish.png', name: 'Danish', role: 'CO-FOUNDER & HEAD OF DESIGN & MARKETING', bio: 'Leads brand, UI/UX, and growth - turning attention into revenue through design and content.' },
  { photo: '/team/zeeshan.png', name: 'Zeeshan', role: 'CO-FOUNDER & LEAD FULL STACK ENGINEER', bio: 'Ships end-to-end products - from database architecture to polished frontend experiences.' },
];
const VALUES = ['Diagnose before we build', 'One team, all disciplines', 'Honest timelines', 'Measured results'];

export const metadata = { title: 'About - Team OmniAI' };

export default function AboutPage() {
  return (
    <main>
      <header style={{ padding: 'clamp(70px,11vh,120px) clamp(20px,5vw,64px) clamp(50px,8vh,90px)', textAlign: 'center' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
          <h1 style={{ margin: 0, fontWeight: 700, fontSize: 'clamp(34px,5.4vw,60px)', lineHeight: 1.08, letterSpacing: '-.025em', color: '#fff' }}>A team built <span style={{ color: '#00e5ff', textShadow: '0 0 32px rgba(0,229,255,.45)' }}>around your problem.</span></h1>
          <p style={{ margin: 0, maxWidth: 640, fontSize: 'clamp(16px,2vw,18px)', lineHeight: 1.7, color: '#a7adb6' }}>We&apos;re a cross-functional team of engineers, designers, and marketers based in Lahore, serving clients worldwide. Most agencies sell you what they build; we start the other way - diagnose first, build second. That&apos;s why every engagement begins with a free audit, and why our clients keep us around after launch.</p>
        </div>
      </header>
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(20px,5vw,64px) clamp(56px,8vh,90px)' }}>
        <h2 style={{ margin: '0 0 40px', fontWeight: 700, fontSize: 'clamp(26px,3.6vw,38px)', letterSpacing: '-.02em', color: '#fff', textAlign: 'center' }}>Meet the founders.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px,1fr))', gap: 22 }}>
          {FOUNDERS.map(f => (
            <div key={f.name} className="founder-card" style={{ padding: '34px 28px', borderRadius: 18, background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 14 }}>
              <span style={{ display: 'block', width: 128, height: 128, borderRadius: '50%', padding: 3, background: 'linear-gradient(135deg, rgba(0,229,255,.8), rgba(0,229,255,.15))', boxShadow: '0 0 34px rgba(0,229,255,.3)' }}>
                <img src={f.photo} alt={f.name} loading="lazy" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', display: 'block' }} />
              </span>
              <h3 style={{ margin: '8px 0 0', fontWeight: 700, fontSize: 21, color: '#fff' }}>{f.name}</h3>
              <span style={{ fontSize: 12.5, letterSpacing: '.08em', fontWeight: 600, color: '#6ee7f5' }}>{f.role}</span>
              <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: '#a7adb6' }}>{f.bio}</p>
              <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Team OmniAI on LinkedIn" title="Team OmniAI on LinkedIn" style={{ marginTop: 4, width: 38, height: 38, borderRadius: 8, border: '1px solid rgba(255,255,255,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#8b9098' }}>in</a>
            </div>
          ))}
        </div>
      </section>
      <section style={{ borderTop: '1px solid rgba(255,255,255,.07)', borderBottom: '1px solid rgba(255,255,255,.07)', background: 'linear-gradient(180deg, rgba(0,229,255,.03), transparent)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px clamp(20px,5vw,64px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 24 }}>
          {VALUES.map(v => (
            <div key={v} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#00e5ff', boxShadow: '0 0 12px rgba(0,229,255,.7)' }} />
              <span style={{ fontFamily: 'var(--font-grotesk)', fontWeight: 600, fontSize: 15.5, color: '#dfe2e6' }}>{v}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
