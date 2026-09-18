import { CONTACT } from '@/lib/site';

export default function FloatingActions() {
  const circle = { width: 52, height: 52, borderRadius: '50%', background: 'rgba(13,13,15,.85)', border: '1px solid rgba(0,229,255,.4)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00e5ff', boxShadow: '0 4px 24px rgba(0,0,0,.5)', animation: 'floatIn .5s ease .1s backwards' };
  return (
    <div style={{ position: 'fixed', right: 22, bottom: 22, zIndex: 60, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>
      <a href={CONTACT.whatsapp} target="_blank" rel="noopener" aria-label="WhatsApp" style={circle}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.7.8-.8 1-.1.2-.3.2-.6.1-.3-.1-1.1-.4-2-1.2-.8-.7-1.3-1.5-1.4-1.8-.1-.3 0-.4.1-.5l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2 0 1.3.9 2.6 1.1 2.7.1.2 1.9 2.9 4.6 4 .6.3 1.1.4 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.6-.4z" /></svg>
      </a>
      <a href={CONTACT.calendly} target="_blank" rel="noopener" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '13px 22px', borderRadius: 999, background: '#00e5ff', color: '#06171a', fontSize: 14, fontWeight: 700, boxShadow: '0 0 26px rgba(0,229,255,.4)', animation: 'floatIn .5s ease .22s backwards' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
        Book a call
      </a>
    </div>
  );
}
