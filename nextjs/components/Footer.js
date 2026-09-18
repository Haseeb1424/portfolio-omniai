import Link from 'next/link';
import { CONTACT, NAV } from '@/lib/site';

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,.07)', padding: '44px clamp(20px, 5vw, 64px)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 24, maxWidth: 1160, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <img src="/logo-primary.png" alt="Team OmniAI logo" style={{ display: 'block', height: 34, width: 'auto', maxWidth: 104, objectFit: 'contain', filter: 'drop-shadow(0 0 8px rgba(var(--accent-rgb),.24))' }} />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, fontSize: 13.5 }}>
        {NAV.slice(1).map((n) => <Link key={n.href} href={n.href} style={{ color: '#8b9098' }}>{n.label}</Link>)}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13.5, color: '#8b9098', textAlign: 'right' }}>
        <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'flex-end' }}>
          <a href={CONTACT.linkedin} target="_blank" rel="noopener" style={{ color: '#8b9098' }}>LinkedIn</a>
          <a href={CONTACT.instagram} target="_blank" rel="noopener" style={{ color: '#8b9098' }}>Instagram</a>
          <a href={CONTACT.upwork} target="_blank" rel="noopener" style={{ color: '#8b9098' }}>Upwork</a>
        </div>
        <span>{CONTACT.location}</span>
      </div>
    </footer>
  );
}
