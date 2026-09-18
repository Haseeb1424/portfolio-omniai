'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV } from '@/lib/site';

export default function Nav() {
  const path = usePathname();
  const openAudit = (event) => {
    if (path !== '/') return;
    event.preventDefault();
    window.dispatchEvent(new CustomEvent('omniai:open-audit-modal'));
  };
  return (
    <nav className="site-nav" aria-label="Main navigation" style={{ position: 'sticky', top: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, padding: '14px clamp(20px, 5vw, 64px)', background: 'rgba(13,13,15,.72)', backdropFilter: 'blur(14px)', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <img src="/logo-primary.png" alt="Team OmniAI logo" style={{ display: 'block', height: 42, width: 'auto', maxWidth: 128, objectFit: 'contain', filter: 'drop-shadow(0 0 10px rgba(var(--accent-rgb),.28))' }} />
      </Link>
      <div className="site-nav-links" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(14px, 2.5vw, 28px)', fontSize: 14, fontWeight: 500 }}>
        {NAV.map((n) => (
          <Link key={n.href} href={n.href} aria-current={path === n.href ? 'page' : undefined} style={{ color: path === n.href ? '#fff' : '#b9bec6' }}>{n.label}</Link>
        ))}
        <Link href="/contact" onClick={openAudit} className="audit-button" style={{ padding: '9px 18px', borderRadius: 8, background: 'var(--accent)', color: '#06171a', fontWeight: 600, boxShadow: '0 0 18px rgba(var(--accent-rgb),.35)' }}>Free Audit</Link>
      </div>
    </nav>
  );
}
