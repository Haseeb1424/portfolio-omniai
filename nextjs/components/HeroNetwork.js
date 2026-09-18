'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';

const PARTICLE_DENSITY = 55;

export default function HeroNetwork({ onAuditClick }) {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const copyRef = useRef(null);
  const scrollCueRef = useRef(null);

  const openAudit = (ev) => {
    if (onAuditClick) {
      onAuditClick(ev);
      return;
    }
    ev.preventDefault();
    window.dispatchEvent(new CustomEvent('omniai:open-audit-modal'));
  };

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    const brand = { r: 1, g: 251, b: 255 };
    const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
    const ease = (t) => t * t * (3 - 2 * t);
    const pointer = { x: 0, y: 0, active: false };
    let w = 1, h = 1, dpr = 1, ambient = [], logo = [], links = [];
    let progress = 0, camera = 1, raf = 0, started = false;

    const seedAmbient = () => {
      const count = Math.round(clamp(PARTICLE_DENSITY * 2.3, 90, 240));
      ambient = Array.from({ length: count }, () => ({
        x: Math.random(),
        y: Math.random(),
        z: .2 + Math.random() * 1.8,
        r: .45 + Math.random() * 2.1,
        drift: Math.random() * Math.PI * 2,
        cyan: Math.random() > .58,
      }));
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = c.width = Math.max(1, Math.floor((c.offsetWidth || innerWidth) * dpr));
      h = c.height = Math.max(1, Math.floor((c.offsetHeight || innerHeight) * dpr));
      seedAmbient();
      for (const p of logo) {
        if (!Number.isFinite(p.x)) { p.x = Math.random() * w; p.y = Math.random() * h; }
      }
    };

    const makeLogoParticle = (pt) => ({
      tx: pt.tx,
      ty: pt.ty,
      x: Math.random() * w,
      y: Math.random() * h,
      vx: 0,
      vy: 0,
      r: .65 + Math.random() * 1.35,
      phase: Math.random() * Math.PI * 2,
      bright: pt.bright,
    });

    const buildLinks = () => {
      links = [];
      const sample = logo.filter((_, i) => i % 4 === 0);
      for (let i = 0; i < sample.length; i++) {
        for (let j = i + 1; j < sample.length; j++) {
          const dx = sample[i].tx - sample[j].tx;
          const dy = sample[i].ty - sample[j].ty;
          const dist = Math.hypot(dx, dy);
          if (dist < .07 && Math.random() > .34) links.push([sample[i], sample[j], dist]);
        }
      }
    };

    const fallbackLogo = () => {
      const pts = [];
      for (let i = 0; i < 920; i++) {
        const a = Math.random() * Math.PI * 2;
        const ring = Math.random() > .45 ? .39 + Math.random() * .08 : .28 + Math.random() * .03;
        pts.push({ tx: Math.cos(a) * ring, ty: Math.sin(a) * ring, bright: Math.random() });
      }
      logo = pts.map(makeLogoParticle);
      buildLinks();
    };

    const loadLogo = () => {
      const img = new Image();
      img.onload = () => {
        const size = 220;
        const off = document.createElement('canvas');
        off.width = size;
        off.height = size;
        const ox = off.getContext('2d', { willReadFrequently: true });
        ox.clearRect(0, 0, size, size);
        ox.drawImage(img, 0, 0, size, size);
        const data = ox.getImageData(0, 0, size, size).data;
        const candidates = [];
        for (let y = 2; y < size - 2; y += 2) {
          for (let x = 2; x < size - 2; x += 2) {
            const idx = (y * size + x) * 4;
            const a = data[idx + 3];
            const r = data[idx], g = data[idx + 1], b = data[idx + 2];
            if (a > 46 && (g + b) > 130) {
              candidates.push({
                tx: (x / size) - .5 + (Math.random() - .5) * .006,
                ty: (y / size) - .5 + (Math.random() - .5) * .006,
                bright: clamp((g + b - r) / 510, .35, 1),
              });
            }
          }
        }
        if (!candidates.length) { fallbackLogo(); return; }
        for (let i = candidates.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
        }
        const count = Math.round(clamp(PARTICLE_DENSITY * 18, 720, 1280));
        logo = candidates.slice(0, Math.min(count, candidates.length)).map(makeLogoParticle);
        buildLinks();
      };
      img.onerror = fallbackLogo;
      img.src = '/logo-mark.png';
    };

    const updateScroll = () => {
      const sec = sectionRef.current;
      if (!sec) { progress = 0; return; }
      const rect = sec.getBoundingClientRect();
      const total = Math.max(1, sec.offsetHeight - innerHeight);
      progress = clamp(-rect.top / total, 0, 1);
      const fade = clamp(1 - progress * 1.75, 0, 1);
      if (copyRef.current) {
        copyRef.current.style.opacity = fade;
        copyRef.current.style.transform = 'translateY(' + (-progress * 40) + 'px) scale(' + (1 - progress * .05) + ')';
      }
      if (scrollCueRef.current) scrollCueRef.current.style.opacity = String(clamp(1 - progress * 4, 0, 1));
    };

    const movePointer = (ev) => {
      const rect = c.getBoundingClientRect();
      pointer.x = (ev.clientX - rect.left) * dpr;
      pointer.y = (ev.clientY - rect.top) * dpr;
      pointer.active = true;
    };
    const leavePointer = () => { pointer.active = false; };

    const drawDot = (x, y, r, color, alpha) => {
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    };

    const tick = (now) => {
      if (!c.isConnected) return;
      updateScroll();
      const t = now * .001;
      const eased = ease(progress);
      camera += ((.82 + eased * 2.55) - camera) * .08;

      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#060708';
      ctx.fillRect(0, 0, w, h);

      const grd = ctx.createRadialGradient(w / 2, h * .48, 0, w / 2, h * .48, Math.max(w, h) * .62);
      grd.addColorStop(0, 'rgba(1,251,255,.09)');
      grd.addColorStop(.42, 'rgba(1,251,255,.025)');
      grd.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = 'lighter';
      for (const a of ambient) {
        const parallax = 1 + eased * a.z * .42;
        const x = w / 2 + (a.x - .5) * w * parallax + Math.sin(t * .22 + a.drift) * 18 * dpr;
        const y = h / 2 + (a.y - .5) * h * parallax + Math.cos(t * .2 + a.drift) * 16 * dpr;
        const alpha = (.12 + a.z * .06) * (1 - eased * .18);
        const color = a.cyan ? 'rgb(1,251,255)' : 'rgb(235,246,248)';
        drawDot(x, y, a.r * dpr * (1 + eased * 1.35), color, alpha);
      }

      const size = Math.min(w, h) * (w < 760 * dpr ? .82 : .58) * camera;
      const cx = w / 2;
      const cy = h * (.50 + eased * .02);
      const repelRadius = Math.max(86, Math.min(w, h) * .12) * dpr;

      for (const p of logo) {
        const wave = Math.sin(t * 1.15 + p.phase) * 7 * dpr * (1 - eased * .18);
        const tx = cx + p.tx * size;
        const ty = cy + p.ty * size + wave;
        p.vx += (tx - p.x) * .018;
        p.vy += (ty - p.y) * .018;
        if (pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const d = Math.hypot(dx, dy) || 1;
          if (d < repelRadius) {
            const force = (1 - d / repelRadius) * 2.8;
            p.vx += (dx / d) * force * dpr;
            p.vy += (dy / d) * force * dpr;
          }
        }
        p.vx *= .86;
        p.vy *= .86;
        p.x += p.vx;
        p.y += p.vy;
      }

      ctx.lineWidth = .75 * dpr;
      for (const [a, b, dist] of links) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d = Math.hypot(dx, dy);
        const max = Math.max(26 * dpr, size * (.035 + dist * .4));
        if (d < max) {
          ctx.strokeStyle = 'rgba(1,251,255,' + (.04 + (1 - d / max) * .16) + ')';
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const p of logo) {
        const alpha = .42 + p.bright * .42;
        const radius = (p.r + eased * .75) * dpr;
        drawDot(p.x, p.y, radius * 2.7, 'rgb(' + brand.r + ',' + brand.g + ',' + brand.b + ')', alpha * .08);
        drawDot(p.x, p.y, radius, p.bright > .83 ? 'rgb(244,255,255)' : 'rgb(1,251,255)', alpha);
      }

      if (pointer.active) {
        ctx.globalAlpha = .7;
        ctx.strokeStyle = 'rgba(1,251,255,.55)';
        ctx.lineWidth = 1 * dpr;
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, repelRadius * .22, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };

    resize();
    updateScroll();
    loadLogo();
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', updateScroll, { passive: true });
    c.addEventListener('pointermove', movePointer);
    c.addEventListener('pointerleave', leavePointer);
    c.addEventListener('pointerdown', movePointer);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', updateScroll);
      c.removeEventListener('pointermove', movePointer);
      c.removeEventListener('pointerleave', leavePointer);
      c.removeEventListener('pointerdown', movePointer);
    };
  }, []);

  return (
    <header ref={sectionRef} style={{ position: 'relative', minHeight: '220vh', background: 'radial-gradient(ellipse 80% 70% at 50% 42%, rgba(1,251,255,.08), transparent 58%), #060708', overflow: 'clip' }}>
      <div style={{ position: 'sticky', top: 0, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(70px,10vh,104px) clamp(20px,5vw,64px) clamp(44px,7vh,74px)', boxSizing: 'border-box', overflow: 'hidden' }}>
        <canvas ref={canvasRef} role="img" aria-label="Interactive Team OmniAI node logo" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', cursor: 'crosshair' }} />
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 90% 75% at 50% 45%, transparent 34%, rgba(6,7,8,.68) 78%), linear-gradient(180deg, rgba(6,7,8,.35), rgba(6,7,8,0) 40%, rgba(6,7,8,.38))' }} />
        <div ref={copyRef} style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 1280, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', pointerEvents: 'none', transition: 'opacity .16s linear, transform .16s linear' }}>
          <div className="hero-kicker" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 'clamp(28px,7vh,78px)', fontFamily: 'var(--font-grotesk)', fontSize: 12, fontWeight: 700, letterSpacing: 0, color: 'rgba(255,255,255,.78)', textTransform: 'uppercase' }}>
            <span style={{ width: 38, height: 1, background: 'rgba(1,251,255,.65)', boxShadow: '0 0 18px rgba(1,251,255,.42)' }} />
            <span>AI &middot; Engineering &middot; Design &middot; Marketing</span>
            <span style={{ width: 38, height: 1, background: 'rgba(1,251,255,.65)', boxShadow: '0 0 18px rgba(1,251,255,.42)' }} />
          </div>
          <h1 className="hero-title" style={{ margin: 0, width: '100%', fontFamily: 'var(--font-grotesk)', fontWeight: 700, lineHeight: .86, letterSpacing: 0, color: 'rgba(255,255,255,.58)', textTransform: 'uppercase', mixBlendMode: 'screen' }}>Team OmniAI</h1>
          <p className="hero-subtitle" style={{ margin: 'clamp(18px,3vw,28px) 0 0', maxWidth: 760, lineHeight: 1.16, fontFamily: 'var(--font-grotesk)', fontWeight: 700, color: '#fff' }}>Stuck? We find the problem. Then we <span style={{ color: '#01FBFF', textShadow: '0 0 34px rgba(1,251,255,.46)' }}>build the fix.</span></p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14, marginTop: 30, pointerEvents: 'auto' }}>
            <a href="/contact" className="audit-button" onClick={openAudit} style={{ padding: '15px 30px', borderRadius: 10, background: '#01FBFF', color: '#06171a', fontWeight: 700, fontSize: 16, boxShadow: '0 0 34px rgba(1,251,255,.36)', fontFamily: 'var(--font-grotesk)' }}>Get a Free Problem Audit</a>
            <Link href="/work" style={{ padding: '15px 30px', borderRadius: 10, border: '1px solid rgba(255,255,255,.18)', color: '#e8eaed', fontWeight: 700, fontSize: 16, background: 'rgba(255,255,255,.02)', fontFamily: 'var(--font-grotesk)' }}>See Our Work</Link>
          </div>
        </div>
        <div ref={scrollCueRef} style={{ position: 'absolute', left: '50%', bottom: 24, zIndex: 2, width: 26, height: 26, transform: 'translateX(-50%)', color: 'rgba(255,255,255,.54)', pointerEvents: 'none', transition: 'opacity .16s linear' }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
        </div>
      </div>
    </header>
  );
}
