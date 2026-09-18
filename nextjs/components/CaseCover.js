const THEMES = [
  ['#07181b', '#00e5ff'],
  ['#0c1020', '#8ddcff'],
  ['#101413', '#7df3ff'],
  ['#081522', '#6ee7f5'],
  ['#130e1b', '#00e5ff'],
  ['#111216', '#9ffbff'],
];

export default function CaseCover({ caseStudy }) {
  if (caseStudy.cover) {
    return (
      <img
        src={caseStudy.cover}
        alt=""
        loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    );
  }

  const idx = (caseStudy.slug?.charCodeAt(0) || 0) % THEMES.length;
  const [base, accent] = THEMES[idx];

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: 220,
        overflow: 'hidden',
        background: `radial-gradient(ellipse 70% 90% at 68% 25%, ${accent}33, transparent 62%), linear-gradient(145deg, ${base}, #070809)`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 24,
      }}
    >
      <div style={{ position: 'absolute', inset: 0, opacity: .2, backgroundImage: 'linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)', backgroundSize: '42px 42px' }} />
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'flex-start' }}>
        <span style={{ padding: '5px 11px', borderRadius: 999, border: '1px solid rgba(255,255,255,.18)', color: '#dfe2e6', fontSize: 11, letterSpacing: '.08em', fontWeight: 700 }}>{caseStudy.industry}</span>
        <img src="/logo-mark.png" alt="" style={{ width: 34, height: 34, objectFit: 'contain', filter: `drop-shadow(0 0 18px ${accent}aa)` }} />
      </div>
      <div style={{ position: 'relative' }}>
        <div style={{ fontFamily: 'var(--font-grotesk)', fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 700, color: accent, lineHeight: 1, textShadow: `0 0 24px ${accent}55` }}>{caseStudy.metric}</div>
        <div style={{ marginTop: 12, maxWidth: 430, fontFamily: 'var(--font-grotesk)', fontSize: 'clamp(18px, 2.4vw, 28px)', lineHeight: 1.08, fontWeight: 700, color: '#fff' }}>{caseStudy.title}</div>
      </div>
    </div>
  );
}
