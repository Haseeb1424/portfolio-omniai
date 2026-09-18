'use client';
import { useEffect, useRef, useState } from 'react';
import { CONTACT } from '@/lib/site';

export default function AuditModal() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [urlError, setUrlError] = useState(false);
  const inputRef = useRef(null);
  const timerRef = useRef(null);
  const openRef = useRef(false);

  const rememberDismissal = () => {
    try { sessionStorage.setItem('omniai-audit-modal-dismissed', '1'); } catch (err) {}
  };

  const show = (force = false) => {
    if (openRef.current) return;
    let dismissed = false;
    try { dismissed = sessionStorage.getItem('omniai-audit-modal-dismissed') === '1'; } catch (err) {}
    if (!force && dismissed) return;
    setSubmitted(false);
    setUrlError(false);
    openRef.current = true;
    setOpen(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const close = () => {
    rememberDismissal();
    openRef.current = false;
    setOpen(false);
    setUrlError(false);
  };

  useEffect(() => {
    timerRef.current = setTimeout(() => show(), 18000);
    const onExitIntent = (ev) => { if (ev.clientY <= 0) show(); };
    const onEscape = (ev) => { if (ev.key === 'Escape' && openRef.current) close(); };
    const onManualOpen = () => show(true);
    document.addEventListener('mouseleave', onExitIntent);
    window.addEventListener('keydown', onEscape);
    window.addEventListener('omniai:open-audit-modal', onManualOpen);
    return () => {
      clearTimeout(timerRef.current);
      document.removeEventListener('mouseleave', onExitIntent);
      window.removeEventListener('keydown', onEscape);
      window.removeEventListener('omniai:open-audit-modal', onManualOpen);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    openRef.current = open;
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [open]);

  const submit = (ev) => {
    ev.preventDefault();
    const raw = (inputRef.current?.value || '').trim();
    const normalized = /^https?:\/\//i.test(raw) ? raw : 'https://' + raw;
    let valid = false;
    try {
      const url = new URL(normalized);
      valid = url.hostname.includes('.') && url.hostname.length > 3;
    } catch (err) { valid = false; }
    if (!valid) { setUrlError(true); return; }
    try { sessionStorage.setItem('omniai-audit-website', raw); } catch (err) {}
    setUrlError(false);
    setSubmitted(true);
  };

  if (!open) return null;

  return (
    <div role="presentation" onClick={close} style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, background: 'rgba(0,0,0,.78)', backdropFilter: 'blur(12px)', animation: 'modalFadeIn .18s ease both' }}>
      <section role="dialog" aria-modal="true" aria-labelledby="audit-modal-title" onClick={(ev) => ev.stopPropagation()} style={{ position: 'relative', width: 'min(94vw, 670px)', borderRadius: 24, border: '1px solid rgba(1,251,255,.28)', background: 'radial-gradient(ellipse 80% 100% at 10% 0%, rgba(1,251,255,.12), transparent 54%), #020303', color: '#fff', fontFamily: 'var(--font-inter)', boxShadow: '0 42px 120px rgba(0,0,0,.7), 0 0 82px rgba(1,251,255,.20)', padding: 'clamp(28px, 4vw, 40px)', boxSizing: 'border-box', animation: 'modalLiftIn .24s ease both' }}>
        <button type="button" aria-label="Close audit modal" onClick={close} style={{ position: 'absolute', top: 20, right: 20, width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(255,255,255,.18)', background: 'transparent', color: '#a7adb6', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
        </button>

        <div style={{ maxWidth: 560 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <img src="/logo-mark.png" alt="" style={{ display: 'block', width: 26, height: 26, objectFit: 'contain', filter: 'drop-shadow(0 0 10px rgba(1,251,255,.50))' }} />
            <span style={{ display: 'block', fontFamily: 'var(--font-grotesk)', fontSize: 12, lineHeight: 1, fontWeight: 700, letterSpacing: '.12em', color: '#01FBFF', textTransform: 'uppercase' }}>Before you go</span>
          </div>
          <h2 id="audit-modal-title" style={{ margin: '0 52px 16px 0', fontFamily: 'var(--font-grotesk)', fontWeight: 700, fontSize: 'clamp(28px, 4.5vw, 38px)', lineHeight: 1.08, color: '#fff' }}>Want a free audit of your site first?</h2>
          <p style={{ margin: '0 0 30px', maxWidth: 580, color: '#b8bdc4', fontSize: 16, lineHeight: 1.55 }}>30 seconds, no call needed - we&apos;ll show you 2-3 things costing you leads right now.</p>
        </div>

        {!submitted ? (
          <>
            <form onSubmit={submit} noValidate style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ flex: '1 1 280px', minWidth: 0 }}>
                <input ref={inputRef} type="text" inputMode="url" placeholder="Enter your website to analyse..." aria-label="Website URL" style={{ width: '100%', boxSizing: 'border-box', minHeight: 58, padding: '0 22px', borderRadius: 999, border: `1px solid ${urlError ? 'rgba(255,140,107,.75)' : 'rgba(1,251,255,.22)'}`, background: 'rgba(0,0,0,.56)', color: '#fff', fontFamily: 'var(--font-inter)', fontSize: 15.5, outline: 'none' }} />
                {urlError && <p style={{ margin: '8px 0 0 18px', color: '#ff8c6b', fontSize: 12.5 }}>Enter a valid website first.</p>}
              </div>
              <button type="submit" style={{ flex: '0 0 auto', minHeight: 58, padding: '0 24px', borderRadius: 999, border: 'none', background: '#01FBFF', color: '#06171a', fontFamily: 'var(--font-grotesk)', fontWeight: 700, fontSize: 14, cursor: 'pointer', boxShadow: '0 16px 36px rgba(1,251,255,.34)' }}>Analyse&nbsp;-&gt;</button>
            </form>
            <button type="button" onClick={close} style={{ display: 'block', margin: '22px auto 0', padding: 0, border: 'none', background: 'transparent', color: '#8f949a', fontSize: 13, textDecoration: 'underline', cursor: 'pointer' }}>No thanks, just let me leave</button>
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 18, paddingTop: 4 }}>
            <p style={{ margin: 0, color: '#dfe2e6', fontSize: 16, lineHeight: 1.6 }}>Got it. We&apos;ll review the site and point you toward the next best fix.</p>
            <a href="/contact" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minHeight: 50, padding: '0 22px', borderRadius: 999, background: '#01FBFF', color: '#06171a', fontFamily: 'var(--font-grotesk)', fontWeight: 700, fontSize: 14, boxShadow: '0 0 26px rgba(1,251,255,.36)' }}>Continue to contact -&gt;</a>
          </div>
        )}
      </section>
    </div>
  );
}
