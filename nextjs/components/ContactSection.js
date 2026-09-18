'use client';
import { useState } from 'react';
import { CONTACT } from '@/lib/site';

const INTERESTS = ['AI & Automation','Web Development','App from Scratch','UI/UX Design','Data Engineering','Digital Marketing','Not Sure - Diagnose It'];
const BUDGETS = ['<=$2K','$2K-$5K','$5K-$15K','$15K-$50K','>$50K'];

const pill = (on) => ({ padding: '13px 24px', borderRadius: 999, border: `1px solid ${on ? '#00e5ff' : 'rgba(255,255,255,.18)'}`, background: on ? '#00e5ff' : 'transparent', color: on ? '#06171a' : '#c8ccd2', fontSize: 14.5, fontWeight: 600, cursor: 'pointer', transition: 'all .18s ease' });
const line = { width: '100%', padding: '10px 2px', border: 'none', borderBottom: '1px solid rgba(255,255,255,.18)', background: 'transparent', color: '#fff', fontSize: 16, outline: 'none', borderRadius: 0 };
const label = { display: 'block', fontSize: 15, fontWeight: 600, color: '#dfe2e6', marginBottom: 14 };

const SOCIALS = [
  { label: 'LinkedIn', href: CONTACT.linkedin, path: 'M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.05c.53-1 1.83-2.2 3.77-2.2 4.03 0 4.78 2.65 4.78 6.1V24h-4v-8.5c0-2.03-.04-4.64-2.83-4.64-2.83 0-3.27 2.2-3.27 4.5V24H8V8z' },
  { label: 'Instagram', href: CONTACT.instagram, path: 'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5.8a4.2 4.2 0 1 0 0 8.4 4.2 4.2 0 0 0 0-8.4zm0 2a2.2 2.2 0 1 1 0 4.4 2.2 2.2 0 0 1 0-4.4zM17.5 5.4a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2z' },
  { label: 'Upwork', href: CONTACT.upwork, path: 'M18.5 8.2c-1.7 0-3 1.1-3.6 2.9-.9-1.4-1.6-3-2-4.4H10v5.4c0 1.3-1.1 2.4-2.4 2.4S5.2 13.4 5.2 12.1V6.7H2.3v5.4c0 2.9 2.4 5.3 5.3 5.3s5.3-2.4 5.3-5.3v-.9c.4.8.9 1.7 1.4 2.5l-1.3 6.1h3l.9-4.4c.8.5 1.7.8 2.6.8 2.6 0 4.7-2.1 4.7-4.8s-2.1-5.2-4.7-5.2zm0 7.1c-.8 0-1.6-.3-2.3-.9l.3-1.2v-.1c.2-1.2.8-2.1 2-2.1s2 .9 2 2.1-1 2.2-2 2.2z' },
];

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', problem: '' });
  const [interests, setInterests] = useState([]);
  const [budget, setBudget] = useState(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const submit = async (e) => {
    e.preventDefault();
    const err = {};
    if (!form.name.trim()) err.name = true;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) err.email = true;
    setErrors(err);
    if (Object.keys(err).length) return;
    setStatus('sending');
    try {
      const base = process.env.NEXT_PUBLIC_API_URL || '';
      const res = await fetch(`${base}/api/contact`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, interests, budget }),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('sent');
    } catch { setStatus('error'); }
  };

  if (status === 'sent') return (
    <div style={{ maxWidth: 1240, margin: '0 auto', padding: 'clamp(56px, 9vh, 110px) clamp(20px, 5vw, 64px)' }}>
      <div style={{ padding: 'clamp(40px,7vh,70px) clamp(28px,4vw,56px)', borderRadius: 20, border: '1px solid rgba(0,229,255,.35)', background: 'rgba(0,229,255,.05)', textAlign: 'center' }}>
        <h2 style={{ margin: 0, fontWeight: 700, fontSize: 'clamp(24px,3vw,32px)', color: '#fff' }}>Got it. We&apos;ll reply within 24 hours.</h2>
        <p style={{ margin: '14px 0 0', color: '#a7adb6', fontSize: 15.5 }}>Keep an eye on your inbox - a real person will follow up with times for your free audit call.</p>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 1240, margin: '0 auto', padding: 'clamp(56px, 9vh, 110px) clamp(20px, 5vw, 64px)', display: 'flex', flexWrap: 'wrap', gap: 'clamp(40px, 6vw, 90px)', alignItems: 'flex-start' }}>
      <div style={{ flex: '1 1 300px', maxWidth: 420, display: 'flex', flexDirection: 'column', gap: 'clamp(40px, 6vh, 60px)' }}>
        <div>
          <h1 style={{ margin: 0, fontWeight: 700, fontSize: 'clamp(36px,4.6vw,54px)', lineHeight: 1.12, letterSpacing: '-.025em', color: '#fff' }}>
            Have <img src="/team/haseeb.png" alt="" style={{ display: 'inline-block', width: '.95em', height: '.95em', borderRadius: '50%', objectFit: 'cover', verticalAlign: '-.14em', margin: '0 .06em', boxShadow: '0 0 0 2px rgba(0,229,255,.6), 0 0 20px rgba(0,229,255,.35)' }} /> a problem?
          </h1>
          <div style={{ fontFamily: 'var(--font-grotesk)', fontWeight: 400, fontSize: 'clamp(36px,4.6vw,54px)', lineHeight: 1.12, letterSpacing: '-.025em', color: '#9aa0a8' }}>Tell us about it.</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <h2 style={{ margin: 0, fontWeight: 600, fontSize: 19, color: '#8b9098' }}>Clients trust us</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ display: 'block', width: 44, height: 44, borderRadius: '50%', overflow: 'visible', border: '1px solid rgba(0,229,255,.35)', flexShrink: 0, padding: 4, boxSizing: 'border-box' }}>
              <img src="/logo-mark.png" alt="Team OmniAI" style={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain' }} />
            </span>
            <div>
              <div style={{ display: 'flex', gap: 3 }}>
                {[1,2,3,4,5].map(i => <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#00e5ff"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>)}
              </div>
              <div style={{ fontSize: 13.5, color: '#a7adb6', marginTop: 4 }}>Rating 5, 24 reviews</div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h2 style={{ margin: 0, fontWeight: 600, fontSize: 19, color: '#8b9098' }}>Follow us:</h2>
          <div style={{ display: 'flex', gap: 12 }}>
            {SOCIALS.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener" aria-label={s.label} style={{ width: 48, height: 48, borderRadius: '50%', border: '1px solid rgba(255,255,255,.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#b9bec6' }}>
                <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor"><path d={s.path} /></svg>
              </a>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h2 style={{ margin: 0, fontWeight: 600, fontSize: 19, color: '#8b9098' }}>Contact us</h2>
          <a href={`mailto:${CONTACT.email}`} style={{ fontSize: 17, fontWeight: 500, color: '#e8eaed', textDecoration: 'underline', textUnderlineOffset: 5, alignSelf: 'flex-start' }}>{CONTACT.email}</a>
          <a href={CONTACT.whatsapp} target="_blank" rel="noopener" style={{ fontSize: 15, color: '#a7adb6' }}>WhatsApp: {CONTACT.phone}</a>
        </div>
      </div>

      <div style={{ flex: '2 1 480px', minWidth: 0 }}>
        <form onSubmit={submit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(34px, 5vh, 46px)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 32 }}>
            <div>
              <label htmlFor="contact-name" style={label}>Name &amp; Company</label>
              <input id="contact-name" autoComplete="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="John from Apple" style={line} />
              {errors.name && <div style={{ fontSize: 12.5, color: '#ff7a8a', marginTop: 8 }}>Please tell us your name.</div>}
            </div>
            <div>
              <label htmlFor="contact-email" style={label}>Your Email</label>
              <input id="contact-email" autoComplete="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} type="email" placeholder="john@apple.com" style={line} />
              {errors.email && <div style={{ fontSize: 12.5, color: '#ff7a8a', marginTop: 8 }}>That email doesn&apos;t look right.</div>}
            </div>
          </div>
          <div>
            <label style={{ ...label, marginBottom: 16 }}>I&apos;m interested in...</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {INTERESTS.map(i => <button type="button" key={i} onClick={() => setInterests(s => s.includes(i) ? s.filter(x => x !== i) : [...s, i])} style={pill(interests.includes(i))}>{i}</button>)}
            </div>
          </div>
          <div>
            <label style={{ ...label, marginBottom: 16 }}>Project budget (USD)</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {BUDGETS.map(b => <button type="button" key={b} onClick={() => setBudget(budget === b ? null : b)} style={pill(budget === b)}>{b}</button>)}
            </div>
          </div>
          <div>
            <label htmlFor="contact-problem" style={label}>Tell us more about your problem</label>
            <textarea id="contact-problem" value={form.problem} onChange={e => setForm({ ...form, problem: e.target.value })} rows={2} placeholder="What's blocking your business right now?" style={{ ...line, resize: 'vertical', lineHeight: 1.6 }} />
          </div>
          {status === 'error' && <div style={{ fontSize: 14, color: '#ff7a8a' }}>Something went wrong. Email us directly at {CONTACT.email}.</div>}
          <button type="submit" disabled={status === 'sending'} style={{ alignSelf: 'flex-start', padding: '20px 44px', borderRadius: 999, border: 'none', background: '#00e5ff', color: '#06171a', fontSize: 17, fontWeight: 700, fontFamily: 'var(--font-grotesk)', cursor: 'pointer', boxShadow: '0 0 34px rgba(0,229,255,.4)', opacity: status === 'sending' ? .6 : 1 }}>
            {status === 'sending' ? 'Sending...' : <>Submit <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: 400 }}>the</span> request</>}
          </button>
        </form>
      </div>
    </div>
  );
}
